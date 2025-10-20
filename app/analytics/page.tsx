"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import {
  DollarSign,
  Calendar,
  UserPlus,
  Users,
  TrendingUp,
  AlertTriangle,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useReports } from "@/hooks/use-reports"
import { getSeriesKeys, transformReportResponse } from "@/lib/transform-report"
import { formatDate } from "@/lib/format-date"
import { InteractiveChartLegend } from "@/components/interactive-chart-legend"
import { useChartLegend } from "@/hooks/use-chart-legend"

const transaccionesMercadoPago = [
  { name: "Ene", aprobadas: 385, pendientes: 25, rechazadas: 15, devueltas: 8 },
  { name: "Feb", transacciones: 445, pendientes: 18, rechazadas: 12, devueltas: 5 },
  { name: "Mar", aprobadas: 580, pendientes: 32, rechazadas: 20, devueltas: 12 },
  { name: "Abr", aprobadas: 620, pendientes: 28, rechazadas: 18, devueltas: 9 },
  { name: "May", aprobadas: 720, pendientes: 35, rechazadas: 25, devueltas: 15 },
  { name: "Jun", aprobadas: 780, pendientes: 30, rechazadas: 22, devueltas: 11 },
]

const clientesVIP = [
  {
    id: 1,
    nombre: "María González",
    reservas: 67,
    ultimaReserva: "Hoy",
    gastoTotal: "S/2,450",
    disciplinaFavorita: "Yoga",
    estudio: "Miraflores",
  },
  {
    id: 2,
    nombre: "Carlos Mendoza",
    reservas: 58,
    ultimaReserva: "Ayer",
    gastoTotal: "S/2,180",
    disciplinaFavorita: "CrossFit",
    estudio: "San Isidro",
  },
  {
    id: 3,
    nombre: "Ana Rodríguez",
    reservas: 54,
    ultimaReserva: "2 días",
    gastoTotal: "S/1,980",
    disciplinaFavorita: "Pilates",
    estudio: "Surco",
  },
  {
    id: 4,
    nombre: "Luis Vargas",
    reservas: 52,
    ultimaReserva: "Hoy",
    gastoTotal: "S/1,850",
    disciplinaFavorita: "Spinning",
    estudio: "Lima Centro",
  },
  {
    id: 5,
    nombre: "Patricia Silva",
    reservas: 51,
    ultimaReserva: "3 días",
    gastoTotal: "S/1,720",
    disciplinaFavorita: "Yoga",
    estudio: "Miraflores",
  },
]

const clientesInactivos = [
  {
    id: 1,
    nombre: "Roberto Díaz",
    ultimaReserva: "4 meses",
    totalReservas: 23,
    gastoTotal: "S/890",
    disciplina: "CrossFit",
    estudio: "San Isidro",
  },
  {
    id: 2,
    nombre: "Carmen López",
    ultimaReserva: "5 meses",
    totalReservas: 18,
    gastoTotal: "S/1,200",
    disciplina: "Pilates",
    estudio: "Surco",
  },
  {
    id: 3,
    nombre: "Miguel Torres",
    ultimaReserva: "4 meses",
    totalReservas: 15,
    gastoTotal: "S/650",
    disciplina: "Yoga",
    estudio: "Miraflores",
  },
  {
    id: 4,
    nombre: "Elena Vásquez",
    ultimaReserva: "6 meses",
    totalReservas: 28,
    gastoTotal: "S/780",
    disciplina: "Spinning",
    estudio: "Lima Centro",
  },
  {
    id: 5,
    nombre: "Jorge Ramírez",
    ultimaReserva: "7 meses",
    totalReservas: 12,
    gastoTotal: "S/420",
    disciplina: "CrossFit",
    estudio: "San Isidro",
  },
]

const instructoresTop = [
  {
    id: 1,
    nombre: "Sofia Ramírez",
    totalReservas: 234,
    disciplina: "Yoga",
    estudio: "Miraflores",
    ingresosMes: "S/8,450",
    clientesUnicos: 45,
  },
  {
    id: 2,
    nombre: "Diego Morales",
    totalReservas: 198,
    disciplina: "CrossFit",
    estudio: "San Isidro",
    ingresosMes: "S/7,200",
    clientesUnicos: 38,
  },
  {
    id: 3,
    nombre: "Isabella Cruz",
    totalReservas: 176,
    disciplina: "Pilates",
    estudio: "Surco",
    ingresosMes: "S/6,800",
    clientesUnicos: 42,
  },
  {
    id: 4,
    nombre: "Andrés Vega",
    totalReservas: 165,
    disciplina: "Spinning",
    estudio: "Lima Centro",
    ingresosMes: "S/6,200",
    clientesUnicos: 35,
  },
  {
    id: 5,
    nombre: "Camila Torres",
    totalReservas: 152,
    disciplina: "Yoga",
    estudio: "San Isidro",
    ingresosMes: "S/5,800",
    clientesUnicos: 40,
  },
]

const disciplinasPopulares = [
  { id: "01", nombre: "Yoga", totalReservas: 445, clientesUnicos: 89, ingresosMes: "S/15,200" },
  { id: "02", nombre: "CrossFit", totalReservas: 389, clientesUnicos: 76, ingresosMes: "S/13,800" },
  { id: "03", nombre: "Pilates", totalReservas: 356, clientesUnicos: 68, ingresosMes: "S/12,400" },
  { id: "04", nombre: "Spinning", totalReservas: 298, clientesUnicos: 58, ingresosMes: "S/10,600" },
  { id: "05", nombre: "Zumba", totalReservas: 234, clientesUnicos: 52, ingresosMes: "S/8,900" },
]

const estudiosPorCiudad = [
  { nombre: "Lima Centro", reservas: 445, ingresos: 18500, color: "#FF6B6B" },
  { nombre: "Miraflores", reservas: 389, ingresos: 22300, color: "#4ECDC4" },
  { nombre: "San Isidro", reservas: 356, ingresos: 28900, color: "#45B7D1" },
  { nombre: "Surco", reservas: 298, ingresos: 16800, color: "#96CEB4" },
  { nombre: "Otros", reservas: 134, ingresos: 8200, color: "#FFEAA7" },
]

const rendimientoEstudios = [
  { name: "Ene", miraflores: 850, sanIsidro: 920, surco: 680, limaCentro: 750 },
  { name: "Feb", miraflores: 920, sanIsidro: 1050, surco: 720, limaCentro: 820 },
  { name: "Mar", miraflores: 1100, sanIsidro: 1200, surco: 850, limaCentro: 950 },
  { name: "Abr", miraflores: 1250, sanIsidro: 1380, surco: 920, limaCentro: 1080 },
  { name: "May", miraflores: 1400, sanIsidro: 1520, surco: 1050, limaCentro: 1200 },
  { name: "Jun", miraflores: 1580, sanIsidro: 1720, surco: 1180, limaCentro: 1350 },
]

const metodosPago = [
  { metodo: "Tarjeta de Crédito", transacciones: 456, monto: "S/45,600", porcentaje: 45 },
  { metodo: "Tarjeta de Débito", transacciones: 234, monto: "S/23,400", porcentaje: 23 },
  { metodo: "Transferencia", transacciones: 189, monto: "S/18,900", porcentaje: 19 },
  { metodo: "Efectivo", transacciones: 132, monto: "S/13,200", porcentaje: 13 },
]

const colors = [
  { stroke: "#FF6B6B", fill: "url(#colorMiraflores)" },
  { stroke: "#4ECDC4", fill: "url(#colorSanIsidro)" },
  { stroke: "#45B7D1", fill: "url(#colorSurco)" },
  { stroke: "#96CEB4", fill: "url(#colorLimaCentro)" },
];

export default function AnalyticsPage() {
  const [currentPageVIP, setCurrentPageVIP] = useState(1)
  const [currentPageInactivos, setCurrentPageInactivos] = useState(1)
  const [currentPageInstructores, setCurrentPageInstructores] = useState(1)

  const [startDate, setStartDate] = useState("2025-07-07");
  const [endDate, setEndDate] = useState("2025-07-20");
  const { dataStudio, dataInstructor, dataDiscipline, loading, error, fetchReports } = useReports();

  useEffect(() => {
    fetchReports(startDate, endDate);
  }, []);

  const dataStudioChart = dataStudio ? transformReportResponse(dataStudio) : [];
  const dataDisciplineChart = dataDiscipline ? transformReportResponse(dataDiscipline) : [];
  const dataInstructorChart = dataInstructor ? transformReportResponse(dataInstructor) : [];

  const { hidden: hiddenStudio, legendItems: legendStudioItems, visibleItems: visibleStudioItems, handleLegendClick: handleStudioLegend } = useChartLegend(dataStudioChart, colors);
  const { hidden: hiddenDiscipline, legendItems: legendDisciplineItems, visibleItems: visibleDisciplineItems, handleLegendClick: handleDisciplineLegend } = useChartLegend(dataDisciplineChart, colors);
  const { hidden: hiddenInstructor, legendItems: legendInstructorItems, visibleItems: visibleInstructorItems, handleLegendClick: handleInstructorLegend } = useChartLegend(dataInstructorChart, colors, true);

  const itemsPerPage = 3;

  const paginate = (items: any[], currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return items.slice(startIndex, startIndex + itemsPerPage)
  }

  const getTotalPages = (items: any[]) => Math.ceil(items.length / itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Resumen General</h2>
          <p className="text-muted-foreground mt-1">Métricas principales del negocio</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Label className="text-sm text-muted-foreground">Rango de fechas:</Label>
          </div>

          <div className="flex items-center gap-2">
            <Input type="date" className="w-[160px] h-9" onChange={(e) => setStartDate(e.target.value)}/>
            <span className="text-muted-foreground text-sm">a</span>
            <Input type="date" className="w-[160px] h-9" onChange={(e) => setEndDate(e.target.value)}/>
          </div>

          <Button size="sm" className="h-9 px-4" onClick={() => fetchReports(startDate, endDate)}>
            Aplicar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="gradient-card-red shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 dark:text-red-400 text-lg lg:text-xl font-bold">S/45.2K</p>
                <p className="text-red-800 dark:text-red-300 text-xs mt-1">Ingresos Totales</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-red-600 dark:text-red-400 text-xs">+12% este mes</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card-orange shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 dark:text-orange-400 text-lg lg:text-xl font-bold">1,247</p>
                <p className="text-orange-800 dark:text-orange-300 text-xs mt-1">Total Reservas</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-orange-600 dark:text-orange-400 text-xs">+8% este mes</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card-green shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-lg lg:text-xl font-bold">342</p>
                <p className="text-green-800 dark:text-green-300 text-xs mt-1">Clientes Activos</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-green-600 dark:text-green-400 text-xs">+15% este mes</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card-purple shadow-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400 text-lg lg:text-xl font-bold">67</p>
                <p className="text-purple-800 dark:text-purple-300 text-xs mt-1">Nuevos Clientes</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-purple-600 dark:text-purple-400 text-xs">+22% este mes</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-muted border border-border p-1 rounded-lg">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border rounded-md font-medium text-muted-foreground data-[state=active]:text-foreground"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="clientes"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border rounded-md font-medium text-muted-foreground data-[state=active]:text-foreground"
          >
            Clientes
          </TabsTrigger>
          <TabsTrigger
            value="instructores"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border rounded-md font-medium text-muted-foreground data-[state=active]:text-foreground"
          >
            Instructores
          </TabsTrigger>
          <TabsTrigger
            value="estudios"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border rounded-md font-medium text-muted-foreground data-[state=active]:text-foreground"
          >
            Estudios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="bg-card shadow-sm border border-border">
              <CardHeader className="pb-4 relative">
                <CardTitle className="text-lg font-semibold text-card-foreground">Reservaciones por Estudio</CardTitle>
                <InteractiveChartLegend
                  category="Estudio"
                  items={legendStudioItems}
                  visibleItems={visibleStudioItems}
                  onToggle={handleStudioLegend}
                  showFinder={false}
                />
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dataStudioChart}>
                    <defs>
                      <linearGradient id="colorMiraflores" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorSanIsidro" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorSurco" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#45B7D1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#45B7D1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorLimaCentro" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#96CEB4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#96CEB4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      ticks={
                        dataStudioChart.length > 0
                        ? [dataStudioChart[0]?.name, dataStudioChart[dataStudioChart.length - 1]?.name]
                        : []
                      }
                      tickFormatter={(value) => formatDate(value)}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: "#6B7280" }} 
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip labelFormatter={(value) => formatDate(value)}/>
                    {getSeriesKeys(dataStudioChart).map((key, index) => (
                      <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={colors[index % colors.length].stroke}
                        fillOpacity={1}
                        fill={colors[index % colors.length].fill}
                        strokeWidth={2}
                        dot={false}
                        name={key}
                        hide={hiddenStudio[key]}
                      />
                    ))}
                    <Legend onClick={handleStudioLegend}/>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm border border-border">
              <CardHeader className="pb-4 relative">
                <CardTitle className="text-lg font-semibold text-card-foreground">Reservaciones por Disciplina</CardTitle>
                <InteractiveChartLegend
                  category="Disciplina"
                  items={legendDisciplineItems}
                  visibleItems={visibleDisciplineItems}
                  onToggle={handleDisciplineLegend}
                  showFinder={false}
                />
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dataDisciplineChart}>
                    <defs>
                      <linearGradient id="colorConfirmadas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCanceladas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      ticks={
                        dataDisciplineChart.length > 0
                        ? [dataDisciplineChart[0]?.name, dataDisciplineChart[dataDisciplineChart.length - 1]?.name]
                        : []
                      }
                      tickFormatter={(value) => formatDate(value)}
                    />
                    <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                    <Tooltip labelFormatter={(value) => formatDate(value)} />
                    {getSeriesKeys(dataDisciplineChart).map((key, index) => (
                      <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={colors[index % colors.length].stroke}
                        fillOpacity={1}
                        fill={colors[index % colors.length].fill}
                        strokeWidth={2}
                        dot={false}
                        name={key}
                        hide={hiddenDiscipline[key]}
                      />
                    ))}
                    <Legend onClick={handleDisciplineLegend}/>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card shadow-sm border border-border">
            <CardHeader className="pb-4 relative">
              <CardTitle className="text-lg font-semibold text-card-foreground">Reservaciones por Instructor</CardTitle>
              <InteractiveChartLegend
                category="Instructor"
                items={legendInstructorItems}
                visibleItems={visibleInstructorItems}
                onToggle={handleInstructorLegend}
                showFinder={true}
              />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dataInstructorChart}>
                  <defs>
                    <linearGradient id="colorAprobadas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPendientes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRechazadas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      ticks={
                        dataInstructorChart.length > 0
                        ? [dataInstructorChart[0]?.name, dataInstructorChart[dataInstructorChart.length - 1]?.name]
                        : []
                      }
                      tickFormatter={(value) => formatDate(value)}
                    />
                  <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                  <Tooltip labelFormatter={(value) => formatDate(value)}/>
                  {getSeriesKeys(dataInstructorChart).map((key, index) => (
                      <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={colors[index % colors.length].stroke}
                        fillOpacity={1}
                        fill={colors[index % colors.length].fill}
                        strokeWidth={2}
                        dot={false}
                        name={key}
                        hide={hiddenInstructor[key]}
                      />
                    ))}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-sm border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-card-foreground">Transacciones Mercado Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={transaccionesMercadoPago}>
                  <defs>
                    <linearGradient id="colorAprobadas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPendientes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRechazadas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="aprobadas"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorAprobadas)"
                    strokeWidth={2}
                    dot={false}
                    name="Aprobadas"
                  />
                  <Area
                    type="monotone"
                    dataKey="pendientes"
                    stroke="#F59E0B"
                    fillOpacity={1}
                    fill="url(#colorPendientes)"
                    strokeWidth={2}
                    dot={false}
                    name="Pendientes"
                  />
                  <Area
                    type="monotone"
                    dataKey="rechazadas"
                    stroke="#EF4444"
                    fillOpacity={1}
                    fill="url(#colorRechazadas)"
                    strokeWidth={2}
                    dot={false}
                    name="Rechazadas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Fila inferior */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-card shadow-sm border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-card-foreground">Disciplinas Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-medium text-[#6B7280] pb-2">
                    <span>#</span>
                    <span>Disciplina</span>
                    <span>Reservas</span>
                    <span>Ingresos</span>
                  </div>
                  {disciplinasPopulares.map((disciplina) => (
                    <div key={disciplina.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-sm font-medium text-[#6B7280] w-6">{disciplina.id}</span>
                        <span className="text-sm font-medium text-[#1F2937] flex-1">{disciplina.nombre}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="text-xs bg-white text-[#374151] border border-[#E5E7EB]">
                          {disciplina.totalReservas}
                        </Badge>
                        <span className="text-sm font-semibold text-[#10B981] min-w-[60px]">
                          {disciplina.ingresosMes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-card-foreground">Estudios por Ciudad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-48 h-32 bg-white rounded-lg flex items-center justify-center border border-[#E5E7EB]">
                    <MapPin className="w-8 h-8 text-[#6B7280]" />
                  </div>
                </div>
                <div className="space-y-2">
                  {estudiosPorCiudad.map((estudio, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: estudio.color }}></div>
                        <span className="text-[#374151]">{estudio.nombre}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#1F2937]">{estudio.reservas}</span>
                        <span className="text-xs text-[#6B7280]">reservas</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-card-foreground">Métodos de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metodosPago.map((metodo, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#374151] font-medium">{metodo.metodo}</span>
                        <span className="font-semibold text-[#1F2937]">{metodo.monto}</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2 border border-[#E5E7EB]">
                        <div className="bg-[#6366F1] h-2 rounded-full" style={{ width: `${metodo.porcentaje}%` }}></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#6B7280]">
                        <span>{metodo.transacciones} transacciones</span>
                        <span>{metodo.porcentaje}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clientes" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="bg-card shadow-sm border border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#10B981]" />
                  <CardTitle className="text-lg font-semibold text-card-foreground">
                    Clientes VIP (+50 Reservas)
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-xs">Cliente</TableHead>
                        <TableHead className="text-xs">Reservas</TableHead>
                        <TableHead className="text-xs">Gasto</TableHead>
                        <TableHead className="text-xs">Estudio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginate(clientesVIP, currentPageVIP).map((cliente) => (
                        <TableRow key={cliente.id} className="border-border">
                          <TableCell className="font-medium text-sm">{cliente.nombre}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-[#10B981] text-white">
                              {cliente.reservas}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-sm">{cliente.gastoTotal}</TableCell>
                          <TableCell className="text-sm text-[#6B7280]">{cliente.estudio}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-[#6B7280]">
                    Página {currentPageVIP} de {getTotalPages(clientesVIP)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPageVIP(Math.max(1, currentPageVIP - 1))}
                      disabled={currentPageVIP === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPageVIP(Math.min(getTotalPages(clientesVIP), currentPageVIP + 1))}
                      disabled={currentPageVIP === getTotalPages(clientesVIP)}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm border border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                  <CardTitle className="text-lg font-semibold text-card-foreground">
                    Clientes Inactivos (4+ meses)
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-xs">Cliente</TableHead>
                        <TableHead className="text-xs">Última Reserva</TableHead>
                        <TableHead className="text-xs">Total Reservas</TableHead>
                        <TableHead className="text-xs">Estudio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginate(clientesInactivos, currentPageInactivos).map((cliente) => (
                        <TableRow key={cliente.id} className="border-border">
                          <TableCell className="font-medium text-sm">{cliente.nombre}</TableCell>
                          <TableCell>
                            <Badge variant="destructive" className="bg-[#EF4444] text-white text-xs">
                              {cliente.ultimaReserva}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{cliente.totalReservas}</TableCell>
                          <TableCell className="text-sm text-[#6B7280]">{cliente.estudio}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-[#6B7280]">
                    Página {currentPageInactivos} de {getTotalPages(clientesInactivos)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPageInactivos(Math.max(1, currentPageInactivos - 1))}
                      disabled={currentPageInactivos === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPageInactivos(Math.min(getTotalPages(clientesInactivos), currentPageInactivos + 1))
                      }
                      disabled={currentPageInactivos === getTotalPages(clientesInactivos)}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="instructores" className="space-y-6">
          <Card className="bg-card shadow-sm border border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#6366F1]" />
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  Instructores con Mayor Número de Reservas
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-xs">Instructor</TableHead>
                      <TableHead className="text-xs">Total Reservas</TableHead>
                      <TableHead className="text-xs">Disciplina</TableHead>
                      <TableHead className="text-xs">Estudio</TableHead>
                      <TableHead className="text-xs">Ingresos Mes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginate(instructoresTop, currentPageInstructores).map((instructor) => (
                      <TableRow key={instructor.id} className="border-border">
                        <TableCell className="font-medium text-sm">{instructor.nombre}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-[#6366F1] text-white">
                            {instructor.totalReservas}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-[#6B7280]">{instructor.disciplina}</TableCell>
                        <TableCell className="text-sm text-[#6B7280]">{instructor.estudio}</TableCell>
                        <TableCell className="font-semibold text-sm text-[#10B981]">{instructor.ingresosMes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-[#6B7280]">
                  Página {currentPageInstructores} de {getTotalPages(instructoresTop)}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPageInstructores(Math.max(1, currentPageInstructores - 1))}
                    disabled={currentPageInstructores === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPageInstructores(Math.min(getTotalPages(instructoresTop), currentPageInstructores + 1))
                    }
                    disabled={currentPageInstructores === getTotalPages(instructoresTop)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estudios" className="space-y-6">
          <Card className="bg-card shadow-sm border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-card-foreground">
                Comparativa de Rendimiento entre Estudios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={rendimientoEstudios}>
                  <defs>
                    <linearGradient id="colorMirafloresComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSanIsidroComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSurcoComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#45B7D1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#45B7D1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLimaCentroComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#96CEB4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#96CEB4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="miraflores"
                    stroke="#FF6B6B"
                    fillOpacity={1}
                    fill="url(#colorMirafloresComp)"
                    strokeWidth={2}
                    dot={false}
                    name="Miraflores"
                  />
                  <Area
                    type="monotone"
                    dataKey="sanIsidro"
                    stroke="#4ECDC4"
                    fillOpacity={1}
                    fill="url(#colorSanIsidroComp)"
                    strokeWidth={2}
                    dot={false}
                    name="San Isidro"
                  />
                  <Area
                    type="monotone"
                    dataKey="surco"
                    stroke="#45B7D1"
                    fillOpacity={1}
                    fill="url(#colorSurcoComp)"
                    strokeWidth={2}
                    dot={false}
                    name="Surco"
                  />
                  <Area
                    type="monotone"
                    dataKey="limaCentro"
                    stroke="#96CEB4"
                    fillOpacity={1}
                    fill="url(#colorLimaCentroComp)"
                    strokeWidth={2}
                    dot={false}
                    name="Lima Centro"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="w-4 h-4 bg-[#FF6B6B] rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-[#1F2937]">Miraflores</p>
                  <p className="text-xs text-[#6B7280]">1,580 reservas</p>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-[#4ECDC4] rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-[#1F2937]">San Isidro</p>
                  <p className="text-xs text-[#6B7280]">1,720 reservas</p>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-[#45B7D1] rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-[#1F2937]">Surco</p>
                  <p className="text-xs text-[#6B7280]">1,180 reservas</p>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-[#96CEB4] rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-[#1F2937]">Lima Centro</p>
                  <p className="text-xs text-[#6B7280]">1,350 reservas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
