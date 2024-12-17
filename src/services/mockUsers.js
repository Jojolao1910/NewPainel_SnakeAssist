import { v4 as uuidv4 } from "uuid";

export const mockUsers = [
  {
    id: uuidv4(),
    email: "admin@test.com",
    password: "admin123", // Aplicação real, muda para hash
    name: "Admin User",
    role: "admin",
  },
];

export const findUser = (email, password) => {
  return mockUsers.find(
    (user) => user.email === email && user.password === password
  );
};
