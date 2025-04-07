import express from "express";
import { createPlot, updatePlot } from "../controllers/plot.controller.js";

const router = express.Router();

router.post("/plot", createPlot);
router.put("/plot/:id", updatePlot);

export default router;
