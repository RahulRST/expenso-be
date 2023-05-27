import { Router } from "express";

import auth from "./auth/auth.route";
import track from "./track/track.route";
import analysis from "./analysis/analysis.route";

import { validateUser } from "../middleware/validate";

const router: Router = Router();

router.use("/auth", auth);
router.use("/track",validateUser, track);
router.use("/analysis",validateUser, analysis)

export default router;