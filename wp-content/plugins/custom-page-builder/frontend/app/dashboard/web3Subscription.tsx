"use client";

import { useState } from "react";
import { purchaseSubscription } from "@/app/api/web3"; // ✅ Zorg dat web3.ts hier goed geïmporteerd is!

export default function Web3Subscription() {
  const [status, setStatus] = useState<string>("");

  const handleSubscription = async (tier: string) => {
    setStatus("⏳ Bezig met transactie...");
    const result = await purchaseSubscription(tier);
    setStatus(result);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">🔗 Web3 Abonnement</h2>
      <p className="text-gray-600">Kies een abonnement en betaal via MetaMask.</p>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => handleSubscription("basic")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Koop Basic (€10)
        </button>
        <button
          onClick={() => handleSubscription("premium")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Koop Premium (€30)
        </button>
      </div>

      {status && <p className="mt-4 text-gray-700">{status}</p>}
    </div>
  );
}
