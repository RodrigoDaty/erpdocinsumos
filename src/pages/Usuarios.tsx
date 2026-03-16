import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Users, Shield, UserPlus, Settings, ChevronLeft, ChevronRight, Trash2, KeyRound, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface MockUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  ip: string;
}

const initialUsers: MockUser[] = [
  { id: 1, name: "Ricardo Oliveira", email: "ricardo@empresa.com.br", role: "Gerente de Suprimentos", status: "ativo", lastLogin: "Hoje, 09:42", ip: "192.168.1.15" },
  { id: 2, name: "Ana Beatriz", email: "ana@empresa.com.br", role: "Analista Administrativo", status: "ativo", lastLogin: "Ontem, 17:15", ip: "187.54.22.10" },
  { id: 3, name: "Marcos Mendes", email: "marcos@empresa.com.br", role: "Operador de Logística", status: "inativo", lastLogin: "12 de Out, 10:30", ip: "200.18.99.1" },
  { id: 4, name: "Juliana Costa", email: "juliana@empresa.com.br", role: "Supervisora Comercial", status: "ativo", lastLogin: "Hoje, 08:21", ip: "192.168.1.42" },
];

export default function Usuarios() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<MockUser[]>(initialUsers);
  const [showNewUser, setShowNewUser] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // New user form
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [newRole, setNewRole] = useState("");

  // Change password form
  const [changePassword, setChangePassword] = useState("");
  const [changeConfirmPassword, setChangeConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateUser = () => {
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim() || !newRole) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }
    if (newPassword !== newConfirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Erro", description: "A senha deve ter pelo menos 6 caracteres.", variant: "destructive" });
      return;
    }
    const newUser: MockUser = {
      id: Date.now(),
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      status: "ativo",
      lastLogin: "Nunca",
      ip: "—",
    };
    setUsers((prev) => [newUser, ...prev]);
    setShowNewUser(false);
    resetNewUserForm();
    toast({ title: "Usuário criado", description: `${newUser.name} foi cadastrado com sucesso.` });
  };

  const resetNewUserForm = () => {
    setNewName(""); setNewEmail(""); setNewPassword(""); setNewConfirmPassword(""); setNewRole("");
    setShowPassword(false); setShowConfirmPassword(false);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setShowDeleteConfirm(false);
    toast({ title: "Usuário removido", description: `${selectedUser.name} foi excluído.` });
    setSelectedUser(null);
  };

  const handleChangePassword = () => {
    if (!changePassword.trim()) {
      toast({ title: "Erro", description: "Digite a nova senha.", variant: "destructive" });
      return;
    }
    if (changePassword.length < 6) {
      toast({ title: "Erro", description: "A senha deve ter pelo menos 6 caracteres.", variant: "destructive" });
      return;
    }
    if (changePassword !== changeConfirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }
    setShowChangePassword(false);
    setChangePassword(""); setChangeConfirmPassword("");
    toast({ title: "Senha alterada", description: `Senha de ${selectedUser?.name} atualizada com sucesso.` });
    setSelectedUser(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          Administração / <span className="text-primary font-medium">Usuários</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Controle e gerencie o acesso de colaboradores à plataforma ERP de suprimentos.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => navigate("/permissoes")}>
              <Shield className="h-4 w-4" />
              Editar Permissões
            </Button>
            <Button className="gap-2" onClick={() => { resetNewUserForm(); setShowNewUser(true); }}>
              <UserPlus className="h-4 w-4" />
              Novo Usuário
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground italic">
          Somente Administradores podem criar novos acessos
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total de Ativos</p>
                <p className="text-3xl font-bold mt-1">{users.filter((u) => u.status === "ativo").length}</p>
              </div>
              <div className="ml-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Cadastrados</p>
              <p className="text-3xl font-bold mt-1">{users.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Acessos Pendentes</p>
              <p className="text-3xl font-bold text-destructive mt-1">14</p>
              <Link to="/permissoes" className="text-xs text-primary font-medium hover:underline">Revisar fila</Link>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Listagem de Colaboradores</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome & Perfil</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Login</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant={u.status === "ativo" ? "default" : "secondary"} className="text-[10px] uppercase">
                        <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1.5 ${u.status === "ativo" ? "bg-green-400" : "bg-muted-foreground"}`} />
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{u.lastLogin}</p>
                      <p className="text-xs text-muted-foreground">IP: {u.ip}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Alterar Senha"
                          onClick={() => { setSelectedUser(u); setChangePassword(""); setChangeConfirmPassword(""); setShowChangePassword(true); }}>
                          <KeyRound className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="Excluir"
                          onClick={() => { setSelectedUser(u); setShowDeleteConfirm(true); }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/permissoes?user=${u.id}`}>Permissões</Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Help Banner */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">Precisa de ajuda com as permissões?</h3>
              <p className="text-primary-foreground/80 text-sm mt-1 max-w-xl">
                Você pode definir níveis de acesso granulares para cada usuário.
              </p>
            </div>
            <Button variant="secondary" className="whitespace-nowrap">Ver Guia de Segurança</Button>
          </CardContent>
        </Card>
      </div>

      {/* Dialog: Novo Usuário */}
      <Dialog open={showNewUser} onOpenChange={setShowNewUser}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
            <DialogDescription>Preencha os dados para criar um novo acesso.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nome Completo *</Label>
              <Input placeholder="Ex: João da Silva" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input type="email" placeholder="joao@empresa.com.br" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Perfil de Acesso *</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger><SelectValue placeholder="Selecione o perfil" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Analista Administrativo">Analista Administrativo</SelectItem>
                  <SelectItem value="Operador de Logística">Operador de Logística</SelectItem>
                  <SelectItem value="Gerente de Suprimentos">Gerente de Suprimentos</SelectItem>
                  <SelectItem value="Supervisor Comercial">Supervisor Comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Senha *</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Mínimo 6 caracteres" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Confirmar Senha *</Label>
              <div className="relative">
                <Input type={showConfirmPassword ? "text" : "password"} placeholder="Repita a senha" value={newConfirmPassword} onChange={(e) => setNewConfirmPassword(e.target.value)} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewUser(false)}>Cancelar</Button>
            <Button onClick={handleCreateUser}>Cadastrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Alterar Senha */}
      <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>Nova senha para {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nova Senha *</Label>
              <Input type="password" placeholder="Mínimo 6 caracteres" value={changePassword} onChange={(e) => setChangePassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Confirmar Nova Senha *</Label>
              <Input type="password" placeholder="Repita a nova senha" value={changeConfirmPassword} onChange={(e) => setChangeConfirmPassword(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangePassword(false)}>Cancelar</Button>
            <Button onClick={handleChangePassword}>Salvar Senha</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Confirmar Exclusão */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o usuário <strong>{selectedUser?.name}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDeleteUser}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
