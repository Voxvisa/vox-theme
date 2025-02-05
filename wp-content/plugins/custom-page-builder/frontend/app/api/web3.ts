import { ethers, Contract, Signer, BrowserProvider } from "ethers";

const contractAddress: string = "0xYourContractAddressHere";
const contractABI: string[] = [
  "function purchaseSubscription(string tier) public payable",
  "function getSubscriptionPrice(string tier) public view returns (uint256)",
  "function isSubscriptionActive(uint256 tokenId) public view returns (bool)"
];

// ✅ Zorgt ervoor dat MetaMask beschikbaar is zonder Next.js SSR errors
const getEthereumObject = (): any => {
  if (typeof window !== "undefined" && window.ethereum) {
    return window.ethereum;
  } else {
    console.error("❌ MetaMask niet gevonden.");
    return null;
  }
};

// ✅ Connect wallet met MetaMask
export async function connectWallet(): Promise<Signer | null> {
  const ethereum = getEthereumObject();
  if (!ethereum) return null;

  try {
    const provider = new BrowserProvider(ethereum);
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
  } catch (error) {
    console.error("⚠️ Wallet connectie mislukt:", error);
    return null;
  }
}

// ✅ Abonnement kopen met MetaMask
export async function purchaseSubscription(tier: string): Promise<string> {
  const signer = await connectWallet();
  if (!signer) return "❌ Wallet is niet verbonden.";

  try {
    const contract = new Contract(contractAddress, contractABI, signer);
    const price: ethers.BigNumberish = await contract.getSubscriptionPrice(tier);
    
    const tx = await contract.purchaseSubscription(tier, { value: price });
    await tx.wait();

    return "✅ Abonnement succesvol geactiveerd!";
  } catch (error: any) {
    console.error("⚠️ Transactie mislukt:", error);
    return error.message || "❌ Betaling mislukt, probeer opnieuw.";
  }
}
