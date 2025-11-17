
import { GoogleGenAI } from "@google/genai";

// Fix: Per coding guidelines, the API client is initialized directly with `process.env.API_KEY`.
// Redundant variables and checks have been removed, assuming the key is always available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

export const getGeminiAnswer = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: question,
        config: {
            systemInstruction: "You are a helpful and friendly assistant for Yoruba Liberty Radio, an international shortwave broadcasting service. Answer questions about Yoruba culture, history, language, and general topics in a concise, friendly, and respectful manner.",
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I couldn't get an answer right now. Please try again later.";
  }
};