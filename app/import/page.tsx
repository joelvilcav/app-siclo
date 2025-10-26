"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UploadedFiles } from "@/interfaces/file-type";
import { useMappings } from "@/hooks/use-mappings";
import { Mapping } from "@/interfaces/mapping";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ImportPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({ class: null, payments: null });
  const { reservationsMapping, fetchReservationsMapping, paymentMapping, fetchPaymentMapping, updateMapping } = useMappings();
  const [mappingToUpdate, setMappingToUpdate] = useState<Mapping[]>([]);
  const [inputValues, setInputValues] = useState<{ [id: number]: string }>({});

  useEffect(() => {
    fetchReservationsMapping();
    fetchPaymentMapping();
  }, []);

  const handleFileUpload = (type: keyof UploadedFiles, file: File | null) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const uploadFile = async (type: keyof UploadedFiles) => {
    const file = uploadedFiles[type];
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const endpoint = type === "class"
        ? `${API_BASE_URL}/files/upload/reservations`
        : `${API_BASE_URL}/files/upload/payments`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Error en el POST");

      const result = await res.text();
      console.log(`File uploaded with: ${result}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveChanges = async () => {
    if (mappingToUpdate.length === 0) {
      console.log("No hay cambios que guardar");
      return;
    }
    await updateMapping(mappingToUpdate);
    setMappingToUpdate([]);
    setInputValues({});
    await Promise.all([fetchReservationsMapping(), fetchPaymentMapping()]);
  };

  const handleInputChange = (mappingId: number, newHeader: string, type: string) => {
    setInputValues((prev) => ({ ...prev, [mappingId]: newHeader }));
    setMappingToUpdate((prev) => {
      const existing = prev.find((m) => m.mappingId === mappingId);
      if (existing) {
        return prev.map((m) =>
          m.mappingId === mappingId ? { ...m, excelHeader: newHeader } : m
        );
      } else {
        const base =
          type === 'reservations'
            ? reservationsMapping.find((r) => r.mappingId === mappingId)
            : paymentMapping.find((p) => p.mappingId === mappingId);

        if (!base) return prev;

        return [...prev, { ...base, excelHeader: newHeader }];
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#1F2937]">
          Importar Datos
        </h2>
        <p className="text-[#6B7280] mt-1">
          Importa datos de clases y compras desde archivos Excel
        </p>
      </div>

      <Tabs defaultValue="clases" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-[#F8FAFC] border border-[#E5E7EB] p-1 rounded-lg">
          <TabsTrigger
            value="clases"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-[#E5E7EB] rounded-md font-medium"
          >
            Importar Clases
          </TabsTrigger>
          <TabsTrigger
            value="compras"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-[#E5E7EB] rounded-md font-medium"
          >
            Importar Compras
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clases" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#F8FAFC] shadow-sm border border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-[#6366F1]" />
                  Subir Archivo de Clases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[#1F2937]">
                      Arrastra tu archivo Excel aquí
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      o haz clic para seleccionar
                    </p>
                  </div>
                  <Input
                    type="file"
                    accept=".xlsx,.xls"
                    className="mt-4"
                    onChange={(e) =>
                      handleFileUpload("class", e.target.files?.[0] || null)
                    }
                  />
                </div>

                {uploadedFiles.class && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      {uploadedFiles.class.name}
                    </span>
                  </div>
                )}

                <Button
                  className="w-full bg-[#6366F1] hover:bg-[#5B5BD6] cursor-pointer"
                  disabled={!uploadedFiles.class}
                  onClick={() => uploadFile("class")}
                >
                  Procesar Archivo de Clases
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#F8FAFC] shadow-sm border border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#1F2937]">
                  Formato Requerido - Clases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p className="font-medium text-[#1F2937]">
                    Columnas requeridas:
                  </p>
                  <ul className="space-y-1 text-[#6B7280] max-h-72 overflow-y-scroll scrollbar-visible pr-5">
                    {reservationsMapping.map((res) => (
                      <div key={res.mappingId} className="mb-4">
                        <li className="mb-1">{`• ${res.excelHeader}`}</li>
                        <Input
                          value={inputValues[res.mappingId!] ?? ""}
                          onChange={(e) => handleInputChange(res.mappingId!, e.target.value, 'reservations')}
                        />
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveChanges}
                        className="bg-[#6366F1] hover:bg-[#5B5BD6] text-white cursor-pointer"
                      >
                        Guardar Cambios
                      </Button>
                    </div>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compras" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#F8FAFC] shadow-sm border border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-[#6366F1]" />
                  Subir Archivo de Compras
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[#1F2937]">
                      Arrastra tu archivo Excel aquí
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      o haz clic para seleccionar
                    </p>
                  </div>
                  <Input
                    type="file"
                    accept=".xlsx,.xls"
                    className="mt-4"
                    onChange={(e) =>
                      handleFileUpload("payments", e.target.files?.[0] || null)
                    }
                  />
                </div>

                {uploadedFiles.payments && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      {uploadedFiles.payments.name}
                    </span>
                  </div>
                )}

                <Button
                  className="w-full bg-[#6366F1] hover:bg-[#5B5BD6]"
                  disabled={!uploadedFiles.payments}
                  onClick={() => uploadFile("payments")}
                >
                  Procesar Archivo de Compras
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#F8FAFC] shadow-sm border border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#1F2937]">
                  Formato Requerido - Compras
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p className="font-medium text-[#1F2937]">
                    Columnas principales:
                  </p>
                  <ul className="space-y-1 text-[#6B7280] max-h-72 overflow-y-scroll scrollbar-visible pr-5">
                    {paymentMapping.map((res) => (
                      <div key={res.mappingId} className="mb-4">
                        <li className="mb-1">{`• ${res.excelHeader}`}</li>
                        <Input
                          value={inputValues[res.mappingId!] ?? ""}
                          onChange={(e) => handleInputChange(res.mappingId!, e.target.value, 'payment')}
                        />
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSaveChanges}
                        className="bg-[#6366F1] hover:bg-[#5B5BD6] text-white cursor-pointer"
                      >
                        Guardar Cambios
                      </Button>
                    </div>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Historial de importaciones */}
      <Card className="bg-[#F8FAFC] shadow-sm border border-[#E5E7EB]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#1F2937]">
            Historial de Importaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white border border-[#E5E7EB] rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-[#1F2937]">
                    clases_enero_2024.xlsx
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    Importado el 15 Ene 2024 - 1,247 registros
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ver Detalles
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-[#E5E7EB] rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-[#1F2937]">
                    compras_diciembre_2023.xlsx
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    Importado el 10 Ene 2024 - 892 registros (3 errores)
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ver Errores
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
