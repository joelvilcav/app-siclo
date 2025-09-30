import { User } from "./user";

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
  type: string; // normalmente "Bearer"
}

