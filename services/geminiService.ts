import { GoogleGenAI, Part } from "@google/genai";
import { GenerateContentParams } from "../types";
import { SYSTEM_INSTRUCTION, SYSTEM_ATTACHMENTS } from "../constants";

// Helper to clean base64 string
const cleanBase64 = (base64: string): string => {
  // Removes "data:image/png;base64," prefix if present
  return base64.split(',')[1] || base64;
};

export const generateResponse = async ({
  prompt,
  knowledgeBase
}: GenerateContentParams): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Construct the parts array
    const parts: Part[] = [];

    // 1. Add SYSTEM attachments (Hardcoded Images/PDFs)
    // These are fed firsthand by the developer in constants.ts
    if (SYSTEM_ATTACHMENTS && SYSTEM_ATTACHMENTS.length > 0) {
      SYSTEM_ATTACHMENTS.forEach((att) => {
        parts.push({
          inlineData: {
            mimeType: att.mimeType,
            data: cleanBase64(att.base64),
          },
        });
      });
    }

    // 2. Add the Context Stuffing + User Prompt
    // We combine the Knowledge Base and the User Question into a single text block
    const fullTextPrompt = `
KNOWLEDGE_BASE:
${knowledgeBase}

USER QUESTION:
${prompt}
    `;

    parts.push({ text: fullTextPrompt });

    // 3. Call the API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: parts
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
      }
    });

    return response.text || "I couldn't generate a response. (｡•́︿•̀｡)";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! Something went wrong while talking to the magic cloud. Please try again! (scared emoji)";
  }
};
