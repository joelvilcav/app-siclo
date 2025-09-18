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
  MoreHorizontal,
  Eye,
  Download,
  RefreshCw,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react"

// Sample purchases data based on Mercado Pago fields
const purchasesData = [
  {
    operation_id: "MP001234567",
    date_created: "2024-01-15T10:30:00Z",
    date_approved: "2024-01-15T10:31:00Z",
    date_released: "2024-01-16T10:31:00Z",
    counterpart_name: "María González",
    counterpart_nickname: "maria.gonzalez",
    counterpart_email: "maria.gonzalez@email.com",
    counterpart_phone_number: "+34 612 345 678",
    buyer_document: "12345678A",
    item_id: "YOGA_001",
    reason: "Clase de Yoga Matutina",
    external_reference: "REF_001",
    seller_custom_field: "SKU_YOGA_MAT",
    status: "approved",
    status_detail: "accredited",
    operation_type: "regular_payment",
    transaction_amount: 25.0,
    mercadopago_fee: 1.25,
    marketplace_fee: 0.5,
    shipping_cost: 0.0,
    coupon_fee: 0.0,
    net_received_amount: 23.25,
    installments: 1,
    payment_type: "credit_card",
    amount_refunded: 0.0,
    refund_operator: null,
    claim_id: null,
    chargeback_id: null,
    marketplace: "MercadoPago",
  },
  {
    operation_id: "MP001234568",
    date_created: "2024-01-14T15:45:00Z",
    date_approved: "2024-01-14T15:46:00Z",
    date_released: "2024-01-15T15:46:00Z",
    counterpart_name: "Carlos Rodríguez",
    counterpart_nickname: "carlos.rodriguez",
    counterpart_email: "carlos.rodriguez@email.com",
    counterpart_phone_number: "+52 555 123 456",
    buyer_document: "RFC123456789",
    item_id: "CROSSFIT_001",
    reason: "Clase de Crossfit Funcional",
    external_reference: "REF_002",
    seller_custom_field: "SKU_CROSSFIT",
    status: "approved",
    status_detail: "accredited",
    operation_type: "regular_payment",
    transaction_amount: 30.0,
    mercadopago_fee: 1.5,
    marketplace_fee: 0.6,
    shipping_cost: 0.0,
    coupon_fee: 2.0,
    net_received_amount: 25.9,
    installments: 3,
    payment_type: "credit_card",
    amount_refunded: 0.0,
    refund_operator: null,
    claim_id: null,
    chargeback_id: null,
    marketplace: "MercadoPago",
  },
  {
    operation_id: "MP001234569",
    date_created: "2024-01-13T09:20:00Z",
    date_approved: "2024-01-13T09:21:00Z",
    date_released: "2024-01-14T09:21:00Z",
    counterpart_name: "Ana Martínez",
    counterpart_nickname: "ana.martinez",
    counterpart_email: "ana.martinez@email.com",
    counterpart_phone_number: "+54 11 2345 6789",
    buyer_document: "DNI87654321",
    item_id: "PILATES_001",
    reason: "Clase de Pilates Avanzado",
    external_reference: "REF_003",
    seller_custom_field: "SKU_PILATES_ADV",
    status: "approved",
    status_detail: "accredited",
    operation_type: "regular_payment",
    transaction_amount: 35.0,
    mercadopago_fee: 1.75,
    marketplace_fee: 0.7,
    shipping_cost: 0.0,
    coupon_fee: 0.0,
    net_received_amount: 32.55,
    installments: 1,
    payment_type: "debit_card",
    amount_refunded: 0.0,
    refund_operator: null,
    claim_id: null,
    chargeback_id: null,
    marketplace: "MercadoPago",
  },
  {
    operation_id: "MP001234570",
    date_created: "2024-01-12T18:30:00Z",
    date_approved: null,
    date_released: null,
    counterpart_name: "Luis Fernández",
    counterpart_nickname: "luis.fernandez",
    counterpart_email: "luis.fernandez@email.com",
    counterpart_phone_number: "+57 300 123 4567",
    buyer_document: "CC98765432",
    item_id: "SPINNING_001",
    reason: "Clase de Spinning Intensivo",
    external_reference: "REF_004",
    seller_custom_field: "SKU_SPINNING",
    status: "pending",
    status_detail: "pending_payment",
    operation_type: "regular_payment",
    transaction_amount: 20.0,
    mercadopago_fee: 0.0,
    marketplace_fee: 0.0,
    shipping_cost: 0.0,
    coupon_fee: 0.0,
    net_received_amount: 0.0,
    installments: 1,
    payment_type: "bank_transfer",
    amount_refunded: 0.0,
    refund_operator: null,
    claim_id: null,
    chargeback_id: null,
    marketplace: "MercadoPago",
  },
  {
    operation_id: "MP001234571",
    date_created: "2024-01-11T14:15:00Z",
    date_approved: "2024-01-11T14:16:00Z",
    date_released: "2024-01-12T14:16:00Z",
    counterpart_name: "Carmen López",
    counterpart_nickname: "carmen.lopez",
    counterpart_email: "carmen.lopez@email.com",
    counterpart_phone_number: "+34 687 654 321",
    buyer_document: "87654321B",
    item_id: "ZUMBA_001",
    reason: "Clase de Zumba",
    external_reference: "REF_005",
    seller_custom_field: "SKU_ZUMBA",
    status: "refunded",
    status_detail: "refunded",
    operation_type: "regular_payment",
    transaction_amount: 22.0,
    mercadopago_fee: 1.1,
    marketplace_fee: 0.44,
    shipping_cost: 0.0,
    coupon_fee: 0.0,
    net_received_amount: 0.0,
    installments: 1,
    payment_type: "credit_card",
    amount_refunded: 22.0,
    refund_operator: "admin_user",
    claim_id: "CLAIM_001",
    chargeback_id: null,
    marketplace: "MercadoPago",
  },
]

const getStatusBadge = (status: string, statusDetail: string) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobado</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
    case "rejected":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazado</Badge>
    case "refunded":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Reembolsado</Badge>
    case "cancelled":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelado</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getPaymentTypeBadge = (paymentType: string) => {
  switch (paymentType) {
    case "credit_card":
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          Tarjeta Crédito
        </Badge>
      )
    case "debit_card":
      return (
        <Badge variant="outline" className="text-green-600 border-green-200">
          Tarjeta Débito
        </Badge>
      )
    case "bank_transfer":
      return (
        <Badge variant="outline" className="text-purple-600 border-purple-200">
          Transferencia
        </Badge>
      )
    case "cash":
      return (
        <Badge variant="outline" className="text-orange-600 border-orange-200">
          Efectivo
        </Badge>
      )
    default:
      return <Badge variant="outline">{paymentType}</Badge>
  }
}

export default function PurchasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredPurchases = purchasesData.filter((purchase) => {
    const matchesSearch =
      purchase.counterpart_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.counterpart_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.operation_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter
    const matchesPaymentType = paymentTypeFilter === "all" || purchase.payment_type === paymentTypeFilter

    return matchesSearch && matchesStatus && matchesPaymentType
  })

  const totalTransactions = purchasesData.length
  const approvedTransactions = purchasesData.filter((p) => p.status === "approved").length
  const pendingTransactions = purchasesData.filter((p) => p.status === "pending").length
  const totalRevenue = purchasesData
    .filter((p) => p.status === "approved")
    .reduce((sum, purchase) => sum + purchase.net_received_amount, 0)

  const uniquePaymentTypes = [...new Set(purchasesData.map((p) => p.payment_type))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Compras</h2>
          <p className="text-gray-600 mt-1">Gestiona las transacciones de Mercado Pago</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="w-4 h-4" />
            Sincronizar
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transacciones</p>
                <p className="text-3xl font-bold text-gray-900">{totalTransactions}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aprobadas</p>
                <p className="text-3xl font-bold text-green-700">{approvedTransactions}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-700">{pendingTransactions}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Netos</p>
                <p className="text-3xl font-bold text-purple-700">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Transacciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por cliente, email, operación o descripción..."
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
                <SelectItem value="approved">Aprobado</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="rejected">Rechazado</SelectItem>
                <SelectItem value="refunded">Reembolsado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentTypeFilter} onValueChange={setPaymentTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Método de Pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {uniquePaymentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "credit_card" && "Tarjeta Crédito"}
                    {type === "debit_card" && "Tarjeta Débito"}
                    {type === "bank_transfer" && "Transferencia"}
                    {type === "cash" && "Efectivo"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Purchases Table */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Operación</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Fechas</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Comisiones</TableHead>
                  <TableHead>Neto</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchases.map((purchase) => (
                  <TableRow key={purchase.operation_id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{purchase.operation_id}</div>
                        <div className="text-sm text-gray-500">{purchase.external_reference}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{purchase.counterpart_name}</div>
                        <div className="text-sm text-gray-500">{purchase.counterpart_email}</div>
                        <div className="text-sm text-gray-500">{purchase.counterpart_phone_number}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{purchase.reason}</div>
                        <div className="text-sm text-gray-500">ID: {purchase.item_id}</div>
                        <div className="text-sm text-gray-500">SKU: {purchase.seller_custom_field}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">
                          <span className="font-medium">Creado:</span>{" "}
                          {new Date(purchase.date_created).toLocaleDateString("es-ES")}
                        </div>
                        {purchase.date_approved && (
                          <div className="text-sm text-green-600">
                            <span className="font-medium">Aprobado:</span>{" "}
                            {new Date(purchase.date_approved).toLocaleDateString("es-ES")}
                          </div>
                        )}
                        {purchase.date_released && (
                          <div className="text-sm text-blue-600">
                            <span className="font-medium">Liberado:</span>{" "}
                            {new Date(purchase.date_released).toLocaleDateString("es-ES")}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">${purchase.transaction_amount.toFixed(2)}</div>
                        {purchase.installments > 1 && (
                          <div className="text-sm text-gray-500">{purchase.installments} cuotas</div>
                        )}
                        {purchase.coupon_fee > 0 && (
                          <div className="text-sm text-green-600">-${purchase.coupon_fee.toFixed(2)} desc.</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm text-red-600">MP: -${purchase.mercadopago_fee.toFixed(2)}</div>
                        {purchase.marketplace_fee > 0 && (
                          <div className="text-sm text-red-600">Plat: -${purchase.marketplace_fee.toFixed(2)}</div>
                        )}
                        {purchase.shipping_cost > 0 && (
                          <div className="text-sm text-gray-600">Envío: ${purchase.shipping_cost.toFixed(2)}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-700">${purchase.net_received_amount.toFixed(2)}</div>
                      {purchase.amount_refunded > 0 && (
                        <div className="text-sm text-red-600">Reemb: -${purchase.amount_refunded.toFixed(2)}</div>
                      )}
                    </TableCell>
                    <TableCell>{getPaymentTypeBadge(purchase.payment_type)}</TableCell>
                    <TableCell>{getStatusBadge(purchase.status, purchase.status_detail)}</TableCell>
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
                            <Download className="h-4 w-4" />
                            Descargar Recibo
                          </DropdownMenuItem>
                          {purchase.status === "approved" && (
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <RefreshCw className="h-4 w-4" />
                              Reembolsar
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPurchases.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron transacciones que coincidan con los filtros.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
