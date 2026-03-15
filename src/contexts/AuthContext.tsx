import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "analista" | "op_papel" | "op_toner" | "usuario";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, User & { password: string }> = {
  "admin@empresa.com.br": {
    id: "1",
    name: "Admin Portal",
    email: "admin@empresa.com.br",
    role: "admin",
    password: "admin123",
  },
  "analista@empresa.com.br": {
    id: "2",
    name: "Ana Beatriz",
    email: "analista@empresa.com.br",
    role: "analista",
    password: "analista123",
  },
  "usuario@empresa.com.br": {
    id: "3",
    name: "Ricardo Oliveira",
    email: "usuario@empresa.com.br",
    role: "usuario",
    password: "user123",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const found = MOCK_USERS[email];
    if (found && found.password === password) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
