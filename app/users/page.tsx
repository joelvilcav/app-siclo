"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Shield } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useUsers } from "@/hooks/use-users"
import { useRoles } from "@/hooks/use-roles"
import { log } from "console"

// Mock data for users
const mockUsers = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "Admin", isActive: true },
  { id: 2, name: "María García", email: "maria@example.com", role: "Instructor", isActive: true },
  { id: 3, name: "Carlos López", email: "carlos@example.com", role: "Recepción", isActive: true },
  { id: 4, name: "Ana Martínez", email: "ana@example.com", role: "Instructor", isActive: true },
]

// Mock data for roles and permissions
const mockRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Acceso completo al sistema",
    permissions: {
      dashboard: { view: true, edit: true, delete: true },
      clients: { view: true, edit: true, delete: true },
      classes: { view: true, edit: true, delete: true },
      purchases: { view: true, edit: true, delete: true },
      users: { view: true, edit: true, delete: true },
      settings: { view: true, edit: true, delete: true },
    },
  },
  {
    id: 2,
    name: "Instructor",
    description: "Gestión de clases y clientes",
    permissions: {
      dashboard: { view: true, edit: false, delete: false },
      clients: { view: true, edit: true, delete: false },
      classes: { view: true, edit: true, delete: false },
      purchases: { view: true, edit: false, delete: false },
      users: { view: false, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
  {
    id: 3,
    name: "Recepción",
    description: "Gestión de clientes y compras",
    permissions: {
      dashboard: { view: true, edit: false, delete: false },
      clients: { view: true, edit: true, delete: false },
      classes: { view: true, edit: false, delete: false },
      purchases: { view: true, edit: true, delete: false },
      users: { view: false, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
]

const permissionModules = [
  { key: "dashboard", label: "Dashboard" },
  { key: "clients", label: "Clientes" },
  { key: "classes", label: "Clases" },
  { key: "purchases", label: "Compras" },
  { key: "users", label: "Usuarios" },
  { key: "settings", label: "Configuración" },
]

export default function UsersPage() {
  const [users2, setUsers] = useState(mockUsers);
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<any>("");

  const { users, loading, error, fetchUsers, createUser, updateUser, deleteUser } = useUsers();
  const { roles, fetchRoles } = useRoles();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleCreateUser = async () => {
    setIsNewUserOpen(false);
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
      isActive: true,
      roles: [role]
    };
    await createUser(newUser);
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setIsEditUserOpen(true);
  }

  const handleSaveEditedUser = (user: any) => {
    if (editingUser) {
      updateUser(user);
      setIsEditUserOpen(false);
      setEditingUser(null);
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "default"
      case "Instructor":
        return "secondary"
      case "Recepción":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    return status === "active" ? "default" : "secondary"
  }

  console.log('editingUser', editingUser);
  // console.log('edit role', editingUser?.roles[0].name);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gestión de usuarios</h2>
        <p className="text-muted-foreground">Administra usuarios y permisos del sistema</p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="permissions">Permisos</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Usuarios del sistema</CardTitle>
                  <CardDescription>Gestiona los usuarios y sus roles</CardDescription>
                </div>
                <Dialog open={isNewUserOpen} onOpenChange={setIsNewUserOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Nuevo usuario
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear nuevo usuario</DialogTitle>
                      <DialogDescription>Ingresa los datos del nuevo usuario</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstname">Nombres</Label>
                        <Input id="firstname" placeholder="Luis Enrique" onChange={(e) => setFirstName(e.target.value)}/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastname">Apellidos</Label>
                        <Input id="lastname" placeholder="Sandoval López" onChange={(e) => setLastName(e.target.value)}/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Nombre de usuario</Label>
                        <Input id="username" placeholder="luisenrique" onChange={(e) => setUsername(e.target.value)}/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="luissandoval@example.com" onChange={(e) => setEmail(e.target.value)}/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)}/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Rol</Label>
                        <Select onValueChange={(value) => setRole(value)}>
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Selecciona un rol" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role}>{role.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewUserOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateUser}>Crear usuario</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>{user.roles[0].name}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.isActive === true ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteUser(user.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar usuario</DialogTitle>
                <DialogDescription>Modifica los datos del usuario</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
              <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombres</Label>
                  <Input
                    id="edit-firstname"
                    value={editingUser?.firstName || ""}
                    onChange={(e) => setEditingUser(editingUser ? { ...editingUser, firstName: e.target.value } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lastname">Apellidos</Label>
                  <Input
                    id="edit-lastname"
                    value={editingUser?.lastName || ""}
                    onChange={(e) => setEditingUser(editingUser ? { ...editingUser, lastName: e.target.value } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-username">Nombre de usuario</Label>
                  <Input
                    id="edit-username"
                    value={editingUser?.username || ""}
                    onChange={(e) => setEditingUser(editingUser ? { ...editingUser, username: e.target.value } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingUser?.email || ""}
                    onChange={(e) => setEditingUser(editingUser ? { ...editingUser, email: e.target.value } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Rol</Label>
                  <Select
                    value={editingUser?.roles[0].name}
                    onValueChange={(value) => {
                      const selectedRole = roles.find((role) => role.name === value)
                      setEditingUser(editingUser ? { ...editingUser, roles:[selectedRole] } : null)
                    }}
                  >
                    <SelectTrigger id="edit-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Estado</Label>
                  <Select
                    value={editingUser?.isActive ? "active" : "inactive"}
                    onValueChange={(value) =>
                      setEditingUser(editingUser ? { ...editingUser, isActive: value === "active" } : null)
                    }
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditUserOpen(false)
                    setEditingUser(null)
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={() => handleSaveEditedUser(editingUser)}>Guardar cambios</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-colors ${selectedRole === role.id ? "border-primary" : ""}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {selectedRole && (
            <Card>
              <CardHeader>
                <CardTitle>Configurar permisos</CardTitle>
                <CardDescription>
                  Configura los permisos para el rol {roles.find((r) => r.id === selectedRole)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Módulo</TableHead>
                        <TableHead className="text-center">Ver</TableHead>
                        <TableHead className="text-center">Editar</TableHead>
                        <TableHead className="text-center">Eliminar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {permissionModules.map((module) => {
                        const rolePermissions = roles.find((r) => r.id === selectedRole)?.permissions[
                          module.key as keyof (typeof roles)[0]["permissions"]
                        ]
                        return (
                          <TableRow key={module.key}>
                            <TableCell className="font-medium">{module.label}</TableCell>
                            <TableCell className="text-center">
                              <Switch checked={rolePermissions?.view} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={rolePermissions?.edit} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch checked={rolePermissions?.delete} />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                  <div className="flex justify-end">
                    <Button>Guardar cambios</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
