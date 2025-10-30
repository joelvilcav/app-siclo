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
  Calendar,
  Clock,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

// Sample classes data based on the fields mentioned
const classesData = [
  {
    reservationId: "R001",
    classId: "C001",
    country: "España",
    city: "Madrid",
    discipline: "Yoga Matutina",
    studio: "Estudio Central",
    room: "Sala A",
    instructor: "María González",
    day: "Lunes",
    time: "08:00",
    client: "Ana Martínez",
    orderCreator: "Sistema",
    paymentMethod: "Tarjeta",
    status: "Confirmada",
    date: "2024-01-15",
    capacity: 20,
    enrolled: 15,
    price: 25,
  },
  {
    reservationId: "R002",
    classId: "C002",
    country: "México",
    city: "Ciudad de México",
    discipline: "Crossfit Funcional",
    studio: "Fitness Pro",
    room: "Sala B",
    instructor: "Carlos Rodríguez",
    day: "Martes",
    time: "18:00",
    client: "Luis Fernández",
    orderCreator: "Admin",
    paymentMethod: "Efectivo",
    status: "Pendiente",
    date: "2024-01-16",
    capacity: 15,
    enrolled: 12,
    price: 30,
  },
  {
    reservationId: "R003",
    classId: "C003",
    country: "Argentina",
    city: "Buenos Aires",
    discipline: "Pilates Avanzado",
    studio: "Wellness Center",
    room: "Sala C",
    instructor: "Carmen López",
    day: "Miércoles",
    time: "10:00",
    client: "Roberto Silva",
    orderCreator: "Cliente",
    paymentMethod: "Transferencia",
    status: "Confirmada",
    date: "2024-01-17",
    capacity: 12,
    enrolled: 10,
    price: 35,
  },
  {
    reservationId: "R004",
    classId: "C004",
    country: "Colombia",
    city: "Bogotá",
    discipline: "Spinning Intensivo",
    studio: "Cardio Zone",
    room: "Sala D",
    instructor: "Diego Morales",
    day: "Jueves",
    time: "19:00",
    client: "María González",
    orderCreator: "Sistema",
    paymentMethod: "Tarjeta",
    status: "Cancelada",
    date: "2024-01-18",
    capacity: 25,
    enrolled: 8,
    price: 20,
  },
  {
    reservationId: "R005",
    classId: "C005",
    country: "España",
    city: "Barcelona",
    discipline: "Yoga Matutina",
    studio: "Zen Studio",
    room: "Sala A",
    instructor: "Elena Ruiz",
    day: "Viernes",
    time: "07:30",
    client: "Carlos Rodríguez",
    orderCreator: "Admin",
    paymentMethod: "Tarjeta",
    status: "Confirmada",
    date: "2024-01-19",
    capacity: 18,
    enrolled: 16,
    price: 28,
  },
  {
    reservationId: "R006",
    classId: "C006",
    country: "México",
    city: "Guadalajara",
    discipline: "Zumba",
    studio: "Dance Fitness",
    room: "Sala Principal",
    instructor: "Sofia Herrera",
    day: "Sábado",
    time: "11:00",
    client: "Ana Martínez",
    orderCreator: "Cliente",
    paymentMethod: "PayPal",
    status: "Confirmada",
    date: "2024-01-20",
    capacity: 30,
    enrolled: 25,
    price: 22,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Confirmada":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmada</Badge>
    case "Pendiente":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
    case "Cancelada":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getPaymentMethodBadge = (method: string) => {
  switch (method) {
    case "Tarjeta":
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          Tarjeta
        </Badge>
      )
    case "Efectivo":
      return (
        <Badge variant="outline" className="text-green-600 border-green-200">
          Efectivo
        </Badge>
      )
    case "Transferencia":
      return (
        <Badge variant="outline" className="text-purple-600 border-purple-200">
          Transferencia
        </Badge>
      )
    case "PayPal":
      return (
        <Badge variant="outline" className="text-orange-600 border-orange-200">
          PayPal
        </Badge>
      )
    default:
      return <Badge variant="outline">{method}</Badge>
  }
}

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [disciplineFilter, setDisciplineFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("")
  const [appliedStatusFilter, setAppliedStatusFilter] = useState("all")
  const [appliedDisciplineFilter, setAppliedDisciplineFilter] = useState("all")
  const [appliedCountryFilter, setAppliedCountryFilter] = useState("all")
  const [appliedDateFrom, setAppliedDateFrom] = useState("")
  const [appliedDateTo, setAppliedDateTo] = useState("")
  const itemsPerPage = 10

  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm)
    setAppliedStatusFilter(statusFilter)
    setAppliedDisciplineFilter(disciplineFilter)
    setAppliedCountryFilter(countryFilter)
    setAppliedDateFrom(dateFrom)
    setAppliedDateTo(dateTo)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setDisciplineFilter("all")
    setCountryFilter("all")
    setDateFrom("")
    setDateTo("")
    setAppliedSearchTerm("")
    setAppliedStatusFilter("all")
    setAppliedDisciplineFilter("all")
    setAppliedCountryFilter("all")
    setAppliedDateFrom("")
    setAppliedDateTo("")
    setCurrentPage(1)
  }

  const hasActiveFilters =
    appliedSearchTerm !== "" ||
    appliedStatusFilter !== "all" ||
    appliedDisciplineFilter !== "all" ||
    appliedCountryFilter !== "all" ||
    appliedDateFrom !== "" ||
    appliedDateTo !== ""

  const filteredClasses = classesData.filter((classItem) => {
    const matchesSearch =
      classItem.discipline.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
      classItem.instructor.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
      classItem.client.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
      classItem.studio.toLowerCase().includes(appliedSearchTerm.toLowerCase())
    const matchesStatus = appliedStatusFilter === "all" || classItem.status === appliedStatusFilter
    const matchesDiscipline = appliedDisciplineFilter === "all" || classItem.discipline === appliedDisciplineFilter
    const matchesCountry = appliedCountryFilter === "all" || classItem.country === appliedCountryFilter

    let matchesDate = true
    if (appliedDateFrom || appliedDateTo) {
      const classDate = new Date(classItem.date)
      if (appliedDateFrom) matchesDate = matchesDate && classDate >= new Date(appliedDateFrom)
      if (appliedDateTo) matchesDate = matchesDate && classDate <= new Date(appliedDateTo)
    }

    return matchesSearch && matchesStatus && matchesDiscipline && matchesCountry && matchesDate
  })

  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedClasses = filteredClasses.slice(startIndex, endIndex)

  const totalClasses = classesData.length
  const confirmedClasses = classesData.filter((c) => c.status === "Confirmada").length
  const pendingClasses = classesData.filter((c) => c.status === "Pendiente").length
  const totalRevenue = classesData
    .filter((c) => c.status === "Confirmada")
    .reduce((sum, classItem) => sum + classItem.price, 0)

  const uniqueDisciplines = [...new Set(classesData.map((c) => c.discipline))]
  const uniqueCountries = [...new Set(classesData.map((c) => c.country))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Clases</h2>
          <p className="text-gray-600 mt-1">Gestiona las reservas y horarios de clases</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nueva Clase
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clases</p>
                <p className="text-3xl font-bold text-gray-900">{totalClasses}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmadas</p>
                <p className="text-3xl font-bold text-green-700">{confirmedClasses}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-700">{pendingClasses}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos</p>
                <p className="text-3xl font-bold text-purple-700">${totalRevenue}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por disciplina, instructor, cliente o estudio..."
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
                  <SelectItem value="Confirmada">Confirmada</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
              <Select value={disciplineFilter} onValueChange={setDisciplineFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Disciplina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {uniqueDisciplines.map((discipline) => (
                    <SelectItem key={discipline} value={discipline}>
                      {discipline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {uniqueCountries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
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

          {/* Classes Table */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reserva</TableHead>
                  <TableHead>Disciplina</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Horario</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Pago</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Capacidad</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedClasses.map((classItem) => (
                  <TableRow key={classItem.reservationId}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{classItem.reservationId}</div>
                        <div className="text-sm text-gray-500">{classItem.classId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{classItem.discipline}</div>
                        <div className="text-sm text-gray-500">{classItem.studio}</div>
                        <div className="text-sm text-gray-500">{classItem.room}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{classItem.city}</div>
                        <div className="text-sm text-gray-500">{classItem.country}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{classItem.instructor}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{classItem.day}</div>
                        <div className="text-sm text-gray-500">{classItem.time}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(classItem.date).toLocaleDateString("es-ES")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{classItem.client}</div>
                        <div className="text-sm text-gray-500">Por: {classItem.orderCreator}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getPaymentMethodBadge(classItem.paymentMethod)}</TableCell>
                    <TableCell>{getStatusBadge(classItem.status)}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {classItem.enrolled}/{classItem.capacity}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${classItem.price}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Cancelar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {paginatedClasses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron clases que coincidan con los filtros.</p>
            </div>
          )}

          {filteredClasses.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredClasses.length)} de {filteredClasses.length}{" "}
                clases
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
