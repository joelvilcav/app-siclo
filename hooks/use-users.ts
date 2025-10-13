import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) throw new Error("No hay token, inicia sesión");

      const res = await fetch(`${API_BASE_URL}/users?iod=roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener usuarios");

      const data = await res.json();
      console.log("users", data);
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (newUser: any) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Error al crear usuario");

      const created = await res.json();
      console.log('created user', created);
      setUsers((prev) => [...prev, created]);
      return created;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, fetchUsers, createUser };
}
