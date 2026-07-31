import type { TUserRoles } from "@/api/user/model.js";

export type TUserToken = {
  id: string;
  email: string;
  role: TUserRoles;
};
