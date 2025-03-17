import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
// You'll access this from Gadget's environment variables
const API_KEY = process.env.GOOGLE_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getMedicationInfo(medicationName: string): Promise<string> {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Provide concise medical information about ${medicationName}. 
    Include: primary uses, common side effects, typical dosing, and important warnings.
    Format the response in easy-to-read sections.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error calling Gemini AI:", error);
    throw new Error(`Failed to get information about ${medicationName}`);
  }
}

export async function chatWithMedicalAssistant(message: string): Promise<string> {
  try {
    // Use the gemini-pro model for the chatbot
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `You are a helpful medical assistant chatbot. Respond to the following query about medications or medical information. 
    Keep responses concise and informative. If asked about something outside your knowledge or inappropriate, politely redirect.
    
    User query: ${message}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error calling Gemini AI for chat:", error);
    throw new Error("Sorry, I couldn't process your request at this time.");
  }
}