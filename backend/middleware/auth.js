const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

function getToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

async function requireClient(req, res, next) {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ success: false, message: 'Please sign in to continue.' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.userId) return res.status(401).json({ success: false, message: 'A client account is required.' });
    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ success: false, message: 'Account not found.' });
    req.user = user;
    next();
  } catch (_error) {
    return res.status(401).json({ success: false, message: 'Your session is invalid or expired. Please sign in again.' });
  }
}

async function requireAdmin(req, res, next) {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ success: false, message: 'Admin authentication required.' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.adminId && !payload.sub) return res.status(401).json({ success: false, message: 'Admin access required.' });
    const adminId = payload.adminId || payload.sub;
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(401).json({ success: false, message: 'Admin account not found.' });
    req.admin = admin;
    next();
  } catch (_error) {
    return res.status(401).json({ success: false, message: 'Admin session is invalid or expired.' });
  }
}

module.exports = { requireClient, requireAdmin };
