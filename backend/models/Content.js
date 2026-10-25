const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  type: { type: String, required: true, index: true },
  title: { type: String, default: '', trim: true, maxlength: 200 },
  slug: { type: String, default: '', trim: true, lowercase: true },
  status: { type: String, enum: ['published', 'draft', 'archived'], default: 'published', index: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true, versionKey: false });
contentSchema.index({ type: 1, slug: 1 }, { unique: true, partialFilterExpression: { slug: { $type: 'string', $gt: '' } } });

module.exports = mongoose.model('Content', contentSchema);
