import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const AI_API_KEY = process.env.OPENAI_API_KEY || "";

console.log("🚀 API KEY GELEZEN DOOR NEXT.JS:", AI_API_KEY);

export async function POST(req: NextRequest) {
  try {
    if (!AI_API_KEY) {
      console.error("❌ API KEY ONTBREEKT IN SERVER!");
      return NextResponse.json({ error: "API Key ontbreekt!" }, { status: 500 });
    }

    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is vereist" }, { status: 400 });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
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

    const aiResponse = response.data.choices?.[0]?.message?.content?.trim() ?? "⚠️ Geen reactie van AI";
    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    console.error("⚠️ AI Quantum Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "AI Quantum niet beschikbaar" }, { status: 500 });
  }
}
