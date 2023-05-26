import { Router } from "express";

import auth from "./auth/auth.route";

// import { validateUser } from "../middlewares/validate";

const router: Router = Router();

router.use("/auth", auth);

export default router;