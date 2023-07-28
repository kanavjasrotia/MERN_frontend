import { ERole } from "../enum/Erole";

export interface IDecodedToken {
  email: string;
  id: string;
  role: ERole.User | ERole.Shop;
}
