"use client"

import { User } from "@/app/interfaces/user";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Solo para pruebas
const userMock = { "token": "eyJhbGciOiJIUzI1N", "user": { "id": 1, "username": "admin", "email": "admin@example.com", "firstName": "Admin", "lastName": "User", "roles": [ { "id": 1, "name": "ADMIN", "description": "Administrator with full access", "permissions": [ { "id": 8, "name": "POST_CREATE", "description": "Create posts", "resource": "POST", "action": "CREATE" }, { "id": 11, "name": "POST_ADMIN", "description": "Full admin access to posts", "resource": "POST", "action": "ADMIN" }, { "id": 9, "name": "POST_UPDATE", "description": "Update posts", "resource": "POST", "action": "UPDATE" }, { "id": 1, "name": "USER_READ", "description": "Read user information", "resource": "USER", "action": "READ" }, { "id": 10, "name": "POST_DELETE", "description": "Delete posts", "resource": "POST", "action": "DELETE" }, { "id": 5, "name": "ROLE_READ", "description": "Read role information", "resource": "ROLE", "action": "READ" }, { "id": 6, "name": "ROLE_MANAGE", "description": "Manage roles and permissions", "resource": "ROLE", "action": "MANAGE" }, { "id": 3, "name": "USER_UPDATE", "description": "Update user information", "resource": "USER", "action": "UPDATE" }, { "id": 2, "name": "USER_CREATE", "description": "Create new users", "resource": "USER", "action": "CREATE" }, { "id": 7, "name": "POST_READ", "description": "Read posts", "resource": "POST", "action": "READ" }, { "id": 4, "name": "USER_DELETE", "description": "Delete users", "resource": "USER", "action": "DELETE" } ] } ] }, "expiresIn": 86400000, "type": "Bearer" };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("currentUser");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === "test@test.com" && password === "test123") {
      const mockToken = userMock.token;
      const userData = userMock.user;

      localStorage.setItem("token", mockToken);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      setUser(userData);
      return true;
    }

    return false;

    // TODO: Descomentar el bloque de abajo y probar cuando esté el deploy
    /* 
      try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Credenciales inválidas")
      }

      const data: LoginResponse = await res.json();

      // Guardar en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      // Actualizar el estado
      setUser(data.user);

      return true;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    */
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push("/login");
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
