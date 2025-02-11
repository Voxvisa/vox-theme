import { NextRequest, NextResponse } from "next/server";
import { ethers, Contract, JsonRpcProvider, Wallet } from "ethers";

const contractAddress = "0xYourContractAddressHere";
const contractABI = [
  "function purchaseSubscription(string tier) public payable",
  "function getSubscriptionPrice(string tier) public view returns (uint256)",
];

const provider = new JsonRpcProvider(process.env.ALCHEMY_RPC_URL || process.env.INFURA_RPC_URL);
const privateKey = process.env.WEB3_PRIVATE_KEY || "";

if (!privateKey.startsWith("0x") || privateKey.length < 64) {
  console.error("❌ Ongeldige of ontbrekende private key! Controleer je .env.local bestand.");
  throw new Error("Ongeldige Web3 Private Key. Update je .env.local bestand!");
}

const wallet = new Wallet(privateKey, provider);
const contract = new Contract(contractAddress, contractABI, wallet);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier } = body;

    if (!tier) {
      return NextResponse.json({ error: "❌ Tier is vereist!" }, { status: 400 });
    }

    const price = await contract.getSubscriptionPrice(tier);
    const tx = await contract.purchaseSubscription(tier, { value: price });
    await tx.wait();

    return NextResponse.json({ message: "✅ Abonnement succesvol geactiveerd!" });
  } catch (error: any) {
    console.error("⚠️ Web3 Transactie Error:", error);
    return NextResponse.json({ error: error.message || "❌ Betaling mislukt." }, { status: 500 });
  }
}
