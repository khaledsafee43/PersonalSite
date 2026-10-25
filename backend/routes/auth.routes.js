const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { requireClient, requireAdmin } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false, message: { success: false, message: 'Too many sign-in attempts. Please try again in 15 minutes.' } });

function makeToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
}

function safeUser(user) {
  return { id: user._id, fullName: user.fullName, name: user.fullName, email: user.email, role: user.role, phone: user.phone, company: user.company, location: user.location, preferences: user.preferences, createdAt: user.createdAt };
}

function safeAdmin(admin) {
  return { id: admin._id, name: admin.name, email: admin.email, role: 'admin' };
}

router.post('/signup', asyncHandler(async (req, res) => {
  const fullName = String(req.body.fullName || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  if (fullName.length < 3) return res.status(400).json({ success: false, message: 'Full name must contain at least 3 characters.' });
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  if (password.length < 8 || password.length > 128) return res.status(400).json({ success: false, message: 'Password must contain between 8 and 128 characters.' });

  if (await User.findOne({ email })) return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  if (await Admin.findOne({ email })) return res.status(409).json({ success: false, message: 'This email cannot be used for client registration.' });

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ fullName, email, password: hashedPassword, role: 'client' });
  res.status(201).json({ success: true, message: 'Account created successfully. Please sign in.', user: safeUser(user) });
}));

// Shared login endpoint supports both the separate admin panel and client portal.
router.post('/login', loginLimiter, asyncHandler(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required.' });

  const admin = await Admin.findOne({ email }).select('+password');
  if (admin && await bcrypt.compare(password, admin.password)) {
    const token = makeToken({ adminId: admin._id.toString(), sub: admin._id.toString(), role: 'admin' });
    return res.json({ success: true, message: 'Admin sign-in successful.', token, admin: safeAdmin(admin), user: safeAdmin(admin) });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }
  const token = makeToken({ userId: user._id.toString(), role: 'client' });
  return res.json({ success: true, message: 'Sign-in successful.', token, user: safeUser(user) });
}));

router.get('/me', requireAdmin, (req, res) => res.json({ success: true, admin: safeAdmin(req.admin) }));
router.patch('/profile', requireAdmin, asyncHandler(async (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ success: false, message: 'A valid name and email are required.' });
  const duplicate = await Admin.findOne({ email, _id: { $ne: req.admin._id } });
  if (duplicate) return res.status(409).json({ success: false, message: 'That email is already in use.' });
  const admin = await Admin.findByIdAndUpdate(req.admin._id, { name, email }, { new: true, runValidators: true });
  res.json({ success: true, admin: safeAdmin(admin) });
}));
router.patch('/password', requireAdmin, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || String(newPassword).length < 8) return res.status(400).json({ success: false, message: 'Enter your current password and a new password of at least 8 characters.' });
  const admin = await Admin.findById(req.admin._id).select('+password');
  if (!(await bcrypt.compare(String(currentPassword), admin.password))) return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
  admin.password = await bcrypt.hash(String(newPassword), 12);
  await admin.save();
  res.json({ success: true, message: 'Password updated successfully.' });
}));

router.get('/profile', requireClient, (req, res) => res.json({ success: true, user: safeUser(req.user) }));
router.patch('/client-profile', requireClient, asyncHandler(async (req, res) => {
  const allowed = ['fullName', 'phone', 'company', 'location'];
  for (const key of allowed) if (req.body[key] !== undefined) req.user[key] = String(req.body[key]).trim();
  if (req.body.preferences && typeof req.body.preferences === 'object') {
    const keys = ['language', 'theme', 'emailNotifications', 'projectUpdates', 'paymentNotifications', 'messageNotifications', 'marketingEmails'];
    for (const key of keys) if (req.body.preferences[key] !== undefined) req.user.preferences[key] = req.body.preferences[key];
  }
  await req.user.save();
  res.json({ success: true, message: 'Profile updated successfully.', user: safeUser(req.user) });
}));
router.patch('/client-password', requireClient, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || String(newPassword).length < 8) return res.status(400).json({ success: false, message: 'Enter your current password and a new password of at least 8 characters.' });
  const user = await User.findById(req.user._id).select('+password');
  if (!(await bcrypt.compare(String(currentPassword), user.password))) return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
  user.password = await bcrypt.hash(String(newPassword), 12);
  await user.save();
  res.json({ success: true, message: 'Password updated successfully.' });
}));

module.exports = router;
