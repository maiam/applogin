import bcrypt from "bcrypt";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
};

const users = new Map<string, User>();

// usuário demo opcional
const demoUser: User = {
  id: "1",
  email: "admin@demo.com",
  passwordHash: bcrypt.hashSync("admin123", 10),
};

users.set(demoUser.email.toLowerCase(), demoUser);

export function findUserByEmail(email: string) {
  return users.get(email.toLowerCase());
}

export function createUser(email: string, passwordHash: string): User {
  const id = String(Date.now());
  const user: User = { id, email: email.toLowerCase(), passwordHash };
  users.set(user.email, user);
  return user;
}

export function userExists(email: string) {
  return users.has(email.toLowerCase());
}
