export type Role = "admin" | "manager" | "player";

export type User = {
  id: number;
  username: string;
  password: string; // NOTE: plain text for example only; hash in real apps
  role: Role;
};

export const users: User[] = [
  {
    id: 1,
    username: "adminUser",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    username: "managerMike",
    password: "manager123",
    role: "manager",
  },
  {
    id: 3,
    username: "playerPaul",
    password: "player123",
    role: "player",
  },
];
