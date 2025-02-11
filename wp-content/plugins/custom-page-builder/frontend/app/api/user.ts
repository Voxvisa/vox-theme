export function getUserProfile(userId: string) {
    return {
      id: userId,
      email: "test@ai-quantum.com",
      name: "Quantum User",
      role: "admin",
      subscription: "pro",
    };
  }
  
  export function updateUserProfile(userId: string, updates: Record<string, any>) {
    return { ...getUserProfile(userId), ...updates };
  }
  