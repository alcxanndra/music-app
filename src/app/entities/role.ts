import { RoleType } from "./roletype";
import { UserRole } from "./userrole";

export class Role{
    id: number;
    name: RoleType;
    userRoles: UserRole[];

  constructor(id: number, name: RoleType, userRoles: UserRole[]) {
    this.id = id
    this.name = name
    this.userRoles = userRoles
  }
}