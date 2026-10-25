const express = require('express');
const Content = require('../models/Content');
const InboxItem = require('../models/InboxItem');
const User = require('../models/User');
const Project = require('../models/Project');
const Message = require('../models/Message');
const { requireAdmin } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();
const allowedTypes = new Set(['home', 'about', 'projects', 'posts', 'skills', 'services', 'resume', 'contact', 'seo', 'appearance', 'languages', 'notifications', 'general']);
const allowedKinds = new Set(['messages', 'clients', 'requests']);
router.use(requireAdmin);

router.get('/dashboard', asyncHandler(async (_req, res) => {
  const [projects, posts, messages, requests, clients, unreadMessages, recent, registeredClients, portfolioProjects] = await Promise.all([
    Content.countDocuments({ type: 'projects' }),
    Content.countDocuments({ type: 'posts' }),
    InboxItem.countDocuments({ kind: 'messages' }),
    InboxItem.countDocuments({ kind: 'requests' }),
    User.countDocuments({ role: 'client' }),
    InboxItem.countDocuments({ kind: 'messages', status: 'new' }),
    InboxItem.find().sort({ createdAt: -1 }).limit(5).select('kind name title status createdAt'),
    User.countDocuments({ role: 'client' }),
    Project.countDocuments()
  ]);
  res.json({ success: true, stats: { projects, posts, messages, requests, clients: Math.max(clients, registeredClients), unreadMessages, registeredClients, clientProjects: portfolioProjects }, recent });
}));

router.get('/content/:type', asyncHandler(async (req, res) => {
  const type = String(req.params.type || '').toLowerCase();
  if (!allowedTypes.has(type)) return res.status(400).json({ success: false, message: 'Unsupported content type.' });
  const items = await Content.find({ type }).sort({ updatedAt: -1 });
  res.json({ success: true, items });
}));
router.post('/content/:type', asyncHandler(async (req, res) => {
  const type = String(req.params.type || '').toLowerCase();
  if (!allowedTypes.has(type)) return res.status(400).json({ success: false, message: 'Unsupported content type.' });
  const title = String(req.body.title || '').trim();
  const slug = String(req.body.slug || '').trim().toLowerCase();
  const status = ['published', 'draft', 'archived'].includes(req.body.status) ? req.body.status : 'published';
  const item = await Content.create({ type, title, slug, status, data: req.body.data && typeof req.body.data === 'object' ? req.body.data : {} });
  res.status(201).json({ success: true, item });
}));
router.patch('/content/:type/:id', asyncHandler(async (req, res) => {
  const type = String(req.params.type || '').toLowerCase();
  if (!allowedTypes.has(type)) return res.status(400).json({ success: false, message: 'Unsupported content type.' });
  const update = {};
  for (const key of ['title', 'slug', 'status', 'data']) {
    if (req.body[key] !== undefined) update[key] = req.body[key];
  }
  if (update.title !== undefined) update.title = String(update.title).trim();
  if (update.slug !== undefined) update.slug = String(update.slug).trim().toLowerCase();
  const item = await Content.findOneAndUpdate({ _id: req.params.id, type }, update, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ success: false, message: 'Content item not found.' });
  res.json({ success: true, item });
}));
router.delete('/content/:type/:id', asyncHandler(async (req, res) => {
  const type = String(req.params.type || '').toLowerCase();
  if (!allowedTypes.has(type)) return res.status(400).json({ success: false, message: 'Unsupported content type.' });
  const item = await Content.findOneAndDelete({ _id: req.params.id, type });
  if (!item) return res.status(404).json({ success: false, message: 'Content item not found.' });
  res.json({ success: true, message: 'Content deleted.' });
}));

router.get('/projects', asyncHandler(async (_req, res) => {
  const projects = await Project.find().sort({ updatedAt: -1 }).populate('owner', 'fullName email');
  res.json({ success: true, projects });
}));
router.post('/projects', asyncHandler(async (req, res) => {
  const owner = await User.findById(req.body.ownerId);
  if (!owner) return res.status(400).json({ success: false, message: 'A valid client ownerId is required.' });
  const title = String(req.body.title || '').trim();
  if (title.length < 3) return res.status(400).json({ success: false, message: 'Project title must contain at least 3 characters.' });
  const project = await Project.create({ owner: owner._id, title, type: req.body.type || 'web', description: req.body.description || '', budget: Math.max(0, Number(req.body.budget) || 0), status: req.body.status || 'pending', progress: Math.min(100, Math.max(0, Number(req.body.progress) || 0)), adminNotes: req.body.adminNotes || '', activities: [{ title: 'Project created by admin' }] });
  res.status(201).json({ success: true, project });
}));
router.patch('/projects/:id', asyncHandler(async (req, res) => {
  const allowed = ['title', 'type', 'description', 'features', 'technologies', 'budget', 'deadline', 'priority', 'status', 'progress', 'adminNotes', 'milestones', 'files'];
  const update = {};
  for (const key of allowed) if (req.body[key] !== undefined) update[key] = req.body[key];
  if (update.progress !== undefined) update.progress = Math.min(100, Math.max(0, Number(update.progress) || 0));
  const project = await Project.findByIdAndUpdate(req.params.id, { $set: update, $push: { activities: { title: String(req.body.activity || 'Project updated by admin').slice(0, 200), description: String(req.body.activityDescription || '').slice(0, 1000), createdAt: new Date() } } }, { new: true, runValidators: true }).populate('owner', 'fullName email');
  if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
  res.json({ success: true, project });
}));
router.delete('/projects/:id', asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
  await Message.deleteMany({ project: project._id });
  res.json({ success: true, message: 'Project deleted.' });
}));

router.get('/users', asyncHandler(async (_req, res) => {
  const users = await User.find({ role: 'client' }).sort({ createdAt: -1 }).select('fullName email phone company location createdAt');
  res.json({ success: true, users, clients: users });
}));

router.get('/:kind', asyncHandler(async (req, res) => {
  const kind = String(req.params.kind || '').toLowerCase();
  if (!allowedKinds.has(kind)) return res.status(404).json({ success: false, message: 'Collection not found.' });
  if (kind === 'clients') {
    const [items, users] = await Promise.all([
      InboxItem.find({ kind }).sort({ createdAt: -1 }),
      User.find({ role: 'client' }).sort({ createdAt: -1 }).select('fullName email phone company location createdAt')
    ]);
    return res.json({ success: true, items, users });
  }
  const items = await InboxItem.find({ kind }).sort({ createdAt: -1 });
  res.json({ success: true, items });
}));
router.post('/:kind', asyncHandler(async (req, res) => {
  const kind = String(req.params.kind || '').toLowerCase();
  if (!allowedKinds.has(kind)) return res.status(400).json({ success: false, message: 'Unsupported collection.' });
  const item = await InboxItem.create({ kind, name: String(req.body.name || '').trim(), email: String(req.body.email || '').trim().toLowerCase(), title: String(req.body.title || '').trim(), message: String(req.body.message || '').trim(), status: req.body.status || 'new', data: req.body.data && typeof req.body.data === 'object' ? req.body.data : {} });
  res.status(201).json({ success: true, item });
}));
router.patch('/:kind/:id', asyncHandler(async (req, res) => {
  const kind = String(req.params.kind || '').toLowerCase();
  if (!allowedKinds.has(kind)) return res.status(400).json({ success: false, message: 'Unsupported collection.' });
  const update = {};
  for (const key of ['name', 'email', 'title', 'message', 'status', 'data']) if (req.body[key] !== undefined) update[key] = req.body[key];
  const item = await InboxItem.findOneAndUpdate({ _id: req.params.id, kind }, update, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ success: false, message: 'Record not found.' });
  res.json({ success: true, item });
}));
router.delete('/:kind/:id', asyncHandler(async (req, res) => {
  const kind = String(req.params.kind || '').toLowerCase();
  if (!allowedKinds.has(kind)) return res.status(400).json({ success: false, message: 'Unsupported collection.' });
  const item = await InboxItem.findOneAndDelete({ _id: req.params.id, kind });
  if (!item) return res.status(404).json({ success: false, message: 'Record not found.' });
  res.json({ success: true, message: 'Record deleted.' });
}));

module.exports = router;
