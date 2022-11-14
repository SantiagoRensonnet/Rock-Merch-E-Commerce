import { User } from "@firebase/auth";

export type UserContextType = {
  currentUser: User | null;
  setCurrentUser: (value: User | null) => void;
};
