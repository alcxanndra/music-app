import { Role } from "./role";
import { User } from "./user";
import { UserRoleId } from "./userroleid";

export class UserRole{
    id: UserRoleId;
    user: User;
    role: Role;


  constructor(id: UserRoleId, user: User, role: Role) {
    this.id = id
    this.user = user
    this.role = role
  }

}