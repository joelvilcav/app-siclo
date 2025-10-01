import { User } from "./user";
import { UserCredentials } from "./user-credentials";

export interface AuthContextType {
  user: User | null;
  login: (userCredentials: UserCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}