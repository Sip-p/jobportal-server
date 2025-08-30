import dotenv from 'dotenv';
import path from "path";
dotenv.config({ path: path.resolve("utils/.env") });

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log("The api is ",process.env.GEMINI_API_KEY);
export const chatbotReply = async (req, res) => {
  try {
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = req.body.message; // user input
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ success: true, reply });
  } catch (err) {
    // console.error("Gemini API Error:", err);
    res.status(500).json({ success: false, error: "Chatbot error" });
  }
};
