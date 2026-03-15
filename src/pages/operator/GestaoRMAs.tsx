import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, ArrowUp, Ban, CheckCircle, Filter, Plus, Package, Clock, ShieldCheck, BarChart3 } from "lucide-react";

const rmaItems = [
  {
    id: "RMA-2023-9081",
    equip: "Konica C14000",
    serial: "SN: 8872-A92 | PAT: 22019",
    insumo: "Toner Black (TN-014)",
    insumoPercent: 42,
    delta: "-18,400",
    status: "Em análise técnica",
    statusType: "error" as const,
  },
  {
    id: "RMA-2023-8992",
    equip: "HP Indigo 7K",
    serial: "SN: Indigo-X92 | PAT: 11082",
    insumo: "Imaging Oil",
    insumoPercent: 88,
    delta: "-2,100",
    status: "Liberado por Exceção",
    statusType: "success" as const,
    justificativa: "Vazamento em duto externo não relacionado ao insumo",
  },
  {
    id: "RMA-2023-8871",
    equip: "Ricoh Pro C7200",
    serial: "SN: RC-9112 | PAT: 33902",
    insumo: "Drum Unit Cyan",
    insumoPercent: 15,
    delta: "-45,000",
    status: "Falha Crítica / Garantia",
    statusType: "error" as const,
  },
];

const bottomStats = [
  { icon: Package, label: "SKU Mais Afetado", value: "Toner Mag K-Series" },
  { icon: Clock, label: "SLA Médio de Reposição", value: "14.2 Horas" },
  { icon: ShieldCheck, label: "Taxa de Aprovação", value: "89% Garantias Válidas" },
];

export default function GestaoRMAs() {
  return (
    <OperatorLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestão de RMAs</h1>
            <p className="text-muted-foreground text-sm mt-1">Monitoramento de insumos com performance abaixo da meta.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filtros Avançados
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Novo RMA
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Taxa de RMA (Mês)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">4.2%</span>
                <span className="text-destructive text-xs font-semibold flex items-center">
                  <ArrowUp className="h-3 w-3" /> 0.8%
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Delta Total de Produção</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-destructive">128k</span>
                <span className="text-muted-foreground text-xs">Páginas perdidas</span>
              </div>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2">
            <CardContent className="p-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Cliente</p>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Clientes</SelectItem>
                      <SelectItem value="grafica">Gráfica Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Período</p>
                  <Select defaultValue="30d">
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30d">Últimos 30 Dias</SelectItem>
                      <SelectItem value="trimestre">Trimestre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RMA Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Lista de Insumos sob Análise</CardTitle>
              <div className="flex gap-2">
                <Badge className="bg-primary/10 text-primary border-0 text-[10px]">12 Pendentes</Badge>
                <Badge variant="secondary" className="text-[10px]">8 Liberados</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">RMA #</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Equipamento</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Insumo</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-right">Delta Meta</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rmaItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell className="font-bold text-sm text-primary">{item.id}</TableCell>
                    <TableCell>
                      <p className="text-sm font-semibold">{item.equip}</p>
                      <p className="text-[10px] text-muted-foreground">{item.serial}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-8 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.insumoPercent < 50 ? "bg-destructive" : "bg-primary"}`}
                            style={{ width: `${item.insumoPercent}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{item.insumo}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-destructive font-bold text-sm">{item.delta}</span>
                      <span className="text-[10px] block text-muted-foreground">págs faltantes</span>
                    </TableCell>
                    <TableCell>
                      {item.statusType === "error" ? (
                        <Badge variant="destructive" className="gap-1 text-xs">
                          <Ban className="h-3 w-3" /> {item.status}
                        </Badge>
                      ) : (
                        <div>
                          <Badge className="gap-1 text-xs bg-primary/10 text-primary border-0">
                            <CheckCircle className="h-3 w-3" /> {item.status}
                          </Badge>
                          {item.justificativa && (
                            <p className="text-[10px] text-muted-foreground italic mt-1">"{item.justificativa}"</p>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 border-t flex items-center justify-between">
              <p className="text-[11px] text-muted-foreground">Mostrando 3 de 20 registros</p>
              <div className="flex gap-1">
                <Button variant="outline" size="sm">Anterior</Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">Próximo</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bottomStats.map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-semibold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4 flex items-center gap-3">
              <BarChart3 className="h-5 w-5" />
              <div>
                <p className="text-[10px] uppercase font-bold opacity-80">Impacto Financeiro</p>
                <p className="text-sm font-semibold">R$ 12.440,00</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </OperatorLayout>
  );
}
