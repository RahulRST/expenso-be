import { Router } from "express";

import auth from "./auth/auth.route";
import track from "./track/track.route";

// import { validateUser } from "../middlewares/validate";

const router: Router = Router();

router.use("/auth", auth);
router.use("/track", track);

export default router;