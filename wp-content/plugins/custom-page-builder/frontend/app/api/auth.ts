import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export async function loginUser(email: string, password: string) {
  // Simuleer een databasegebruiker
  const mockUser = {
    id: "1",
    email: "test@ai-quantum.com",
    passwordHash: await bcrypt.hash("test123", 10),
  };

  // Vergelijk wachtwoorden
  const passwordMatch = await bcrypt.compare(password, mockUser.passwordHash);
  if (!passwordMatch) {
    throw new Error("❌ Ongeldig e-mailadres of wachtwoord.");
  }

  // Genereer JWT-token
  const token = jwt.sign({ userId: mockUser.id, email: mockUser.email }, SECRET_KEY, {
    expiresIn: "7d",
  });

  return { token, user: { id: mockUser.id, email: mockUser.email } };
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}
