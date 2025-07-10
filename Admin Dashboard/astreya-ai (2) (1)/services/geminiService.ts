import { GoogleGenAI, Type } from "@google/genai";
import { AiTriageResult, Severity, Incident, AiCitySummary } from "../types";

// This check is to prevent crashing in environments where process.env is not defined.
// The user-provided key is used as a fallback for local development.
// In a production environment, API_KEY should be set as an environment variable.
const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY)
  ? process.env.API_KEY
  : "AIzaSyCxDSKRqXPxYBtVkZf4vM8wsCBaIRgcfGE"; // Fallback for development

const useMock = apiKey === "AIzaSyCxDSKRqXPxYBtVkZf4vM8wsCBaIRgcfGE";

if (useMock) {
    console.warn("Using mock Gemini API responses. For real results, please provide a valid API_KEY environment variable.");
}
  
const ai = new GoogleGenAI({ apiKey });

const triageSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A concise, one-sentence summary of the incident.",
    },
    priority: {
      type: Type.STRING,
      enum: Object.values(Severity),
      description: "The assessed priority level of the incident.",
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of 2-3 brief, actionable recommendations for the responsible department.",
    },
  },
  required: ["summary", "priority", "recommendations"],
};

export async function getAITriage(description: string): Promise<AiTriageResult> {
  if (useMock) {
      return new Promise(resolve => setTimeout(() => resolve({
          summary: "A major water pipe has burst, causing significant flooding and traffic disruption.",
          priority: Severity.Critical,
          recommendations: [
              "Dispatch emergency water works crew immediately.",
              "Alert traffic police to redirect vehicles.",
              "Issue a public service announcement for the affected area."
          ]
      }), 1500));
  }

  try {
    const prompt = `
      You are an AI assistant for a city's civic authority. Analyze the following incident report.
      Your task is to provide a triage assessment in JSON format.
      
      Incident Report: "${description}"
      
      Based on the report, provide a concise summary, assess the priority, and suggest actionable recommendations.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: triageSchema,
      },
    });

    const jsonText = response.text;
    const result = JSON.parse(jsonText);

    if (!Object.values(Severity).includes(result.priority as Severity)) {
        throw new Error(`Invalid priority value received from API: ${result.priority}`);
    }

    return result as AiTriageResult;
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get AI Triage from Gemini API.");
  }
}

const citySummarySchema = {
    type: Type.OBJECT,
    properties: {
        situation: {
            type: Type.STRING,
            description: "A 2-3 sentence overview of the current city-wide situation based on the incidents."
        },
        recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3 high-level strategic recommendations for the city administration."
        }
    },
    required: ["situation", "recommendations"]
};

export async function getAiCitySummary(incidents: Incident[]): Promise<AiCitySummary> {
    if (useMock) {
        return new Promise(resolve => setTimeout(() => resolve({
            situation: "The city is currently experiencing a high volume of public works and traffic-related issues, particularly in the downtown and northside areas. Multiple reports of water leakages and power outages suggest potential infrastructure strain. A cluster of high-severity traffic incidents requires immediate attention.",
            recommendations: [
                "Increase patrol units in the Downtown area to manage traffic disruptions.",
                "Deploy public works assessment teams to the Northside to investigate correlated water and power issues.",
                "Send a public safety alert regarding the traffic signal malfunctions on major avenues."
            ]
        }), 2000));
    }

    const incidentsSummary = incidents
        .map(i => `- ${i.type} (${i.severity}) at ${i.location.address}`)
        .join("\n");
    
    const prompt = `
        You are an AI city operations analyst. Based on the following list of active incidents, provide a high-level situation overview and three strategic recommendations for the city administrator.
        
        Current Incidents:
        ${incidentsSummary}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: citySummarySchema,
            }
        });
        const jsonText = response.text;
        return JSON.parse(jsonText) as AiCitySummary;
    } catch (error) {
        console.error("Error calling Gemini API for city summary:", error);
        throw new Error("Failed to get AI City Summary from Gemini API.");
    }
}