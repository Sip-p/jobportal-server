import express from "express";
import { chatbotReply } from "../controller/chatController.js";

const router = express.Router();

router.post("/", chatbotReply);

export default router;
