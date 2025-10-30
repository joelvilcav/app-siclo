"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import Link from "next/link"

// Sample client data
const clientsData = [
  {
    id: "1",
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+34 612 345 678",
    country: "España",
    city: "Madrid",
    totalClasses: 24,
    totalSpent: 1200,
    lastVisit: "2024-01-15",
    status: "Activo",
    joinDate: "2023-06-15",
    favoriteClass: "Yoga Matutina",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    phone: "+52 555 123 456",
    country: "México",
    city: "Ciudad de México",
    totalClasses: 18,
    totalSpent: 900,
    lastVisit: "2024-01-12",
    status: "Activo",
    joinDate: "2023-08-20",
    favoriteClass: "Crossfit Funcional",
  },
  {
    id: "3",
    name: "Ana Martínez",
    email: "ana.martinez@email.com",
    phone: "+54 11 2345 6789",
    country: "Argentina",
    city: "Buenos Aires",
    totalClasses: 32,
    totalSpent: 1600,
    lastVisit: "2024-01-10",
    status: "VIP",
    joinDate: "2023-03-10",
    favoriteClass: "Pilates Avanzado",
  },
  {
    id: "4",
    name: "Luis Fernández",
    email: "luis.fernandez@email.com",
    phone: "+57 300 123 4567",
    country: "Colombia",
    city: "Bogotá",
    totalClasses: 8,
    totalSpent: 400,
    lastVisit: "2023-12-28",
    status: "Inactivo",
    joinDate: "2023-11-05",
    favoriteClass: "Spinning Intensivo",
  },
  {
    id: "5",
    name: "Carmen López",
    email: "carmen.lopez@email.com",
    phone: "+34 687 654 321",
    country: "España",
    city: "Barcelona",
    totalClasses: 45,
    totalSpent: 2250,
    lastVisit: "2024-01-14",
    status: "VIP",
    joinDate: "2023-01-20",
    favoriteClass: "Yoga Matutina",
  },
  {
    id: "6",
    name: "Roberto Silva",
    email: "roberto.silva@email.com",
    phone: "+55 11 98765 4321",
    country: "Brasil",
    city: "São Paulo",
    totalClasses: 12,
    totalSpent: 600,
    lastVisit: "2024-01-08",
    status: "Activo",
    joinDate: "2023-09-15",
    favoriteClass: "Crossfit Funcional",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Activo":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Activo</Badge>
    case "VIP":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">VIP</Badge>
    case "Inactivo":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactivo</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("")
  const [appliedStatusFilter, setAppliedStatusFilter] = useState("all")
  const [appliedCountryFilter, setAppliedCountryFilter] = useState("all")
  const [appliedDateFrom, setAppliedDateFrom] = useState("")
  const [appliedDateTo, setAppliedDateTo] = useState("")
  const itemsPerPage = 10

  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm)
    setAppliedStatusFilter(statusFilter)
    setAppliedCountryFilter(countryFilter)
    setAppliedDateFrom(dateFrom)
    setAppliedDateTo(dateTo)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setCountryFilter("all")
    setDateFrom("")
    setDateTo("")
    setAppliedSearchTerm("")
    setAppliedStatusFilter("all")
    setAppliedCountryFilter("all")
    setAppliedDateFrom("")
    setAppliedDateTo("")
    setCurrentPage(1)
  }

  const hasActiveFilters =
    appliedSearchTerm !== "" ||
    appliedStatusFilter !== "all" ||
    appliedCountryFilter !== "all" ||
    appliedDateFrom !== "" ||
    appliedDateTo !== ""

  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(appliedSearchTerm.toLowerCase())
    const matchesStatus = appliedStatusFilter === "all" || client.status === appliedStatusFilter
    const matchesCountry = appliedCountryFilter === "all" || client.country === appliedCountryFilter

    let matchesDate = true
    if (appliedDateFrom || appliedDateTo) {
      const clientDate = new Date(client.joinDate)
      if (appliedDateFrom) matchesDate = matchesDate && clientDate >= new Date(appliedDateFrom)
      if (appliedDateTo) matchesDate = matchesDate && clientDate <= new Date(appliedDateTo)
    }

    return matchesSearch && matchesStatus && matchesCountry && matchesDate
  })

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedClients = filteredClients.slice(startIndex, endIndex)

  const totalClients = clientsData.length
  const activeClients = clientsData.filter((c) => c.status === "Activo" || c.status === "VIP").length
  const vipClients = clientsData.filter((c) => c.status === "VIP").length
  const totalRevenue = clientsData.reduce((sum, client) => sum + client.totalSpent, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Clientes</h2>
          <p className="text-gray-600 mt-1">Gestiona tu base de clientes</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                <p className="text-3xl font-bold text-gray-900">{totalClients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes Activos</p>
                <p className="text-3xl font-bold text-green-700">{activeClients}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes VIP</p>
                <p className="text-3xl font-bold text-purple-700">{vipClients}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <UserX className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <p className="text-3xl font-bold text-orange-700">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="España">España</SelectItem>
                  <SelectItem value="México">México</SelectItem>
                  <SelectItem value="Argentina">Argentina</SelectItem>
                  <SelectItem value="Colombia">Colombia</SelectItem>
                  <SelectItem value="Brasil">Brasil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                placeholder="Desde"
                className="flex-1"
              />
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                placeholder="Hasta"
                className="flex-1"
              />
              <Button onClick={handleSearch} className="w-full sm:w-auto">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
              {hasActiveFilters && (
                <Button onClick={handleClearFilters} variant="outline" className="w-full sm:w-auto bg-transparent">
                  Limpiar
                </Button>
              )}
            </div>
          </div>

          {/* Clients Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Clases</TableHead>
                  <TableHead>Gastado</TableHead>
                  <TableHead>Última Visita</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Clase Favorita</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                        <div className="text-sm text-gray-500">{client.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.city}</div>
                        <div className="text-sm text-gray-500">{client.country}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{client.totalClasses}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${client.totalSpent}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(client.lastVisit).toLocaleDateString("es-ES")}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">{client.favoriteClass}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/clients/${client.id}`} className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Ver Detalles
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {paginatedClients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron clientes que coincidan con los filtros.</p>
            </div>
          )}

          {filteredClients.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredClients.length)} de {filteredClients.length}{" "}
                clientes
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  title="Primera página"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  title="Última página"
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
