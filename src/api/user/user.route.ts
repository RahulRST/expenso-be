import { Router } from "express";
import UserController from "./user.controller";

const user = Router();
const userController = new UserController();

user.get("/", userController.getUser);

export default user;