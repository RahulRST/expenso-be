import { Router } from "express";
import AuthController from "./auth.controller";

const auth: Router = Router();
const authController = new AuthController();

auth.post("/login", authController.login);

export default auth;