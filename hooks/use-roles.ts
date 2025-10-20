import { Role } from "@/interfaces/role";
import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const token = localStorage.getItem("token");

  const fetchRoles = async () => {
    try {
      if (!token) throw new Error("No hay token, inicia sesión");

      const res = await fetch(`${API_BASE_URL}/roles?iod=permissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener roles");

      const data = await res.json();
      setRoles(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const updateRole = async (roleId: number, updatedRole: Role) => {
    try {
      if (!token) throw new Error("No hay token, inicia sesión");

      const res = await fetch(`${API_BASE_URL}/roles/${roleId}`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRole),
      });

      if (!res.ok) throw new Error("Error al actualizar los roles");
      const updated = await res.json();
      return updated;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return { roles, fetchRoles, updateRole };
}
