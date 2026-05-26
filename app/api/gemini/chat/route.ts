import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { LEGAL_COMPLIANCE, CONTACT_INFO, FOCUS_AREAS } from "@/lib/data";

const CHAT_FALLBACK = "Raita Mitra Social Trust (R) is a registered charitable trust (Reg No: HBL-4-00006-2021-22) established in 2021 in Hubballi, Karnataka. We focus on agriculture, women empowerment, digital skills, rural health, and climate action. How can we help you today?";

export async function POST(req: NextRequest) {
  try {
    const { message, chatHistory } = await req.json();

    if (!message) {
      return NextResponse.json({ text: "Please enter a question about Raita Mitra Social Trust." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a basic keyword-oriented response if API key is not configured to avoid breaking the application
      const normalizedMsg = message.toLowerCase();
      if (normalizedMsg.includes("register") || normalizedMsg.includes("legal") || normalizedMsg.includes("trust") || normalizedMsg.includes("pan") || normalizedMsg.includes("80g")) {
        return NextResponse.json({ 
          text: `Raita Mitra Social Trust (R) is registered under the Indian Trusts Act, 1882 (Registration No: ${LEGAL_COMPLIANCE.registrationNo}). We are recognized on the NGO Darpan portal (ID: ${LEGAL_COMPLIANCE.ngoDarpanId}), hold PAN number ${LEGAL_COMPLIANCE.pan}, CSR Registration No: ${LEGAL_COMPLIANCE.csrNo}, and hold provisional 80G tax exemption status.` 
        });
      }
      if (normalizedMsg.includes("address") || normalizedMsg.includes("contact") || normalizedMsg.includes("phone") || normalizedMsg.includes("email")) {
        return NextResponse.json({ 
          text: `You can reach out to us at our Registered Office: ${CONTACT_INFO.address}. Phone: ${CONTACT_INFO.phone}. Email: ${CONTACT_INFO.email}.` 
        });
      }
      if (normalizedMsg.includes("where") || normalizedMsg.includes("district") || normalizedMsg.includes("area") || normalizedMsg.includes("karnataka")) {
        return NextResponse.json({ 
          text: `Our primary operational areas are throughout Karnataka, specifically targeting districts such as Dharwad, Belagavi, Haveri, Raichur, Koppal, and nearby rural clusters.` 
        });
      }
      return NextResponse.json({ text: CHAT_FALLBACK });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const trustContext = `
      You are "Smart Mitra", the official AI Chatbot for Raita Mitra Social Trust (R), a registered Public Charitable Trust. Your tone is warm, humble, highly accurate, and helpful. You speak explicitly on behalf of the trust.
      
      Here is the complete, verified legal and compliance grounding:
      - Name: Raita Mitra Social Trust (R)
      - Type of Organization: Public Charitable Trust, established in 2021 in Hubballi, Karnataka.
      - Registered Under: Indian Trusts Act, 1882
      - Registration ID: ${LEGAL_COMPLIANCE.registrationNo}
      - NGO Darpan ID: ${LEGAL_COMPLIANCE.ngoDarpanId}
      - PAN Card Code: ${LEGAL_COMPLIANCE.pan}
      - CSR Registration No: ${LEGAL_COMPLIANCE.csrNo}
      - 80G Tax-exempt provisional approval: Valid for assessment years 2024-25 through 2026-27. Donors receive 50% income-tax deductions.
      - Headquarters Address: ${CONTACT_INFO.address}
      - Contact Coordinates: Phone ${CONTACT_INFO.phone}, Email ${CONTACT_INFO.email}
      - Core Operational Area: Karnataka (including Hubballi, Dharwad, Belagavi, Haveri, Raichur, Koppal, and nearby dryland sectors).
      
      Our 6 Core focus areas are:
      ${FOCUS_AREAS.map(f => `${f.number}. ${f.title}: ${f.description} (Target: ₹${f.targetGoal}, Raised: ₹${f.raisedAmount}). Sub-projects include: ${f.projects.map(p => p.name).join(', ')}.`).join('\n')}
      
      Instruction Rules:
      1. Answer the user's question directly and concisely based ONLY on this grounding context.
      2. If a user asks a general agriculture or technology question, answer it while connecting it back to how Raita Mitra supports that stream via native initiatives.
      3. Keep the language humble and polite. If you do not know the answer, ask them to call or email the trustees directly at ${CONTACT_INFO.phone} or ${CONTACT_INFO.email}.
      4. Avoid fake info or speculating on figures not provided in the prompt.
    `;

    // Process history if provided
    const formattedHistory = (chatHistory || []).map((h: { sender: string; text: string }) => {
      return {
        role: h.sender === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      };
    });

    // Generate output
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: trustContext,
        temperature: 0.3,
      }
    });

    return NextResponse.json({ text: response.text || CHAT_FALLBACK });
  } catch (error) {
    console.error("Gemini smart chat error:", error);
    return NextResponse.json({ text: CHAT_FALLBACK });
  }
}
