import { Router } from "express";
import AnalysisController from "./analysis.controller";

const analysis: Router = Router();
const analysisController = new AnalysisController();

analysis.get("/", analysisController.getAnalytics);

export default analysis;