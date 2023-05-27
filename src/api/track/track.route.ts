import { Router } from "express";
import TrackController from "./track.controller";

const track: Router = Router();
const trackController = new TrackController();

track.post("/addexpense", trackController.addExpense);
track.post("/addincome", trackController.addIncome);
track.post("/addnotification", trackController.addNotification);

export default track;