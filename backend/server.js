require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const ensureAdmin = require("./utils/ensureAdmin");

const authRoutes = require("./routes/auth.routes");
const publicRoutes = require("./routes/public.routes");
const clientRoutes = require("./routes/client.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.disable("x-powered-by");

app.use(helmet());

// Allowed frontend origins
const allowedOrigins = String(
  process.env.CLIENT_ORIGIN ||
    [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://personal-site-ten-lilac-56.vercel.app",
    ].join(","),
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

// CORS configuration
app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header, such as health checks.
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/+$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.error("CORS blocked origin:", origin);

      return callback(new Error("This origin is not allowed by CORS."));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Health checks
app.get("/", (_req, res) => {
  res.json({
    success: true,
    name: "PersonalSite API",
    health: "/api/health",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "PersonalSite API is running.",
  });
});

// Main API routes
app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);

// Compatibility routes for the existing admin panel
app.use("/api/content", (req, res, next) => {
  if (req.method === "GET" && req.path === "/public") {
    return res.status(400).json({
      success: false,
      message: "Use /api/public/content/:type for public content.",
    });
  }

  req.url = `/content${req.url}`;

  adminRoutes(req, res, next);
});

app.use("/api/dashboard", (req, res, next) => {
  req.url = `/dashboard${req.url}`;

  adminRoutes(req, res, next);
});

app.use("/api", adminRoutes);

// Not found handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Error handler
app.use((error, _req, res, _next) => {
  if (error && error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A record with this value already exists.",
    });
  }

  if (error && error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error && error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid record ID.",
    });
  }

  if (error && error.message && error.message.includes("CORS")) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }

  console.error(error);

  return res.status(error.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error."
        : error.message || "Internal server error.",
  });
});

// Start server
const port = Number(process.env.PORT) || 5000;

async function startServer() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error(
      "JWT_SECRET must be set and contain at least 32 characters.",
    );
  }

  await connectDB();
  await ensureAdmin();

  app.listen(port, () => {
    console.log(`PersonalSite API is running on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error(`Server startup failed: ${error.message}`);
  process.exit(1);
});
