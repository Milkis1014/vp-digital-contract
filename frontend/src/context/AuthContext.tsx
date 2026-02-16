import { createContext, useContext } from "react";
import type { Session } from "@supabase/supabase-js";

// 1. Define the shape
export interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

// 2. Create the context object (not exported as a component)
export const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});

// 3. Export the hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
