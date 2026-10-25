const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, default: '', maxlength: 1000 },
  dueDate: { type: Date, default: null },
  status: { type: String, enum: ['upcoming', 'pending', 'in-progress', 'completed'], default: 'upcoming' },
  completedAt: { type: Date, default: null }
}, { timestamps: true });

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, default: '', maxlength: 1000 },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  type: { type: String, default: 'web', trim: true, maxlength: 80 },
  description: { type: String, default: '', maxlength: 5000 },
  features: { type: String, default: '', maxlength: 5000 },
  technologies: [{ type: String, trim: true, maxlength: 60 }],
  budget: { type: Number, min: 0, default: 0 },
  currency: { type: String, default: 'USD', uppercase: true, maxlength: 5 },
  deadline: { type: Date, default: null },
  priority: { type: String, enum: ['Low', 'Normal', 'High', 'Urgent'], default: 'Normal' },
  referenceUrl: { type: String, default: '', maxlength: 500 },
  contactEmail: { type: String, default: '', lowercase: true, trim: true, maxlength: 254 },
  status: { type: String, enum: ['pending', 'approved', 'in-progress', 'review', 'completed', 'on-hold', 'cancelled', 'rejected'], default: 'pending', index: true },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  adminNotes: { type: String, default: '', maxlength: 5000 },
  milestones: [milestoneSchema],
  activities: [activitySchema],
  files: [{ name: String, url: String, size: Number, uploadedAt: { type: Date, default: Date.now } }]
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Project', projectSchema);
