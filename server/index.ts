import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = Number(process.env.PORT || 3000);

// API
app.use("/api", authRoutes);
app.use("/api", userRoutes);

// Frontend build
const distPath = path.join(process.cwd(), "dist");
app.use(express.static(distPath));

// SPA fallback
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on :${PORT}`);
});
