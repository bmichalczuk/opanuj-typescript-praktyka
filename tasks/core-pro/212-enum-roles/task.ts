export enum UserPermission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  VIEW = 'VIEW',
}
export enum UserRole {
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  ADMIN = 'ADMIN',
}

export interface User {
  role: UserRole;
  permissions: UserPermission[];
}

export function hasAccess(user: User, requiredPermission: UserPermission): boolean {
  if (user.role === 'ADMIN') return true;
  return user.permissions.includes(requiredPermission);
}
