import { Router } from "express";
import bcrypt from "bcrypt";
import { signToken } from "../lib/jwt";
import { findUserByEmail, createUser, userExists } from "../store/user.store";

const router = Router();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).send("Missing credentials");

  const user = findUserByEmail(email);
  if (!user) return res.status(401).send("Invalid login");

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).send("Invalid login");

  const token = signToken({ id: user.id, email: user.email });

  res.cookie("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ ok: true });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body ?? {};
  const cleanEmail = String(email || "")
    .trim()
    .toLowerCase();
  const cleanPassword = String(password || "");

  if (!cleanEmail || !cleanPassword)
    return res.status(400).send("Missing data");

  if (!isValidEmail(cleanEmail)) return res.status(400).send("Invalid email");

  if (cleanPassword.length < 6)
    return res.status(400).send("Password must be at least 6 chars");

  if (userExists(cleanEmail))
    return res.status(409).send("Email already exists");

  const passwordHash = await bcrypt.hash(cleanPassword, 10);
  const user = createUser(cleanEmail, passwordHash);

  const token = signToken({ id: user.id, email: user.email });

  res.cookie("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ ok: true });
});

router.post("/logout", (req, res) => {
  res.clearCookie("session", { path: "/" });
  res.json({ ok: true });
});

export default router;
