
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithAssistant = async (history: Message[], userInput: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userInput,
      config: {
        systemInstruction: `You are an AI representative of Alex, a Senior Software Engineer. 
        Keep answers short, professional, and slightly witty. Alex is expert in React, Node, and Cloud.
        If asked about projects, mention the ones in the portfolio (Cloud Dashboard, Neural Visualizer, EcoSphere).
        Alex is open for hire.`,
        temperature: 0.7,
      },
    });

    return response.text || "I'm having a bit of a brain fog. Try again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The server is taking a nap. Could you ask me later?";
  }
};
