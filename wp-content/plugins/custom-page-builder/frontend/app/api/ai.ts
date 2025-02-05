import axios from "axios";
import client from "./aiGraphQL";
import { gql } from "@apollo/client";

const AI_API_KEY = process.env.OPENAI_API_KEY;

export async function fetchQuantumAIResponse(prompt: string) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-5",
        prompt,
        max_tokens: 500,
        temperature: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].text.trim();

    // AI-data in de database opslaan via GraphQL
    await client.mutate({
      mutation: gql`
        mutation InsertAIAnalysis($analysis: String!) {
          insert_ai_performance(objects: { analysis: $analysis }) {
            returning {
              id
              analysis
            }
          }
        }
      `,
      variables: { analysis: aiResponse },
    });

    return aiResponse;
  } catch (error) {
    console.error("⚠️ AI Quantum Error:", error);
    return "⚠️ AI Quantum niet beschikbaar.";
  }
}
