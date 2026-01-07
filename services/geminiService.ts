// DON'T import GoogleGenAI at the top level!
// We'll use dynamic imports to avoid loading the SDK when there's no API key

type GoogleGenAI = any; // Type placeholder

const apiKey = process.env.API_KEY;
const baseUrl = process.env.GEMINI_BASE_URL;

// Export flag to indicate if AI features are available
export const isAIAvailable = !!apiKey;

// Helper to get AI client (lazy load)
async function getAIClient(): Promise<GoogleGenAI> {
  if (!apiKey) {
    throw new Error("AI features require an API key. Please configure the API_KEY environment variable to enable AI-powered content generation.");
  }

  // Dynamic import - only loads the SDK when actually needed
  const { GoogleGenAI } = await import("@google/genai");
  return new GoogleGenAI({
    apiKey,
    httpOptions: baseUrl ? { baseUrl } : undefined
  });
}

export const generateText = async (prompt: string): Promise<string> => {
  const ai = await getAIClient();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a creative writer helper. Output plain text suitable for a note or blog post. Do not use markdown formatting. Keep it engaging and concise.",
      }
    });
    return response.text || "Could not generate text.";
  } catch (error) {
    console.error("Text generation failed", error);
    throw error;
  }
};

export const generateBackgroundPattern = async (prompt: string): Promise<string> => {
  const ai = await getAIClient();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `Create a seamless, abstract background pattern texture based on this concept: "${prompt}". The image should be suitable for a background wallpaper. Soft colors, not too busy.` }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16" // Portrait for phone background
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned");
  } catch (error) {
    console.error("Image generation failed", error);
    throw error;
  }
};