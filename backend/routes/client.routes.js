const express = require('express');
const Project = require('../models/Project');
const Message = require('../models/Message');
const InboxItem = require('../models/InboxItem');
const { requireClient } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();
router.use(requireClient);

router.get('/dashboard', asyncHandler(async (req, res) => {
  const projects = await Project.find({ owner: req.user._id }).sort({ updatedAt: -1 }).limit(6);
  const all = await Project.find({ owner: req.user._id }).select('status budget progress title updatedAt');
  const projectIds = all.map((project) => project._id);
  const [messages, requests] = await Promise.all([
    Message.countDocuments({ project: { $in: projectIds }, senderRole: { $ne: 'client' }, readAt: null }),
    InboxItem.countDocuments({ user: req.user._id, kind: 'requests' })
  ]);
  const stats = {
    totalProjects: all.length,
    inProgress: all.filter((p) => ['in-progress', 'review', 'on-hold'].includes(p.status)).length,
    completed: all.filter((p) => p.status === 'completed').length,
    totalBudget: all.reduce((sum, p) => sum + (Number(p.budget) || 0), 0),
    unreadMessages: messages,
    projectRequests: requests
  };
  res.json({ success: true, user: { id: req.user._id, fullName: req.user.fullName, email: req.user.email }, stats, projects });
}));

router.get('/projects', asyncHandler(async (req, res) => {
  const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, projects });
}));

router.post('/projects', asyncHandler(async (req, res) => {
  const title = String(req.body.title || '').trim();
  const description = String(req.body.description || '').trim();
  if (title.length < 3 || description.length < 10) return res.status(400).json({ success: false, message: 'Project title must contain 3 characters and description at least 10 characters.' });
  const rawBudget = req.body.budget === '' || req.body.budget == null ? 0 : Number(req.body.budget);
  if (!Number.isFinite(rawBudget) || rawBudget < 0) return res.status(400).json({ success: false, message: 'Budget must be a valid non-negative number.' });
  const project = await Project.create({
    owner: req.user._id,
    title,
    type: String(req.body.type || 'web'),
    description,
    features: String(req.body.features || ''),
    technologies: Array.isArray(req.body.technologies) ? req.body.technologies.map(String).slice(0, 30) : [],
    budget: rawBudget,
    deadline: req.body.deadline || null,
    priority: ['Low', 'Normal', 'High', 'Urgent'].includes(req.body.priority) ? req.body.priority : 'Normal',
    referenceUrl: String(req.body.referenceUrl || ''),
    contactEmail: String(req.body.contactEmail || req.user.email).trim().toLowerCase(),
    status: 'pending', progress: 0,
    activities: [{ title: 'Project request submitted', description: 'Your request is waiting for review.' }]
  });
  await InboxItem.create({ kind: 'requests', user: req.user._id, name: req.user.fullName, email: req.user.email, title, message: description, status: 'new', data: { projectId: project._id, type: project.type, budget: project.budget, deadline: project.deadline } });
  res.status(201).json({ success: true, message: 'Project request submitted successfully.', project });
}));

router.get('/projects/:id', asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });
  if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
  res.json({ success: true, project });
}));

router.get('/messages', asyncHandler(async (req, res) => {
  const projects = await Project.find({ owner: req.user._id }).select('_id title');
  const projectIds = projects.map((p) => p._id);
  const messages = await Message.find({ project: { $in: projectIds } }).sort({ createdAt: 1 }).populate('project', 'title');
  res.json({ success: true, messages, projects });
}));

router.post('/messages', asyncHandler(async (req, res) => {
  const text = String(req.body.text || req.body.message || '').trim();
  if (text.length < 1 || text.length > 5000) return res.status(400).json({ success: false, message: 'Message must contain between 1 and 5000 characters.' });
  let project = null;
  if (req.body.projectId) {
    project = await Project.findOne({ _id: req.body.projectId, owner: req.user._id });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
  }
  const message = await Message.create({ project: project?._id || null, sender: req.user._id, senderRole: 'client', senderName: req.user.fullName, senderEmail: req.user.email, text });
  res.status(201).json({ success: true, message: 'Message sent.', item: message });
}));

router.get('/payments', asyncHandler(async (req, res) => {
  const projects = await Project.find({ owner: req.user._id }).select('title budget status createdAt');
  const payments = projects.map((project) => ({ id: project._id, projectId: project._id, projectTitle: project.title, amount: project.budget, status: project.status === 'completed' ? 'completed' : 'pending', createdAt: project.createdAt }));
  res.json({ success: true, payments, note: 'Payment processing is not connected; these are project budget summaries only.' });
}));

router.get('/files', asyncHandler(async (req, res) => {
  const projects = await Project.find({ owner: req.user._id }).select('title files');
  const files = projects.flatMap((project) => project.files.map((file) => ({ ...file.toObject(), projectId: project._id, projectTitle: project.title })));
  res.json({ success: true, files });
}));

module.exports = router;
