"use client"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Star,
  CreditCard,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample client data - in a real app, this would come from an API
const getClientData = (id: string) => {
  const clientsData = {
    "1": {
      id: "1",
      name: "María González",
      email: "maria.gonzalez@email.com",
      phone: "+34 612 345 678",
      country: "España",
      city: "Madrid",
      address: "Calle Mayor 123, Madrid",
      joinDate: "2023-06-15",
      status: "VIP",
      avatar: "/diverse-user-avatars.png",
      totalClasses: 24,
      totalSpent: 1200,
      lastVisit: "2024-01-15",
      favoriteClass: "Yoga Matutina",
      preferredInstructor: "Elena Ruiz",
      averageRating: 4.8,
      monthlySpending: [
        { month: "Jul", amount: 150 },
        { month: "Ago", amount: 200 },
        { month: "Sep", amount: 180 },
        { month: "Oct", amount: 220 },
        { month: "Nov", amount: 250 },
        { month: "Dic", amount: 200 },
      ],
      classHistory: [
        {
          id: "C001",
          date: "2024-01-15",
          class: "Yoga Matutina",
          instructor: "Elena Ruiz",
          status: "Completada",
          rating: 5,
          price: 25,
        },
        {
          id: "C002",
          date: "2024-01-12",
          class: "Pilates Avanzado",
          instructor: "Carmen López",
          status: "Completada",
          rating: 4,
          price: 35,
        },
        {
          id: "C003",
          date: "2024-01-10",
          class: "Yoga Matutina",
          instructor: "Elena Ruiz",
          status: "Completada",
          rating: 5,
          price: 25,
        },
        {
          id: "C004",
          date: "2024-01-08",
          class: "Crossfit Funcional",
          instructor: "Diego Morales",
          status: "Cancelada",
          rating: null,
          price: 30,
        },
      ],
      purchaseHistory: [
        {
          id: "MP001234567",
          date: "2024-01-15",
          description: "Clase de Yoga Matutina",
          amount: 25.0,
          status: "Aprobado",
          method: "Tarjeta Crédito",
        },
        {
          id: "MP001234566",
          date: "2024-01-12",
          description: "Clase de Pilates Avanzado",
          amount: 35.0,
          status: "Aprobado",
          method: "Tarjeta Crédito",
        },
        {
          id: "MP001234565",
          date: "2024-01-10",
          description: "Clase de Yoga Matutina",
          amount: 25.0,
          status: "Aprobado",
          method: "Tarjeta Crédito",
        },
      ],
    },
  }

  return clientsData[id as keyof typeof clientsData] || null
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "VIP":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">VIP</Badge>
    case "Activo":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Activo</Badge>
    case "Inactivo":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactivo</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getClassStatusBadge = (status: string) => {
  switch (status) {
    case "Completada":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completada</Badge>
    case "Cancelada":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>
    case "Pendiente":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getPurchaseStatusBadge = (status: string) => {
  switch (status) {
    case "Aprobado":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobado</Badge>
    case "Pendiente":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
    case "Rechazado":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazado</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function ClientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.id as string

  const client = getClientData(clientId)

  if (!client) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cliente no encontrado</h2>
          <p className="text-gray-600 mb-4">El cliente que buscas no existe o ha sido eliminado.</p>
          <Button onClick={() => router.push("/clients")}>Volver a Clientes</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/clients")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Perfil del Cliente</h2>
            <p className="text-gray-600 mt-1">Información detallada y historial</p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <Edit className="w-4 h-4" />
          Editar Cliente
        </Button>
      </div>

      {/* Client Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={client.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">
                {client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{client.name}</h3>
                {getStatusBadge(client.status)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  {client.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {client.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {client.city}, {client.country}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Miembro desde {new Date(client.joinDate).toLocaleDateString("es-ES")}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Activity className="w-4 h-4" />
                  Última visita: {new Date(client.lastVisit).toLocaleDateString("es-ES")}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="w-4 h-4" />
                  Calificación promedio: {client.averageRating}/5
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clases</p>
                <p className="text-3xl font-bold text-blue-700">{client.totalClasses}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gastado</p>
                <p className="text-3xl font-bold text-green-700">${client.totalSpent}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clase Favorita</p>
                <p className="text-lg font-bold text-purple-700">{client.favoriteClass}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Instructor Preferido</p>
                <p className="text-lg font-bold text-orange-700">{client.preferredInstructor}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activity">Actividad</TabsTrigger>
          <TabsTrigger value="classes">Historial de Clases</TabsTrigger>
          <TabsTrigger value="purchases">Compras</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {client.classHistory.slice(0, 5).map((classItem, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{classItem.class}</span>
                        {getClassStatusBadge(classItem.status)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(classItem.date).toLocaleDateString("es-ES")} • {classItem.instructor} • $
                        {classItem.price}
                      </div>
                    </div>
                    {classItem.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{classItem.rating}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Clases</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Clase</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Calificación</TableHead>
                    <TableHead>Precio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {client.classHistory.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell>{new Date(classItem.date).toLocaleDateString("es-ES")}</TableCell>
                      <TableCell className="font-medium">{classItem.class}</TableCell>
                      <TableCell>{classItem.instructor}</TableCell>
                      <TableCell>{getClassStatusBadge(classItem.status)}</TableCell>
                      <TableCell>
                        {classItem.rating ? (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{classItem.rating}</span>
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>${classItem.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Transacción</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {client.purchaseHistory.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell className="font-mono text-sm">{purchase.id}</TableCell>
                      <TableCell>{new Date(purchase.date).toLocaleDateString("es-ES")}</TableCell>
                      <TableCell>{purchase.description}</TableCell>
                      <TableCell className="font-medium">${purchase.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          {purchase.method}
                        </div>
                      </TableCell>
                      <TableCell>{getPurchaseStatusBadge(purchase.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gasto Mensual</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={client.monthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas del Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Promedio mensual</span>
                    <span className="font-medium">
                      $
                      {(
                        client.monthlySpending.reduce((sum, month) => sum + month.amount, 0) /
                        client.monthlySpending.length
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mes con mayor gasto</span>
                    <span className="font-medium">
                      ${Math.max(...client.monthlySpending.map((m) => m.amount))} (
                      {
                        client.monthlySpending.find(
                          (m) => m.amount === Math.max(...client.monthlySpending.map((m) => m.amount)),
                        )?.month
                      }
                      )
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clases completadas</span>
                    <span className="font-medium">
                      {client.classHistory.filter((c) => c.status === "Completada").length} de{" "}
                      {client.classHistory.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tasa de asistencia</span>
                    <span className="font-medium">
                      {(
                        (client.classHistory.filter((c) => c.status === "Completada").length /
                          client.classHistory.length) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferencias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Clase más frecuente</span>
                    <p className="font-medium">{client.favoriteClass}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Instructor preferido</span>
                    <p className="font-medium">{client.preferredInstructor}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Calificación promedio</span>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= client.averageRating ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{client.averageRating}/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
