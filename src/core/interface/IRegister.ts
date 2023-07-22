import { ERole } from "../enum/Erole";

export interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: ERole;
  ownerName?: string;
}
