
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we assume the API_KEY is set in the environment.
  console.warn("Gemini API key not found in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const model = 'gemini-2.5-flash';

export const getGeminiAnswer = async (question: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please set up your API key to use this feature.";
  }
  
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