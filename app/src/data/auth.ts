import type { User } from "./users";
import { rolePermissions } from "./permissions";

export function can(user: User, action: string): boolean {
  return rolePermissions[user.role]?.includes(action) ?? false;
}
