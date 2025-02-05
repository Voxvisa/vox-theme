import { ethers } from "ethers";

const contractAddress = "0xYourContractAddressHere";
const contractABI = [
  "function purchaseSubscription(string tier) public payable",
  "function getSubscriptionPrice(string tier) public view returns (uint256)",
  "function isSubscriptionActive(uint256 tokenId) public view returns (bool)"
];

export async function connectWallet() {
  if (!window.ethereum) {
    alert("Installeer MetaMask om door te gaan!");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
}

export async function purchaseSubscription(tier: string) {
  const signer = await connectWallet();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const price = await contract.getSubscriptionPrice(tier);
  
  try {
    const tx = await contract.purchaseSubscription(tier, { value: price });
    await tx.wait();
    return "✅ Abonnement succesvol geactiveerd!";
  } catch (error) {
    console.error("⚠️ Transactie mislukt:", error);
    return "❌ Fout bij betaling, probeer opnieuw.";
  }
}
