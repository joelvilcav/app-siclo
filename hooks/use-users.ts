import { User } from "@/interfaces/user";
import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      if (!token) throw new Error("No hay token, inicia sesión");

      const res = await fetch(`${API_BASE_URL}/users?iod=roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener usuarios");

      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const createUser = async (newUser: User) => {
    try {
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
      setUsers((prev) => [...prev, created]);
      return created;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const updateUser = async (user: User) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error("Error al actualizar usuario");

      const updated = await res.json();
       setUsers((prev) =>
        prev.map((u) => (u.id === updated.id ? updated : u))
      );
      return updated;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar usuario");

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return { users, fetchUsers, createUser, updateUser, deleteUser };
}
