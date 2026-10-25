const mongoose = require('mongoose');

const inboxSchema = new mongoose.Schema({
  kind: { type: String, enum: ['messages', 'clients', 'requests'], required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  name: { type: String, default: '', trim: true, maxlength: 120 },
  email: { type: String, default: '', trim: true, lowercase: true, maxlength: 254 },
  title: { type: String, default: '', trim: true, maxlength: 200 },
  message: { type: String, default: '', trim: true, maxlength: 5000 },
  status: { type: String, default: 'new', enum: ['new', 'read', 'in-progress', 'completed', 'closed', 'pending', 'approved', 'rejected'] },
  data: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('InboxItem', inboxSchema);
