import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Shield, UserPlus, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const mockUsers = [
  { id: 1, name: "Ricardo Oliveira", role: "Gerente de Suprimentos", status: "ativo", lastLogin: "Hoje, 09:42", ip: "192.168.1.15" },
  { id: 2, name: "Ana Beatriz", role: "Analista Administrativo", status: "ativo", lastLogin: "Ontem, 17:15", ip: "187.54.22.10" },
  { id: 3, name: "Marcos Mendes", role: "Operador de Logística", status: "inativo", lastLogin: "12 de Out, 10:30", ip: "200.18.99.1" },
  { id: 4, name: "Juliana Costa", role: "Supervisora Comercial", status: "ativo", lastLogin: "Hoje, 08:21", ip: "192.168.1.42" },
];

export default function Usuarios() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          Administração / <span className="text-primary font-medium">Usuários</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Controle e gerencie o acesso de colaboradores à plataforma ERP de suprimentos.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Shield className="h-4 w-4" />
              Editar Permissões
            </Button>
            <Button className="gap-2">
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
                <p className="text-3xl font-bold mt-1">1.248</p>
                <p className="text-xs text-success mt-1">↗ +12% em relação ao mês anterior</p>
              </div>
              <div className="ml-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status de Sistema</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-muted-foreground">Online Agora</span>
                <span className="text-lg font-bold text-primary">84</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: "68%" }} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Acessos Pendentes</p>
              <p className="text-3xl font-bold text-destructive mt-1">14</p>
              <Link to="#" className="text-xs text-primary font-medium hover:underline">Revisar fila</Link>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Listagem de Colaboradores</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome & Perfil</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Login</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary-container flex items-center justify-center text-primary-container-foreground text-sm font-semibold">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={u.status === "ativo" ? "default" : "secondary"} className="text-[10px] uppercase">
                        <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1.5 ${u.status === "ativo" ? "bg-success" : "bg-muted-foreground"}`} />
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{u.lastLogin}</p>
                      <p className="text-xs text-muted-foreground">IP: {u.ip}</p>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/permissoes?user=${u.id}`}>Editar</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <p>Exibindo 4 de 1.248 usuários registrados</p>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {[1, 2, 3].map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Banner */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">Precisa de ajuda com as permissões?</h3>
              <p className="text-primary-foreground/80 text-sm mt-1 max-w-xl">
                Você pode definir níveis de acesso granulares para cada usuário.
                Recomendamos utilizar os perfis pré-definidos para garantir a segurança dos dados de estoque e faturamento.
              </p>
            </div>
            <Button variant="secondary" className="whitespace-nowrap">
              Ver Guia de Segurança
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
