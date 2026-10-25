const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
  phone: { type: String, default: '', trim: true, maxlength: 40 },
  company: { type: String, default: '', trim: true, maxlength: 120 },
  location: { type: String, default: '', trim: true, maxlength: 120 },
  preferences: {
    language: { type: String, default: 'English' },
    theme: { type: String, enum: ['Light', 'Dark', 'System'], default: 'System' },
    emailNotifications: { type: Boolean, default: true },
    projectUpdates: { type: Boolean, default: true },
    paymentNotifications: { type: Boolean, default: true },
    messageNotifications: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: false }
  }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('User', userSchema);
