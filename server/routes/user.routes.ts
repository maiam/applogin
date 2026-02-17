import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, (req: AuthRequest, res) => {
  res.json({
    id: req.user?.id,
    email: req.user?.email,
  });
});

export default router;
