import {GoogleGenerativeAI, HarmCategory,HarmBlockThreshold} from "@google/generative-ai";

import{logger} from "gadget-server";

//this is the maximum number of retry attemts.
const MAX_RETRIES = 3;
//delay in milliseconds
const BASE_DELAY = 1000;

/**
 * this initializes the Google Generative AI client using the API key from environment variables
 * @returns An initialized Google Generative AI client
 */export const initGeminiClient = (): GoogleGenerativeAI => {const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

 if(!apiKey){
    throw new Error("Missing GOOGLE_GEMINI_API_KEY environment variable ");

 }
 return new GoogleGenerativeAI(apiKey);
};

 
/**
 * Default safety settings to prevent harmful content
 */
const defaultSafetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
/**
 * Implements exponential backoff retry logic for API calls
 * @param fn - The async function to retry
 * @param retries - Number of retries remaining
 * @returns The result of the function
 */
async function retryWithExponentialBackoff<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries <= 0) {
        logger.error({ error }, "Maximum retries reached for Gemini API call");
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delay = BASE_DELAY * Math.pow(2, MAX_RETRIES - retries);
      
      logger.info(`Retrying Gemini API call in ${delay}ms. Retries remaining: ${retries}`);
      
      // Wait for the calculated delay
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry with one fewer retry remaining
      return retryWithExponentialBackoff(fn, retries - 1);
    }
  }
   
  /**
   * Generates a response about medication information
   * @param medicationName - The name of the medication to get information about
   * @returns AI-generated information about the medication
   */
  export async function getMedicationInfo(medicationName: string): Promise<string> {
    const genAI = initGeminiClient();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `
      Provide factual information about the medication "${medicationName}".
      Include details about:
      - What this medication is commonly used for
      - Common dosages
      - Potential side effects
      - Warnings and contraindications
      
      Format the information in a clear, concise way. Only include factual, medical information.
    `;
    
    return retryWithExponentialBackoff(async () => {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          safetySettings: defaultSafetySettings,
          generationConfig: {
            temperature: 0.2,  // Low temperature for more factual responses
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1024,
          },
        });
        
        return result.response.text();
      } catch (error) {
        logger.error({ error, medicationName }, "Error generating medication information");
        throw error;
      }
    });
  }
   
  /**
   * Generates information about potential drug interactions
   * @param medications - Array of medication names to check for interactions
   * @returns AI-generated information about potential interactions
   */
  export async function getDrugInteractions(medications: string[]): Promise<string> {
    if (!medications.length || medications.length < 2) {
      return "Please provide at least two medications to check for interactions.";
    }
    
    const genAI = initGeminiClient();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const medicationList = medications.join(", ");
    const prompt = `
      Provide factual information about potential interactions between these medications: ${medicationList}.
      Include:
      - Severity of known interactions (mild, moderate, severe)
      - Effects of the interactions
      - Recommendations for patients taking these medications together
      
      Only include factual, medical information. If there are no known interactions, clearly state that.
    `;
    
    return retryWithExponentialBackoff(async () => {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          safetySettings: defaultSafetySettings,
          generationConfig: {
            temperature: 0.2,  // Low temperature for more factual responses
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1024,
          },
        });
        
        return result.response.text();
      } catch (error) {
        logger.error({ error, medications }, "Error generating drug interaction information");
        throw error;
      }
    });
  }
   
  /**
   * Generates general health advice on a specific topic
   * @param topic - The health topic to get advice about
   * @returns AI-generated health advice
   */
  export async function getHealthAdvice(topic: string): Promise<string> {
    const genAI = initGeminiClient();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `
      Provide evidence-based health advice about "${topic}".
      Include:
      - General information about this health topic
      - Best practices and recommendations
      - When to consult a healthcare professional
      
      Format the information in a clear, concise way. Only include factual, medical information.
      Include a disclaimer that this is general information and not personalized medical advice.
    `;
    
    return retryWithExponentialBackoff(async () => {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          safetySettings: defaultSafetySettings,
          generationConfig: {
            temperature: 0.3,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1024,
          },
        });
        
        return result.response.text() + "\n\nDisclaimer: This information is general in nature and should not replace consultation with a healthcare professional.";
      } catch (error) {
        logger.error({ error, topic }, "Error generating health advice");
        throw error;
      }
    });
  }
   
  /**
   * Analyzes symptoms and provides possible conditions that might be related
   * @param symptoms - Array of symptoms to analyze
   * @returns AI-generated information about possible related conditions
   */
  export async function analyzeSymptoms(symptoms: string[]): Promise<string> {
    const genAI = initGeminiClient();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const symptomList = symptoms.join(", ");
    const prompt = `
      Based on the following symptoms: ${symptomList}, provide information about:
      - Possible related conditions
      - When someone should seek medical attention for these symptoms
      - General advice for managing these symptoms
      
      Include a clear disclaimer that this is not a diagnosis and the person should consult a healthcare professional.
    `;
    
    return retryWithExponentialBackoff(async () => {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          safetySettings: defaultSafetySettings,
          generationConfig: {
            temperature: 0.3,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1024,
          },
        });
        
        return result.response.text() + "\n\nIMPORTANT DISCLAIMER: This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions regarding a medical condition.";
      } catch (error) {
        logger.error({ error, symptoms }, "Error analyzing symptoms");
        throw error;
      }
    });
  }