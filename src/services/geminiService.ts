import { GoogleGenerativeAI } from "@google/generative-ai";
import { HabitLog } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getEcoAdvice = async (logs: HabitLog[]): Promise<string> => {
  try {
    const logsText = logs.map(l => `- ${l.category}: ${l.description} (Impact: ${l.impactScore})`).join('\n');
    
    const prompt = `
      You are an expert sustainability advisor for the app "GreenConnect".
      Analyze the following list of recent user eco-habits:
      ${logsText}

      Provide a short, encouraging, and specific piece of advice (max 50 words) on how they can improve or what they are doing well.
      If the list is empty, give a general tip for starting a sustainable lifestyle.
      Keep the tone friendly and motivating.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Keep up the great work! Every small step counts towards a greener planet.";
  } catch (error) {
    console.error("Error fetching AI advice:", error);
    return "Our AI advisor is currently recharging with solar power. Please try again later!";
  }
};