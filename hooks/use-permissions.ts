import { Permission } from "@/interfaces/permission";
import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function usePermissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const token = localStorage.getItem("token");

  const fetchPermissions = async () => {
    try {
      if (!token) throw new Error("No hay token, inicia sesión");

      const res = await fetch(`${API_BASE_URL}/permissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener los permisos");

      const data = await res.json();
      setPermissions(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return { permissions, fetchPermissions };
}
