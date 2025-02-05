import axios from "axios";

const aiClient = axios.create({
  baseURL: "https://api.openai.com/v1", // Basis API-url voor GPT
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Laadt API-key uit .env.local
  },
});

export const fetchAIResponse = async (prompt: string) => {
  try {
    const response = await aiClient.post("/completions", {
      model: "gpt-4",
      prompt,
      max_tokens: 100,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "⚠️ AI-service is tijdelijk niet beschikbaar.";
  }
};

export default aiClient;

