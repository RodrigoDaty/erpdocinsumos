import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Printer as PrinterIcon, Zap, AlertTriangle, TrendingUp, Download, FileSpreadsheet } from "lucide-react";

const weeklyData = [
  { week: "Sem 01", percent: 40 },
  { week: "Sem 02", percent: 65 },
  { week: "Sem 03", percent: 50 },
  { week: "Sem 04", percent: 90 },
];

const contracts = [
  { name: "#0042 - Tech Global", sla: "SLA 24h", produced: "245.890", paper: "492 resmas", balancePercent: 30, balance: "1.200 un", exceptions: "Nenhuma", exType: "neutral" as const },
  { name: "#0091 - Logística Nac.", sla: "SLA 48h", produced: "112.400", paper: "225 resmas", balancePercent: 90, balance: "15 un", exceptions: "02 Alertas", exType: "error" as const },
  { name: "#0105 - Banco Prime", sla: "SLA 12h", produced: "89.120", paper: "178 resmas", balancePercent: 45, balance: "500 un", exceptions: "01 Nota", exType: "neutral" as const },
];

export default function RelatorioFechamento() {
  return (
    <OperatorLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Relatório de Fechamento</h1>
            <p className="text-muted-foreground text-sm mt-1">Análise consolidada de insumos e produtividade mensal.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FileSpreadsheet className="h-4 w-4" /> Excel
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" /> Gerar PDF
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1.5">Mês de Referência</p>
                <Select defaultValue="nov"><SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="out">Outubro</SelectItem>
                    <SelectItem value="nov">Novembro</SelectItem>
                    <SelectItem value="dez">Dezembro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1.5">Ano</p>
                <Select defaultValue="2024"><SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1.5">Cliente</p>
                <Select defaultValue="all"><SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Clientes</SelectItem>
                    <SelectItem value="tech">Tech Global Corp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1.5">Contrato</p>
                <Select defaultValue="all"><SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Contratos</SelectItem>
                    <SelectItem value="0042">#0042 - Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <FileText className="h-5 w-5" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total de Resmas</p>
              <h3 className="text-3xl font-black mt-1">1,248</h3>
              <p className="text-xs text-primary font-bold mt-3 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +12% vs mês anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary-foreground flex items-center justify-center mb-4">
                <PrinterIcon className="h-5 w-5" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Toners/Cilindros</p>
              <h3 className="text-3xl font-black mt-1">42</h3>
              <p className="text-xs text-muted-foreground font-bold mt-3">Estável</p>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <CardContent className="p-6 relative z-10">
              <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Eficiência (Regra 80%)</p>
              <h3 className="text-3xl font-black mt-1">84.2%</h3>
              <div className="mt-3 w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[84%]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-destructive/5">
            <CardContent className="p-6">
              <div className="h-10 w-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Protocolos RMA</p>
              <h3 className="text-3xl font-black mt-1">07</h3>
              <p className="text-xs text-destructive font-bold mt-3 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> 3 aguardando análise
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-base">Tendência Semanal</CardTitle>
              <p className="text-xs text-muted-foreground">Consumo de resmas acumulado</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-3 h-32">
                {weeklyData.map((w) => (
                  <div key={w.week} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary/20 rounded-lg relative overflow-hidden h-24">
                      <div className="absolute bottom-0 w-full bg-primary rounded-t-lg" style={{ height: `${w.percent}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{w.week}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Pico de consumo</span>
                <span className="text-xs font-bold text-primary">Semana 4 (412 un)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-8">
            <CardHeader>
              <CardTitle className="text-base">Visão por Contrato</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-[10px] font-black uppercase tracking-wider">Contrato</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-wider">Produzido</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-wider">Papel</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-wider">Saldo</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-wider text-right">Exceções</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((c) => (
                    <TableRow key={c.name}>
                      <TableCell>
                        <p className="font-bold text-sm">{c.name}</p>
                        <p className="text-[10px] text-muted-foreground">{c.sla}</p>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{c.produced}</TableCell>
                      <TableCell className="text-sm font-medium">{c.paper}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-12 h-1.5 rounded-full overflow-hidden ${c.exType === "error" ? "bg-destructive/20" : "bg-muted"}`}>
                            <div className={`h-full ${c.exType === "error" ? "bg-destructive" : "bg-primary"}`} style={{ width: `${c.balancePercent}%` }} />
                          </div>
                          <span className={`text-[10px] font-bold ${c.exType === "error" ? "text-destructive" : ""}`}>{c.balance}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={c.exType === "error" ? "destructive" : "secondary"} className="text-[10px]">
                          {c.exceptions}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Footer info */}
        <Card>
          <CardContent className="p-4 flex flex-wrap gap-8">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Última Atualização</p>
              <p className="text-sm font-medium">Hoje às 14:32</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Responsável</p>
              <p className="text-sm font-medium">Analista Senior - Financeiro</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Período Fiscal</p>
              <p className="text-sm font-medium">Q4 2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </OperatorLayout>
  );
}
