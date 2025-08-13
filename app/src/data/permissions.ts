import type { Role } from "./users";

type Permissions = {
  [K in Role]: string[]; // actions allowed
};

export const rolePermissions: Permissions = {
  admin: ["view_futsals", "book_futsal", "edit_futsals", "delete_futsals"],
  manager: ["view_futsals", "book_futsal", "edit_futsals"],
  player: ["view_futsals", "book_futsal"],
};
