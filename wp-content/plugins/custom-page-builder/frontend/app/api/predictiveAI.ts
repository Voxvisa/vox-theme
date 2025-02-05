import axios from "axios";

const AI_API_URL = process.env.NEXT_PUBLIC_AI_ANALYTICS_URL;

export async function getUserPrediction(userId: string) {
  try {
    const response = await axios.post(`${AI_API_URL}/predict`, { userId });
    return response.data;
  } catch (error) {
    console.error("⚠️ AI Prediction Error:", error);
    return { prediction: "Onbekend", confidence: 0 };
  }
}

export async function getMarketTrends() {
  try {
    const response = await axios.get(`${AI_API_URL}/market-trends`);
    return response.data;
  } catch (error) {
    console.error("⚠️ AI Trend Analysis Error:", error);
    return [];
  }
}
