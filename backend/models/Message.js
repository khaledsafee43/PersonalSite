const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null, index: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  senderRole: { type: String, enum: ['client', 'admin', 'visitor'], required: true },
  senderName: { type: String, required: true, trim: true, maxlength: 120 },
  senderEmail: { type: String, default: '', trim: true, lowercase: true, maxlength: 254 },
  text: { type: String, required: true, trim: true, maxlength: 5000 },
  readAt: { type: Date, default: null }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Message', messageSchema);
