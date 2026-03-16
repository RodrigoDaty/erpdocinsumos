import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, MapPin, Wrench, Package, Save, Search, UserCheck, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserOption {
  id: number;
  name: string;
  email: string;
  role: string;
}

const allUsers: UserOption[] = [
  { id: 1, name: "Ricardo Oliveira", email: "ricardo@empresa.com.br", role: "Gerente de Suprimentos" },
  { id: 2, name: "Ana Beatriz", email: "ana@empresa.com.br", role: "Analista Administrativo" },
  { id: 3, name: "Marcos Mendes", email: "marcos@empresa.com.br", role: "Operador de Logística" },
  { id: 4, name: "Juliana Costa", email: "juliana@empresa.com.br", role: "Supervisora Comercial" },
];

const sites = [
  { name: "Matriz Administrativa", location: "São Paulo - SP" },
  { name: "Unidade Logística", location: "Barueri - SP" },
  { name: "Filial Sul", location: "Curitiba - PR" },
  { name: "Escritório Central", location: "Rio de Janeiro - RJ" },
  { name: "Almoxarifado Leste", location: "São Paulo - SP" },
  { name: "Suporte Nordeste", location: "Recife - PE" },
];

const tiposInsumos = [
  { name: "Toner", icon: "🖨️" },
  { name: "Cilindro", icon: "🔄" },
  { name: "Papel", icon: "📄" },
];

const permissionModules = [
  { key: "dashboard", label: "Visualizar Dashboard", description: "Acesso ao painel geral de indicadores" },
  { key: "usuarios", label: "Gerenciar Usuários", description: "Criar, editar e excluir usuários" },
  { key: "permissoes", label: "Editar Permissões", description: "Alterar permissões de outros usuários" },
  { key: "estoque_entrada", label: "Entrada em Estoque", description: "Registrar entradas de insumos" },
  { key: "estoque_saida", label: "Saída de Estoque", description: "Registrar saídas e baixas de insumos" },
  { key: "estoque_papel", label: "Entrada de Papel", description: "Registrar entradas específicas de papel" },
  { key: "gestao_ativos", label: "Gestão de Ativos", description: "Gerenciar equipamentos e numeradores" },
  { key: "relatorios", label: "Relatórios de Inventário", description: "Visualizar e exportar relatórios" },
  { key: "clientes", label: "Gestão de Clientes", description: "Cadastrar e gerenciar clientes" },
  { key: "liberacao", label: "Liberar Insumos", description: "Aprovar solicitações de insumos" },
];

const roleDefaults: Record<string, string[]> = {
  admin: permissionModules.map((m) => m.key),
  analista: ["dashboard", "relatorios", "clientes", "estoque_entrada", "estoque_saida"],
  op_toner: ["dashboard", "estoque_entrada", "estoque_saida", "liberacao"],
  op_papel: ["dashboard", "estoque_entrada", "estoque_papel", "liberacao"],
  usuario: ["dashboard"],
};

export default function Permissoes() {
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get("user");
  const { toast } = useToast();

  const [selectedUserId, setSelectedUserId] = useState<string>(preselectedId || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [perfil, setPerfil] = useState("");

  // Permission state
  const [siteChecks, setSiteChecks] = useState<boolean[]>(sites.map(() => false));
  const [insumoChecks, setInsumoChecks] = useState<boolean[]>(tiposInsumos.map(() => false));
  const [moduleChecks, setModuleChecks] = useState<Record<string, boolean>>(
    Object.fromEntries(permissionModules.map((m) => [m.key, false]))
  );

  const selectedUser = allUsers.find((u) => String(u.id) === selectedUserId);
  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    // Reset permissions when selecting a new user
    setSiteChecks(sites.map(() => false));
    setInsumoChecks(tiposInsumos.map(() => false));
    setModuleChecks(Object.fromEntries(permissionModules.map((m) => [m.key, false])));
    setPerfil("");
  };

  const handlePerfilChange = (value: string) => {
    setPerfil(value);
    const defaults = roleDefaults[value] || [];
    setModuleChecks(
      Object.fromEntries(permissionModules.map((m) => [m.key, defaults.includes(m.key)]))
    );
    // Admin gets all sites and insumos
    if (value === "admin") {
      setSiteChecks(sites.map(() => true));
      setInsumoChecks(tiposInsumos.map(() => true));
    }
  };

  const handleSave = () => {
    if (!selectedUser) return;
    toast({
      title: "Permissões salvas",
      description: `As permissões de ${selectedUser.name} foram atualizadas com sucesso.`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Top banner */}
        <div className="bg-primary text-primary-foreground text-center py-2 text-xs font-semibold uppercase tracking-widest rounded-lg">
          Portal de Controle Administrativo
        </div>

        {/* Back + Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link to="/usuarios" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            Usuários › <span className="text-primary font-medium">Permissões de Acesso</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Left: User Selection */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Selecionar Usuário
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou email..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="space-y-1 max-h-[400px] overflow-auto">
                  {filteredUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => handleSelectUser(String(u.id))}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        String(u.id) === selectedUserId
                          ? "bg-primary/10 border border-primary"
                          : "border border-transparent hover:bg-accent"
                      }`}
                    >
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{u.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                      </div>
                    </button>
                  ))}
                  {filteredUsers.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">Nenhum usuário encontrado.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Permissions */}
          <div className="space-y-4">
            {!selectedUser ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground">Selecione um Usuário</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Escolha um usuário na lista ao lado para configurar suas permissões de acesso.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* User Header + Profile Selector */}
                <Card>
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold">
                          {selectedUser.name.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                          <p className="text-sm text-muted-foreground">{selectedUser.email} • {selectedUser.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Select value={perfil} onValueChange={handlePerfilChange}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Perfil de acesso" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="analista">Analista</SelectItem>
                            <SelectItem value="op_toner">Op. Toner</SelectItem>
                            <SelectItem value="op_papel">Op. Papel</SelectItem>
                            <SelectItem value="usuario">Usuário</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="gap-2" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                          Salvar
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic mt-3">
                      Selecionar um perfil aplica permissões padrão. Você pode personalizar individualmente abaixo.
                    </p>
                  </CardContent>
                </Card>

                {/* Module Permissions */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Permissões do Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {permissionModules.map((mod) => (
                        <div
                          key={mod.key}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                            moduleChecks[mod.key] ? "border-primary bg-primary/5" : "border-border"
                          }`}
                        >
                          <div className="min-w-0 mr-3">
                            <p className="text-sm font-medium">{mod.label}</p>
                            <p className="text-xs text-muted-foreground">{mod.description}</p>
                          </div>
                          <Switch
                            checked={moduleChecks[mod.key]}
                            onCheckedChange={(v) =>
                              setModuleChecks((prev) => ({ ...prev, [mod.key]: v }))
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Sites + Insumos */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Sites */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-semibold">Sites Autorizados</h3>
                            <p className="text-xs text-muted-foreground">Unidades com visibilidade.</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {sites.map((site, i) => (
                            <label
                              key={i}
                              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                siteChecks[i]
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:bg-accent"
                              }`}
                            >
                              <Checkbox
                                checked={siteChecks[i]}
                                onCheckedChange={(v) => {
                                  const next = [...siteChecks];
                                  next[i] = !!v;
                                  setSiteChecks(next);
                                }}
                              />
                              <div>
                                <p className="text-sm font-medium">{site.name}</p>
                                <p className="text-xs text-muted-foreground">{site.location}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Tipos de Insumos */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Wrench className="h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-semibold">Tipos de Insumos</h3>
                            <p className="text-xs text-muted-foreground">Categorias autorizadas.</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {tiposInsumos.map((tipo, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 rounded-lg border border-border"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{tipo.icon}</span>
                                <span className="text-sm font-medium">{tipo.name}</span>
                              </div>
                              <Switch
                                checked={insumoChecks[i]}
                                onCheckedChange={(v) => {
                                  const next = [...insumoChecks];
                                  next[i] = v;
                                  setInsumoChecks(next);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Banner */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-primary">Segurança de Acesso</h3>
                      <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                        Alterações são registradas em auditoria. Certifique-se de que o nível de permissão condiz com as responsabilidades do colaborador.
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs whitespace-nowrap">Auditoria Ativa</Badge>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
