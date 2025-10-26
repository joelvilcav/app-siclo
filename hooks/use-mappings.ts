import { Mapping } from "@/interfaces/mapping";
import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useMappings() {
  const [reservationsMapping, setReservationsMapping] = useState<Mapping[]>([]);
  const [paymentMapping, setPaymentMapping] = useState<Mapping[]>([]);
  const token = localStorage.getItem("token");

  const fetchReservationsMapping = async () => {
    try {
      if (!token) throw new Error("No hay token, inicia sesión");

      const res = await fetch(`${API_BASE_URL}/column-mapping/file-type/RESERVATION`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener los reservations mapping");

      const data = await res.json();
      setReservationsMapping(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const fetchPaymentMapping = async () => {
    try {
      if (!token) throw new Error("No hay token, inicia sesión");

      const res = await fetch(`${API_BASE_URL}/column-mapping/file-type/PAYMENT`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener los payment mapping");

      const data = await res.json();
      setPaymentMapping(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const updateMapping = async (updatedMapping: Mapping[]) => {
    try {
      if (!token) throw new Error("No hay token, inicia sesión");

      const res = await fetch(`${API_BASE_URL}/column-mapping/bulk`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMapping),
      });

      if (!res.ok) throw new Error("Error al actualizar los mapping");
      const updated = await res.json();
      return updated;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return { reservationsMapping, fetchReservationsMapping, paymentMapping, fetchPaymentMapping, updateMapping };
}
