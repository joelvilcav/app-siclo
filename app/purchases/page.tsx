"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { usePaymentsView } from "@/hooks/use-payments-view"

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
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const {
    paymentsTable,
    visiblePurchases,
    startIndex,
    totalDisplay,
    uniquePaymentTypes,
    isClientFiltering,
    currentPage,
    clientTotalPages,
    itemsPerPage,
    getPaymentTable,
    applyFilters,
    clearFilters,
    goFirst,
    goPrev,
    goNext,
    goLast,
  } = usePaymentsView();

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      getPaymentTable('2025-07-07', '2025-07-11', 0, itemsPerPage)
    })
    return () => cancelAnimationFrame(rafId)
  }, [])

  const handleSearch = () => {
    applyFilters({
      searchTerm,
      paymentType: paymentTypeFilter,
      dateFrom,
      dateTo,
    })
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setPaymentTypeFilter("all")
    setDateFrom("")
    setDateTo("")
    clearFilters()
  }

  const hasActiveFilters = isClientFiltering
  const totalPages = isClientFiltering ? clientTotalPages : (paymentsTable?.totalPages ?? 1)
  const endIndex = Math.max(startIndex - 1 + (visiblePurchases.length), 0)

  const totalTransactions = paymentsTable?.totalElements ?? totalDisplay
  const approvedTransactions = paymentsTable?.summary.operationSummary.approved ?? 0
  const pendingTransactions = Math.max(0, totalTransactions - approvedTransactions)
  const totalRevenue = paymentsTable?.summary.totalAmountReceived ?? 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Compras</h2>
          <p className="text-gray-600 mt-1">Gestiona las transacciones obtenidas</p>
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
                <p className="text-2xl font-bold text-purple-700">S/ {totalRevenue.toFixed(2)}</p>
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
                placeholder="Buscar por cliente, email, operación"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            <Select value={paymentTypeFilter} onValueChange={setPaymentTypeFilter}>
              <SelectTrigger className="w-full sm:w-44">
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

            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="Desde"
              className="w-full sm:w-40"
            />
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="Hasta"
              className="w-full sm:w-40"
            />

            <Button onClick={handleSearch} className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>

            {hasActiveFilters && (
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
              >
                Limpiar
              </Button>
            )}
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {visiblePurchases.map((purchase) => (
                  <TableRow key={purchase.operationId}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{purchase.operationId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{purchase.clientInfo?.name}</div>
                        <div className="text-sm text-gray-500">{purchase.clientInfo?.email || '-'}</div>
                        <div className="text-sm text-gray-500">{purchase.clientInfo?.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{purchase.packageName}</div>
                        <div className="text-sm text-gray-500">Clases: {purchase.classCount}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">
                          <span className="font-medium">Creado:</span>{" "}
                          {purchase.purchaseDate ? new Date(purchase.purchaseDate).toLocaleDateString("es-ES") : '-'}
                        </div>
                        {purchase.accreditationDate && (
                          <div className="text-sm text-green-600">
                            <span className="font-medium">Aprobado:</span>{" "}
                            {new Date(purchase.accreditationDate).toLocaleDateString("es-ES")}
                          </div>
                        )}
                        {purchase.releaseDate && (
                          <div className="text-sm text-blue-600">
                            <span className="font-medium">Liberado:</span>{" "}
                            {new Date(purchase.releaseDate).toLocaleDateString("es-ES")}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">S/{(purchase.productValue ?? 0).toFixed(2)}</div>
                        {purchase.installments && purchase.installments > 1 && (
                          <div className="text-sm text-gray-500">{purchase.installments} cuotas</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm text-red-600">Comisión: -S/{(purchase.transactionFee ?? 0).toFixed(2)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-700">S/{(purchase.amountReceived ?? 0).toFixed(2)}</div>
                    </TableCell>
                    <TableCell>{getPaymentTypeBadge(purchase.paymentMethod || '')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {visiblePurchases.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron transacciones que coincidan con los filtros.</p>
            </div>
          )}

          {visiblePurchases.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Mostrando {startIndex} a {endIndex} de {totalDisplay} transacciones
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goFirst}
                  disabled={isClientFiltering ? currentPage === 1 : (paymentsTable?.page ?? 0) === 0}
                  title="Primera página"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goPrev}
                  disabled={isClientFiltering ? currentPage === 1 : (paymentsTable?.page ?? 0) === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goNext}
                  disabled={isClientFiltering ? currentPage >= clientTotalPages : (paymentsTable?.page ?? 0) + 1 >= (paymentsTable?.totalPages ?? 1)}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goLast}
                  disabled={isClientFiltering ? currentPage >= clientTotalPages : (paymentsTable?.page ?? 0) + 1 >= (paymentsTable?.totalPages ?? 1)}
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
