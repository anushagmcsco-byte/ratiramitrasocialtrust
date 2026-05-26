import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Fallback message if key is missing or call fails to keep runtime resilient
const FALLBACK_MESSAGE = (name: string, campaign: string) => `
Dear ${name},

On behalf of Raita Mitra Social Trust (R), we express our heartfelt gratitude for your generous donation towards "${campaign}". 

Your contribution directly supports our mission of uplifing farmers, women SHGs, and rural families in Hubballi, Karnataka. It brings us closer to building self-reliant, resilient communities with sustainable livelihoods.

"ದಾನವೇ ಧರ್ಮದ ಮೂಲ" (Charity is the foundation of righteousness). We are deeply honored by your partnership in grassroots action.

Warm regards,
Trustees, Raita Mitra Social Trust (R)
`;

export async function POST(req: NextRequest) {
  try {
    const { donorName, campaignTitle, amount } = await req.json();

    if (!donorName || !campaignTitle || !amount) {
      return NextResponse.json({ text: FALLBACK_MESSAGE("Donor", "Our Focus Areas") });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback if API key is not set in Secrets
      return NextResponse.json({ text: FALLBACK_MESSAGE(donorName, campaignTitle) });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `
      You are writing a heartfelt, official, beautiful thank-you letter from "Raita Mitra Social Trust (R)",
      a grassroots NGO in Hubballi, Karnataka, India registered as a Public Charitable Trust.
      
      Details of the donation:
      - Donor Name: ${donorName}
      - Project Funded: ${campaignTitle}
      - Amount Donated: INR ${amount}
      
      Requirements:
      1. Express profound gratitude on behalf of the trustees.
      2. Detail how this specific donation of INR ${amount} alters lives for the targeted focus area of "${campaignTitle}".
      3. Include one well-translated blessing or proverb in traditional Kannada script with English translation (e.g. "ಕಾಯಕವೇ ಕೈಲಾಸ" / "Work is Worship" or related to charity/giving back to farmers, like "ದಾನವೇ ಧರ್ಮದ ಮುಖ" or "ಅನ್ನದಾತ ಸುಖೀಭವ" - meaning "May the food provider be blessed").
      4. Sound warm, professional, humble, and noble.
      5. Keep it to around 150-200 words. Refrain from over-hyping.
      6. Return text only.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    const generatedText = response.text || FALLBACK_MESSAGE(donorName, campaignTitle);
    
    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error("Gemini thank-you error:", error);
    return NextResponse.json({ text: FALLBACK_MESSAGE("Donor", "General Fund") });
  }
}
