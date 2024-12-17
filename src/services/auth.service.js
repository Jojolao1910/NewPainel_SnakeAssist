import { findUser } from "./mockUsers";

export const authService = {
  async login(email, password) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = findUser(email, password);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Generate a mock token
    const token = btoa(
      JSON.stringify({ userId: user.id, timestamp: Date.now() })
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  },
};
