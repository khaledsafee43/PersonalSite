require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const ensureAdmin = require('./utils/ensureAdmin');
const authRoutes = require('./routes/auth.routes');
const publicRoutes = require('./routes/public.routes');
const clientRoutes = require('./routes/client.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
app.disable('x-powered-by');
app.use(helmet());
const allowedOrigins = String(process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://localhost:5174,http://localhost:5175')
  .split(',').map((origin) => origin.trim()).filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('This origin is not allowed by CORS. Add it to CLIENT_ORIGIN in backend/.env.'));
  },
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.get('/', (_req, res) => res.json({ success: true, name: 'PersonalSite API', health: '/api/health' }));
app.get('/api/health', (_req, res) => res.json({ success: true, message: 'PersonalSite API is running.' }));
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/admin', adminRoutes);
// Keep compatibility with the separate admin panel's existing API paths.
app.use('/api/content', (req, res, next) => {
  if (req.method === 'GET' && req.path === '/public') return res.status(400).json({ success: false, message: 'Use /api/public/content/:type for public content.' });
  req.url = `/content${req.url}`;
  adminRoutes(req, res, next);
});
app.use('/api/dashboard', (req, res, next) => { req.url = `/dashboard${req.url}`; adminRoutes(req, res, next); });
app.use('/api', adminRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` }));
app.use((error, _req, res, _next) => {
  if (error && error.code === 11000) return res.status(409).json({ success: false, message: 'A record with this value already exists.' });
  if (error && error.name === 'ValidationError') return res.status(400).json({ success: false, message: error.message });
  if (error && error.name === 'CastError') return res.status(400).json({ success: false, message: 'Invalid record ID.' });
  if (error && error.message && error.message.includes('CORS')) return res.status(403).json({ success: false, message: error.message });
  console.error(error);
  res.status(error.status || 500).json({ success: false, message: process.env.NODE_ENV === 'production' ? 'Internal server error.' : (error.message || 'Internal server error.') });
});

const port = Number(process.env.PORT) || 5000;
async function startServer() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be set in backend/.env and contain at least 32 characters.');
  }
  await connectDB();
  await ensureAdmin();
  app.listen(port, () => console.log(`PersonalSite API running at http://localhost:${port}`));
}
startServer().catch((error) => {
  console.error(`Server startup failed: ${error.message}`);
  process.exit(1);
});
