import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function fetchAIResponse(prompt: string) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-4",
        prompt,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Er is een fout opgetreden.";
  }
}
