import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useRoles() {
  const [roles, setRoles] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  const fetchRoles = async () => {
    try {
      if (!token) throw new Error("No hay token, inicia sesión");

      const res = await fetch(`${API_BASE_URL}/roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener roles");

      const data = await res.json();
      setRoles(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return { roles, fetchRoles };
}
