import { GoogleGenerativeAI } from "@google/generative-ai";

// Definimos la interfaz localmente para evitar el error de "../types"
interface HabitLog {
  id: string;
  category: string;
  description: string;
  impact: number; // Cambiado de impactScore a impact para coincidir con tu Context
  date: string;
}

// Corrección: La clase correcta es GoogleGenerativeAI, no GoogleGenAI
// Nota: En Vercel, asegúrate de haber configurado VITE_GEMINI_API_KEY en Environment Variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export const getEcoAdvice = async (logs: HabitLog[]): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // gemini-1.5-flash es la versión estable actual

    const logsText = logs.length > 0 
      ? logs.map(l => `- ${l.category}: ${l.description} (Impact: ${l.impact})`).join('\n')
      : "No habits logged yet.";
    
    const prompt = `
      You are an expert sustainability advisor for the app "GreenConnect".
      Analyze the following list of recent user eco-habits:
      ${logsText}

      Provide a short, encouraging, and specific piece of advice (max 50 words) on how they can improve or what they are doing well.
      If the list is empty, give a general tip for starting a sustainable lifestyle.
      Keep the tone friendly and motivating.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Error fetching AI advice:", error);
    return "Our AI advisor is currently recharging with solar power. Keep up the great work!";
  }
};