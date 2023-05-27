import { Router } from "express";
import FetchController from "./fetch.controller";

const fetch: Router = Router();
const fetchController = new FetchController();

fetch.get("/notifications", fetchController.getNotifications);

export default fetch;