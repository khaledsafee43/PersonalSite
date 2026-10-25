const express = require('express');
const Content = require('../models/Content');
const InboxItem = require('../models/InboxItem');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();
const allowedTypes = new Set(['home', 'about', 'projects', 'posts', 'skills', 'services', 'resume', 'contact', 'seo', 'appearance', 'languages', 'general']);

// Published portfolio data can be requested without signing in.
router.get('/content/:type', asyncHandler(async (req, res) => {
  const type = String(req.params.type || '').toLowerCase();
  if (!allowedTypes.has(type)) return res.status(400).json({ success: false, message: 'Unsupported content type.' });
  const items = await Content.find({ type, status: 'published' }).sort({ createdAt: -1 });
  res.json({ success: true, items, data: items });
}));

router.get('/site', asyncHandler(async (_req, res) => {
  const types = ['home', 'about', 'projects', 'skills', 'services', 'posts', 'resume', 'contact', 'seo', 'appearance', 'languages', 'general'];
  const rows = await Content.find({ type: { $in: types }, status: 'published' }).sort({ createdAt: -1 });
  const content = {};
  for (const type of types) content[type] = rows.filter((item) => item.type === type);
  res.json({ success: true, content });
}));

router.post('/contact', asyncHandler(async (req, res) => {
  const name = String(req.body.name || req.body.fullName || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  const message = String(req.body.message || '').trim();
  const title = String(req.body.subject || req.body.title || 'Portfolio contact message').trim();
  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || message.length < 5) {
    return res.status(400).json({ success: false, message: 'Please provide your name, a valid email, and a message of at least 5 characters.' });
  }
  const item = await InboxItem.create({ kind: 'messages', name, email, title, message, status: 'new', data: { source: 'portfolio-contact' } });
  res.status(201).json({ success: true, message: 'Your message has been sent successfully.', id: item._id });
}));

module.exports = router;
