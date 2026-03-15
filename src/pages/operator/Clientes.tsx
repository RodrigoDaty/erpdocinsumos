import { useState } from "react";
import { OperatorLayout } from "@/components/layout/OperatorLayout";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search, Plus, Trash2, Eye, Printer, Package, BarChart3, Users,
  Building2, FileText, TrendingUp, AlertTriangle, ChevronRight, X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Equipment {
  patrimonio: string;
  modelo: string;
  serie: string;
  localizacao: string;
  contador: string;
  status: "online" | "offline" | "manutencao";
}

interface VirtualStock {
  insumo: string;
  tipo: "Toner" | "Papel" | "Cilindro";
  saldo: number;
  minimo: number;
  ultimaEntrada: string;
}

interface Client {
  id: string;
  razaoSocial: string;
  cnpj: string;
  contrato: string;
  segmento: string;
  sites: number;
  equipamentos: Equipment[];
  estoque: VirtualStock[];
  consumoMensal: number;
  eficiencia: number;
  status: "ativo" | "inativo";
}

const initialClients: Client[] = [
  {
    id: "1",
    razaoSocial: "Logística Global S.A.",
    cnpj: "12.345.678/0001-90",
    contrato: "CON-2023-012",
    segmento: "Logística",
    sites: 3,
    equipamentos: [
      { patrimonio: "PAT-99201", modelo: "Ricoh MP 501", serie: "RJL00123984", localizacao: "Prédio Administrativo - Piso 2", contador: "124.582", status: "online" },
      { patrimonio: "PAT-99205", modelo: "HP LaserJet M553", serie: "CNB1K2L3M4", localizacao: "Setor TI - Sala 04", contador: "45.201", status: "online" },
      { patrimonio: "PAT-99210", modelo: "Canon imageRUNNER", serie: "DX-4825-99", localizacao: "Recepção Principal", contador: "8.420", status: "manutencao" },
    ],
    estoque: [
      { insumo: "Toner HP CF226X (Preto)", tipo: "Toner", saldo: 142, minimo: 50, ultimaEntrada: "12/10/2024" },
      { insumo: "Papel A4 Chambril 75g", tipo: "Papel", saldo: 1200, minimo: 500, ultimaEntrada: "14/10/2024" },
      { insumo: "Cilindro DR-2340", tipo: "Cilindro", saldo: 5, minimo: 3, ultimaEntrada: "05/10/2024" },
    ],
    consumoMensal: 12450,
    eficiencia: 87,
    status: "ativo",
  },
  {
    id: "2",
    razaoSocial: "Tech Solutions Ltda.",
    cnpj: "98.765.432/0001-10",
    contrato: "CON-2023-045",
    segmento: "Tecnologia",
    sites: 2,
    equipamentos: [
      { patrimonio: "PAT-88101", modelo: "HP LaserJet Enterprise", serie: "CNB9X8Y7Z6", localizacao: "Andar 3 - TI", contador: "67.890", status: "online" },
      { patrimonio: "PAT-88105", modelo: "Lexmark MS811", serie: "LX-5500-AA", localizacao: "Almoxarifado", contador: "15.340", status: "offline" },
    ],
    estoque: [
      { insumo: "Toner Lexmark 52D0H00", tipo: "Toner", saldo: 8, minimo: 10, ultimaEntrada: "08/10/2024" },
      { insumo: "Papel A4 Report 90g", tipo: "Papel", saldo: 350, minimo: 400, ultimaEntrada: "11/10/2024" },
    ],
    consumoMensal: 5200,
    eficiencia: 72,
    status: "ativo",
  },
  {
    id: "3",
    razaoSocial: "Ferreira & Associados Adv.",
    cnpj: "55.123.789/0001-44",
    contrato: "CON-2024-001",
    segmento: "Jurídico",
    sites: 1,
    equipamentos: [
      { patrimonio: "PAT-77001", modelo: "Konica Minolta C360i", serie: "KM-C360-112", localizacao: "Escritório Central", contador: "22.100", status: "online" },
    ],
    estoque: [
      { insumo: "Toner TN-328K (Preto)", tipo: "Toner", saldo: 12, minimo: 5, ultimaEntrada: "15/10/2024" },
      { insumo: "Toner TN-328C (Cyan)", tipo: "Toner", saldo: 4, minimo: 5, ultimaEntrada: "15/10/2024" },
      { insumo: "Papel Timbrado A4", tipo: "Papel", saldo: 800, minimo: 200, ultimaEntrada: "10/10/2024" },
    ],
    consumoMensal: 3100,
    eficiencia: 94,
    status: "ativo",
  },
];

type ModalType = "new" | "detail" | "delete" | null;

export default function Clientes() {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [detailTab, setDetailTab] = useState<"equipamentos" | "estoque" | "consumo">("equipamentos");

  // New client form
  const [newRazao, setNewRazao] = useState("");
  const [newCnpj, setNewCnpj] = useState("");
  const [newContrato, setNewContrato] = useState("");
  const [newSegmento, setNewSegmento] = useState("");

  const filtered = clients.filter(
    (c) =>
      c.razaoSocial.toLowerCase().includes(search.toLowerCase()) ||
      c.cnpj.includes(search) ||
      c.contrato.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!newRazao || !newCnpj) {
      toast({ variant: "destructive", title: "Campos obrigatórios", description: "Preencha a razão social e o CNPJ." });
      return;
    }
    const newClient: Client = {
      id: String(Date.now()),
      razaoSocial: newRazao,
      cnpj: newCnpj,
      contrato: newContrato || `CON-${new Date().getFullYear()}-${String(clients.length + 1).padStart(3, "0")}`,
      segmento: newSegmento || "Geral",
      sites: 0,
      equipamentos: [],
      estoque: [],
      consumoMensal: 0,
      eficiencia: 0,
      status: "ativo",
    };
    setClients([newClient, ...clients]);
    setModal(null);
    setNewRazao("");
    setNewCnpj("");
    setNewContrato("");
    setNewSegmento("");
    toast({ title: "Cliente cadastrado", description: `${newRazao} adicionado com sucesso.` });
  };

  const handleDelete = () => {
    if (!selectedClient) return;
    setClients(clients.filter((c) => c.id !== selectedClient.id));
    setModal(null);
    toast({ title: "Cliente removido", description: `${selectedClient.razaoSocial} foi excluído.` });
    setSelectedClient(null);
  };

  const openDetail = (client: Client) => {
    setSelectedClient(client);
    setDetailTab("equipamentos");
    setModal("detail");
  };

  const openDelete = (client: Client) => {
    setSelectedClient(client);
    setModal("delete");
  };

  // Summary KPIs
  const totalClients = clients.length;
  const totalEquip = clients.reduce((a, c) => a + c.equipamentos.length, 0);
  const avgEficiencia = Math.round(clients.reduce((a, c) => a + c.eficiencia, 0) / (clients.length || 1));
  const criticalStock = clients.reduce(
    (a, c) => a + c.estoque.filter((e) => e.saldo < e.minimo).length, 0
  );

  return (
    <OperatorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Clientes</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Cadastro, consulta de equipamentos, índices de consumo e estoque virtual por cliente.
            </p>
          </div>
          <Button className="gap-2" onClick={() => setModal("new")}>
            <Plus className="h-4 w-4" />
            Novo Cliente
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Clientes Ativos", value: String(totalClients), icon: Users, color: "text-primary", bg: "bg-primary/10" },
            { label: "Equipamentos", value: String(totalEquip), icon: Printer, color: "text-primary", bg: "bg-primary/10" },
            { label: "Eficiência Média", value: `${avgEficiencia}%`, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
            { label: "Estoque Crítico", value: String(criticalStock), icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
          ].map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                    <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
                    <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por razão social, CNPJ ou contrato..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Clients Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Cliente</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Contrato</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-center">Equipamentos</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-center">Eficiência</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-center">Estoque</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-center">Status</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((client) => {
                  const hasStockIssue = client.estoque.some((e) => e.saldo < e.minimo);
                  return (
                    <TableRow key={client.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {client.razaoSocial.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{client.razaoSocial}</p>
                            <p className="text-[10px] text-muted-foreground font-mono">{client.cnpj}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] font-mono">{client.contrato}</Badge>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{client.segmento}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-bold">{client.equipamentos.length}</span>
                        <p className="text-[10px] text-muted-foreground">{client.sites} site{client.sites !== 1 ? "s" : ""}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`text-sm font-bold ${client.eficiencia < 75 ? "text-destructive" : "text-primary"}`}>
                          {client.eficiencia}%
                        </span>
                        <div className="w-12 bg-muted h-1 rounded-full mx-auto mt-1">
                          <div
                            className={`h-full rounded-full ${client.eficiencia < 75 ? "bg-destructive" : "bg-primary"}`}
                            style={{ width: `${client.eficiencia}%` }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {hasStockIssue ? (
                          <Badge variant="destructive" className="text-[9px] gap-1">
                            <AlertTriangle className="h-3 w-3" /> Crítico
                          </Badge>
                        ) : (
                          <Badge className="text-[9px] bg-primary/10 text-primary border-0">Normal</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={client.status === "ativo" ? "default" : "secondary"} className="text-[9px] uppercase">
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openDetail(client)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => openDelete(client)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhum cliente encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* === MODAL: Novo Cliente === */}
      <Dialog open={modal === "new"} onOpenChange={(o) => !o && setModal(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Cadastrar Novo Cliente
            </DialogTitle>
            <DialogDescription>Preencha os dados do cliente para adicionar ao sistema.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">Razão Social *</Label>
              <Input value={newRazao} onChange={(e) => setNewRazao(e.target.value)} placeholder="Ex: Empresa ABC Ltda." />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">CNPJ *</Label>
              <Input value={newCnpj} onChange={(e) => setNewCnpj(e.target.value)} placeholder="00.000.000/0000-00" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider">Nº Contrato</Label>
                <Input value={newContrato} onChange={(e) => setNewContrato(e.target.value)} placeholder="CON-2024-XXX" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider">Segmento</Label>
                <Select value={newSegmento} onValueChange={setNewSegmento}>
                  <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="Logística">Logística</SelectItem>
                    <SelectItem value="Jurídico">Jurídico</SelectItem>
                    <SelectItem value="Saúde">Saúde</SelectItem>
                    <SelectItem value="Educação">Educação</SelectItem>
                    <SelectItem value="Geral">Geral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModal(null)}>Cancelar</Button>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" /> Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* === MODAL: Excluir Cliente === */}
      <Dialog open={modal === "delete"} onOpenChange={(o) => !o && setModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir <strong>{selectedClient?.razaoSocial}</strong>?
              Esta ação removerá todos os dados vinculados ao cliente.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 text-sm space-y-1">
            <p><strong>CNPJ:</strong> {selectedClient?.cnpj}</p>
            <p><strong>Contrato:</strong> {selectedClient?.contrato}</p>
            <p><strong>Equipamentos vinculados:</strong> {selectedClient?.equipamentos.length}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModal(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete} className="gap-2">
              <Trash2 className="h-4 w-4" /> Excluir Definitivamente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* === MODAL: Detalhes do Cliente === */}
      <Dialog open={modal === "detail"} onOpenChange={(o) => !o && setModal(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                {selectedClient?.razaoSocial.charAt(0)}
              </div>
              <div>
                <span className="text-lg">{selectedClient?.razaoSocial}</span>
                <p className="text-xs text-muted-foreground font-normal mt-0.5">
                  {selectedClient?.cnpj} • {selectedClient?.contrato} • {selectedClient?.segmento}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3 py-2">
            <div className="bg-primary/5 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary">{selectedClient?.equipamentos.length}</p>
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Equipamentos</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary">{selectedClient?.eficiencia}%</p>
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Eficiência</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary">{selectedClient?.consumoMensal.toLocaleString()}</p>
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Consumo/Mês</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-border">
            {([
              { key: "equipamentos" as const, label: "Equipamentos", icon: Printer },
              { key: "estoque" as const, label: "Estoque Virtual", icon: Package },
              { key: "consumo" as const, label: "Índices de Consumo", icon: BarChart3 },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setDetailTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  detailTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab: Equipamentos */}
          {detailTab === "equipamentos" && selectedClient && (
            <div className="space-y-3">
              {selectedClient.equipamentos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Nenhum equipamento vinculado.</p>
              ) : (
                selectedClient.equipamentos.map((eq) => (
                  <div key={eq.patrimonio} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Printer className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">{eq.modelo}</p>
                        <Badge
                          className={`text-[9px] border-0 ${
                            eq.status === "online"
                              ? "bg-green-100 text-green-700"
                              : eq.status === "manutencao"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {eq.status === "online" ? "● Online" : eq.status === "manutencao" ? "⚠ Manutenção" : "○ Offline"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-muted-foreground font-medium">
                        <span>PAT: {eq.patrimonio}</span>
                        <span>Série: {eq.serie}</span>
                        <span>Local: {eq.localizacao}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold font-mono">{eq.contador}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Contador</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab: Estoque Virtual */}
          {detailTab === "estoque" && selectedClient && (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Insumo</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Tipo</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-center">Saldo</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-center">Mínimo</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-center">Status</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Última Entrada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedClient.estoque.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhum estoque registrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  selectedClient.estoque.map((item, i) => {
                    const isCritical = item.saldo < item.minimo;
                    const percent = Math.min(100, Math.round((item.saldo / (item.minimo * 2)) * 100));
                    return (
                      <TableRow key={i}>
                        <TableCell className="text-sm font-semibold">{item.insumo}</TableCell>
                        <TableCell>
                          <Badge
                            variant={item.tipo === "Toner" ? "default" : item.tipo === "Cilindro" ? "destructive" : "secondary"}
                            className="text-[9px] uppercase"
                          >
                            {item.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-bold ${isCritical ? "text-destructive" : ""}`}>{item.saldo}</span>
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">{item.minimo}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16 bg-muted h-1.5 rounded-full">
                              <div
                                className={`h-full rounded-full ${isCritical ? "bg-destructive" : "bg-primary"}`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            {isCritical && <AlertTriangle className="h-3.5 w-3.5 text-destructive" />}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.ultimaEntrada}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}

          {/* Tab: Índices de Consumo */}
          {detailTab === "consumo" && selectedClient && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-5">
                    <FileText className="h-6 w-6 text-primary mb-2" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Consumo Mensal</p>
                    <p className="text-2xl font-bold">{selectedClient.consumoMensal.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">páginas impressas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <TrendingUp className="h-6 w-6 text-primary mb-2" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Eficiência (Regra 80%)</p>
                    <p className={`text-2xl font-bold ${selectedClient.eficiencia < 75 ? "text-destructive" : "text-primary"}`}>
                      {selectedClient.eficiencia}%
                    </p>
                    <div className="w-full bg-muted h-2 rounded-full mt-2">
                      <div
                        className={`h-full rounded-full ${selectedClient.eficiencia < 75 ? "bg-destructive" : "bg-primary"}`}
                        style={{ width: `${selectedClient.eficiencia}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Simulated monthly bars */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Consumo dos Últimos 6 Meses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-end justify-between gap-3 px-2 border-b border-border">
                    {[
                      { month: "OUT", v: 85 },
                      { month: "NOV", v: 72 },
                      { month: "DEZ", v: 60 },
                      { month: "JAN", v: 90 },
                      { month: "FEV", v: 78 },
                      { month: "MAR", v: 65 },
                    ].map((b) => (
                      <div key={b.month} className="w-full flex flex-col items-center gap-1">
                        <div className="w-full bg-primary rounded-t-sm" style={{ height: `${b.v}%` }} />
                        <span className="text-[10px] font-bold text-muted-foreground mt-1">{b.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Per-equipment efficiency */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Eficiência por Equipamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedClient.equipamentos.map((eq) => {
                    const eff = Math.round(60 + Math.random() * 35);
                    return (
                      <div key={eq.patrimonio} className="flex items-center gap-3">
                        <Printer className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">{eq.modelo}</p>
                          <p className="text-[10px] text-muted-foreground">{eq.patrimonio}</p>
                        </div>
                        <div className="flex items-center gap-2 w-32">
                          <div className="flex-1 bg-muted h-1.5 rounded-full">
                            <div
                              className={`h-full rounded-full ${eff < 75 ? "bg-destructive" : "bg-primary"}`}
                              style={{ width: `${eff}%` }}
                            />
                          </div>
                          <span className={`text-xs font-bold w-8 text-right ${eff < 75 ? "text-destructive" : ""}`}>{eff}%</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </OperatorLayout>
  );
}
