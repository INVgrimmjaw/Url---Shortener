import express from "express";
import {shortenUrlController, expandUrlController, getstatsController, updateUrlController, deleteUrlController} from '.././controllers/url.controller.js';

const router = express.Router();

router.post("/shorten", shortenUrlController);
router.get("/expand/", expandUrlController);
router.get("/stats/", getstatsController);
router.put("/update/", updateUrlController);
router.delete("/delete/", deleteUrlController);

export default router;