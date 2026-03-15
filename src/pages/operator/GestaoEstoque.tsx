import { useState } from "react";
import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  FileText, Palette, Settings, Filter, ArrowRight, Package, RefreshCw, LogOut, Wrench,
  PenLine, PlusSquare,
} from "lucide-react";

const inventory = [
  { site: "Prédio Administrativo - Centro", contrato: "#2024-001", responsavel: "Marcos Oliveira", dataEntrada: "14/10/2024", papel: "1.200", toner: "45", status: "normal" },
  { site: "Unidade Logística Oeste", contrato: "#2024-005", responsavel: "Juliana Costa", dataEntrada: "11/10/2024", papel: "350", toner: "8", status: "critico" },
  { site: "Campus Educacional Leste", contrato: "#2023-088", responsavel: "Fernando Mendes", dataEntrada: "13/10/2024", papel: "2.840", toner: "112", status: "normal" },
  { site: "Central de Atendimento", contrato: "#2024-012", responsavel: "Aline Souza", dataEntrada: "09/10/2024", papel: "50", toner: "3", status: "critico" },
];

const movements = [
  {
    type: "os" as const,
    osNumber: "O.S. #2024-4482",
    items: [
      { name: "Toner Magenta HP-CF", qty: "+25 unid.", resp: "Carlos M.", time: "Hoje, 10:45" },
      { name: "Toner Cyan HP-CF", qty: "+25 unid.", resp: "Carlos M.", time: "Hoje, 10:45" },
    ],
  },
  {
    type: "auto" as const,
    title: "Baixa Automática",
    badge: "Consumo",
    desc: "Relatório Site Sorocaba - Toner K",
    detail: "-1 unid. • Sistema • Hoje, 09:12",
  },
  {
    type: "exit" as const,
    title: "Saída por Requisição",
    badge: "Saída",
    desc: "Solicitação #REQ-294 - Papel A4",
    detail: "-20 resmas • Resp: Ricardo • Ontem, 16:30",
  },
  {
    type: "os" as const,
    osNumber: "Manutenção #M-9021",
    items: [
      { name: "Kit de Fusão 110V", qty: "-1 unid.", resp: "Pedro L.", time: "Ontem, 14:15" },
    ],
  },
];

export default function GestaoEstoque() {
  const [clienteFilter, setClienteFilter] = useState("todos");
  const [tipoFilter, setTipoFilter] = useState("todos");

  return (
    <OperatorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Estoque Virtual</h1>
            <p className="text-muted-foreground">Gestão centralizada de insumos e saldos por localidade.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <PenLine className="h-4 w-4" />
              Ajuste Manual
            </Button>
            <Button className="gap-2">
              <PlusSquare className="h-4 w-4" />
              Entrada de Estoque
            </Button>
          </div>
        </div>

        {/* Global Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Papel A4 / A3</span>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="h-5 w-5" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">14.280</span>
                  <span className="text-sm text-muted-foreground">resmas</span>
                </div>
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "72%" }} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground uppercase font-bold">
                  <span>Última Entrada: 12/10/24</span>
                  <span>Resp: Carlos M.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Toners & Tintas</span>
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary-foreground">
                  <Palette className="h-5 w-5" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">842</span>
                  <span className="text-sm text-muted-foreground">unid.</span>
                </div>
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: "45%" }} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground uppercase font-bold">
                  <span>Última Entrada: 14/10/24</span>
                  <span>Resp: Ana Silva</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cilindros & Peças</span>
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  <Settings className="h-5 w-5" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">156</span>
                  <span className="text-sm text-muted-foreground">unid.</span>
                </div>
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-destructive rounded-full" style={{ width: "15%" }} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-destructive uppercase font-bold">
                  <span>Última Entrada: 05/10/24</span>
                  <span>Resp: Roberto J.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 bg-muted/50 p-4 rounded-lg border border-border/50">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Filtros:</span>
          </div>
          <Select value={clienteFilter} onValueChange={setClienteFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Todos os Clientes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Clientes</SelectItem>
              <SelectItem value="pref">Prefeitura Municipal de SP</SelectItem>
              <SelectItem value="banco">Banco Central Unidade Sul</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Tipo de Item" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Tipo de Item</SelectItem>
              <SelectItem value="papel">Papel A4</SelectItem>
              <SelectItem value="toner-k">Toner Preto</SelectItem>
              <SelectItem value="toner-c">Toner Color</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="link" className="ml-auto text-sm text-primary font-semibold">Limpar Filtros</Button>
        </div>

        {/* Table + Movements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saldos Table */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold">Saldos por Site / Contrato</CardTitle>
                <Button variant="link" className="text-sm text-primary gap-1">
                  Ver Detalhes <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[11px] uppercase font-bold tracking-wider">Site / Localidade</TableHead>
                    <TableHead className="text-[11px] uppercase font-bold tracking-wider">Responsável</TableHead>
                    <TableHead className="text-[11px] uppercase font-bold tracking-wider text-center">Data Entrada</TableHead>
                    <TableHead className="text-[11px] uppercase font-bold tracking-wider text-right">Saldos</TableHead>
                    <TableHead className="text-[11px] uppercase font-bold tracking-wider text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((inv, i) => (
                    <TableRow key={i} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">{inv.site}</span>
                          <span className="text-[10px] text-muted-foreground">Contrato: {inv.contrato}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{inv.responsavel}</TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">{inv.dataEntrada}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col">
                          <span className="text-sm font-mono">P: {inv.papel}</span>
                          <span className="text-[10px] font-mono text-muted-foreground">T: {inv.toner}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={inv.status === "critico" ? "destructive" : "default"} className="text-[10px] uppercase">
                          {inv.status === "critico" ? "Crítico" : "Abastecido"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Movimentações Recentes */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">Movimentações Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[420px] overflow-y-auto">
              {movements.map((mov, i) => {
                if (mov.type === "os") {
                  return (
                    <div key={i} className="space-y-3 bg-card/50 p-3 rounded-lg border border-border/30">
                      <div className="flex justify-between items-center border-b border-border/30 pb-2">
                        <div className="flex items-center gap-2">
                          {mov.osNumber?.startsWith("Manutenção") ? (
                            <Wrench className="h-4 w-4 text-primary" />
                          ) : (
                            <Package className="h-4 w-4 text-primary" />
                          )}
                          <span className="text-xs font-bold">{mov.osNumber}</span>
                        </div>
                        <Badge variant="outline" className="text-[9px] uppercase text-primary border-primary/20 bg-primary/5">
                          Lote OS-2024
                        </Badge>
                      </div>
                      <div className="space-y-3 pl-1">
                        {mov.items?.map((item, j) => (
                          <div key={j} className="flex gap-3 items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <div className="flex-1">
                              <p className="text-[11px] font-semibold leading-tight">{item.name}</p>
                              <div className="flex justify-between items-center">
                                <p className="text-[10px] text-muted-foreground">{item.qty} • Resp: {item.resp}</p>
                                <p className="text-[9px] text-muted-foreground font-medium">{item.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={i} className="flex gap-3 items-start px-1">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      {mov.type === "auto" ? (
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <LogOut className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-bold">{mov.title}</span>
                        <Badge variant="secondary" className="text-[9px] uppercase">{mov.badge}</Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-tight">{mov.desc}</p>
                      <p className="text-[10px] text-muted-foreground">{mov.detail}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
            <div className="p-4 border-t border-border">
              <Button variant="outline" className="w-full text-sm font-bold">
                Ver Histórico Completo
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </OperatorLayout>
  );
}
