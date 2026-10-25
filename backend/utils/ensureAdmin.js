const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

async function ensureAdmin() {
  const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || '');

  if (!email || !password) {
    console.warn('Admin account was not initialized: set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env');
    return;
  }
  if (password.length < 12) {
    throw new Error('ADMIN_PASSWORD must contain at least 12 characters.');
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin account is ready: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await Admin.create({ name: process.env.ADMIN_NAME || 'Portfolio Admin', email, password: hashedPassword });
  console.log(`Initial admin account created: ${email}`);
}

module.exports = ensureAdmin;
