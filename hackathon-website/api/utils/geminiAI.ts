// utils/geminiAI.ts

import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

/**
 * Calls the Gemini API to get an AI-generated response based on the provided message.
 * @param message The prompt or message to send to the Gemini API.
 * @returns The AI-generated response as a string.
 */
export async function chatWithMedicalAssistant(message: string): Promise<string> {
  console.log("Sending message to Gemini AI:", message);

  try {
    // Replace with the correct endpoint URL provided by Gemini.
    const endpoint = "https://api.gemini.com/your-endpoint";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ prompt: message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API request failed:", response.status, errorText);
      throw new Error(`Gemini API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Gemini AI response data:", data);

    // Adjust property name based on Gemini's API response structure
    return data.response || "No response from AI.";
  } catch (error) {
    console.error("Error during Gemini API call:", error);
    throw error;
  }
}