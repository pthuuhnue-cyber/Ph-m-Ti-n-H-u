
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeChatImage = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const prompt = `
      Analyze this chat screenshot for safety. 
      Respond ONLY in JSON format with the following structure:
      {
        "isDangerous": boolean,
        "reason": "summary in Vietnamese",
        "details": "detailed explanation in Vietnamese"
      }

      CRITICAL RULE: 
      1. If the chat contains threatening language, extortion, harassment, or requests for money (like in your training data for dangerous chats), mark as dangerous.
      2. If you see orange or red chat bubbles which typically indicate warnings or specific UI patterns for suspect accounts in this app context, prioritize a "High Danger" (Mức độ nguy hiểm cao) rating.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image.split(',')[1] // Remove prefix if present
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      isDangerous: result.isDangerous ?? false,
      reason: result.reason ?? "Không thể phân tích rõ ràng.",
      details: result.details ?? ""
    };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      isDangerous: false,
      reason: "Lỗi kết nối AI.",
      details: "Vui lòng thử lại sau."
    };
  }
};
