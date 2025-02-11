const subscriptions = [
    { id: "basic", name: "Basic", price: 10 },
    { id: "pro", name: "Pro", price: 25 },
    { id: "enterprise", name: "Enterprise", price: 50 },
  ];
  
  export function getAvailableSubscriptions() {
    return subscriptions;
  }
  
  export function getSubscriptionDetails(id: string) {
    return subscriptions.find((sub) => sub.id === id) || null;
  }
  
  export function checkUserSubscription(userId: string) {
    // Simuleer een actieve Pro-abonnement
    return { userId, subscription: "pro", expires: "2025-01-01" };
  }
  