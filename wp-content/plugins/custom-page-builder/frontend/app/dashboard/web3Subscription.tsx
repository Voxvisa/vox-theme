import { useEffect, useState } from "react";
import { connectWallet, purchaseSubscription } from "../api/web3";

export default function Web3Subscription() {
  const [status, setStatus] = useState("⏳ Laden...");
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    async function checkConnection() {
      try {
        const signer = await connectWallet();
        setWallet(await signer.getAddress());
        setStatus("✅ Wallet verbonden");
      } catch {
        setStatus("⚠️ Niet verbonden");
      }
    }
    checkConnection();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">🔗 Web3 Abonnement</h2>
      <p className="mt-2">{status}</p>
      <button onClick={() => purchaseSubscription("Pro")} className="mt-4 p-3 bg-blue-600 text-white">
        🏆 Pro Abonnement Kopen (0.1 ETH)
      </button>
    </div>
  );
}
