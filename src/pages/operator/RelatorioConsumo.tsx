import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Share2, Calendar, User, FileText, Printer, Building2, Store, AlertTriangle, MoreVertical } from "lucide-react";

const kpis = [
  { label: "Total de Resmas", value: "12.450", change: "+14%", changeLabel: "vs. mês anterior", type: "primary" as const },
  { label: "Cilindros Trocados", value: "184", change: "", changeLabel: "Média 6.2/dia", type: "neutral" as const },
  { label: "Consumo de Toner", value: "412", change: "65%", changeLabel: "", type: "bar" as const },
  { label: "Exceções RMA", value: "12", change: "-2%", changeLabel: "Redução de falhas", type: "error" as const },
];

const sites = [
  { name: "Site Principal - São Paulo", desc: "Centro de Distribuição", icon: Building2, ativos: 42, toners: 128, cilindros: 14, resmas: "4.200", eficiencia: 92 },
  { name: "Filial Curitiba", desc: "Escritório Administrativo", icon: Store, ativos: 15, toners: 54, cilindros: 6, resmas: "1.850", eficiencia: 88 },
];

const rankings = [
  { rank: "01", name: "Laboratório de Engenharia - Setor A", value: "2.140 resmas", percent: 95 },
  { rank: "02", name: "Financeiro - Matriz", value: "1.820 resmas", percent: 80 },
  { rank: "03", name: "Recepção Central", value: "1.105 resmas", percent: 50 },
];

const exceptions = [
  { title: "Toner esgotado antes do SLA", detail: "HP LaserJet M507 — Site São Paulo", type: "critical" as const },
  { title: "Cilindro com defeito de fábrica", detail: "Lexmark MS811 — Filial Curitiba", type: "warning" as const },
];

export default function RelatorioConsumo() {
  return (
    <OperatorLayout>
      <div className="space-y-6">
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span>Home</span><span>›</span><span className="text-primary font-semibold">Relatórios Avançados</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Relatório de Consumo</h1>
            <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
              Análise detalhada de insumos por localidade e ativos. Monitore a eficiência operacional e identifique gargalos de consumo em tempo real.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> PDF</Button>
            <Button className="gap-2"><Share2 className="h-4 w-4" /> Compartilhar</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b">
          <button className="pb-3 text-sm font-bold text-primary border-b-2 border-primary">Visão Geral</button>
          <button className="pb-3 text-sm font-medium text-muted-foreground">Consumo por Ativo/Site</button>
          <button className="pb-3 text-sm font-medium text-muted-foreground">Movimentação de Estoque</button>
          <button className="pb-3 text-sm font-medium text-muted-foreground">Auditoria de Exceções/RMA</button>
        </div>

        {/* Chip Filters */}
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="gap-1 py-1.5 px-3 text-xs cursor-pointer"><Calendar className="h-3 w-3" /> Filtrar Data</Badge>
          <Badge variant="outline" className="gap-1 py-1.5 px-3 text-xs cursor-pointer"><User className="h-3 w-3" /> Selecionar Cliente</Badge>
          <Badge variant="outline" className="gap-1 py-1.5 px-3 text-xs cursor-pointer"><FileText className="h-3 w-3" /> Contrato</Badge>
          <div className="ml-auto flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Dados atualizados há 5 min
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="p-5">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{kpi.label}</p>
                <h3 className={`text-3xl font-extrabold ${kpi.type === "error" ? "text-destructive" : kpi.type === "primary" ? "text-primary" : ""}`}>{kpi.value}</h3>
                <div className="mt-3 flex items-center gap-2">
                  {kpi.type === "bar" ? (
                    <>
                      <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: kpi.change }} />
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground">{kpi.change}</span>
                    </>
                  ) : kpi.change ? (
                    <>
                      <Badge className={`text-[10px] border-0 ${kpi.type === "error" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>{kpi.change}</Badge>
                      {kpi.changeLabel && <span className="text-muted-foreground text-[10px]">{kpi.changeLabel}</span>}
                    </>
                  ) : (
                    <span className="text-muted-foreground text-[10px]">{kpi.changeLabel}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Site Consumption Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Consumo Detalhado por Localidade</h2>
            <Badge className="bg-primary/5 text-primary border-0 text-[10px]">Filtro: Ativos em Operação</Badge>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest">Localidade / Site</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-center">Ativos</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-center">Toners</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-center">Cilindros</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-center">Resmas</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-right">Eficiência</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sites.map((site, i) => (
                    <>
                      <TableRow key={i} className="hover:bg-muted/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                              <site.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold">{site.name}</p>
                              <p className="text-[10px] text-muted-foreground">{site.desc}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-sm font-medium">{site.ativos}</TableCell>
                        <TableCell className="text-center text-sm font-medium">{site.toners}</TableCell>
                        <TableCell className="text-center text-sm font-medium">{site.cilindros}</TableCell>
                        <TableCell className="text-center text-sm font-bold text-primary">{site.resmas}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs font-bold">{site.eficiencia}%</span>
                            <div className="w-12 bg-muted h-1 rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: `${site.eficiencia}%` }} />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                      {i === 0 && (
                        <TableRow className="bg-muted/20">
                          <TableCell className="pl-14 border-l-2 border-primary">
                            <div className="flex items-center gap-2">
                              <Printer className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">HP LaserJet M507 [SN: 44921]</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-[10px] text-muted-foreground">Ativo Unitário</TableCell>
                          <TableCell className="text-center text-xs">12</TableCell>
                          <TableCell className="text-center text-xs">1</TableCell>
                          <TableCell className="text-center text-xs font-bold">450</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="secondary" className="text-[10px]">Operação Normal</Badge>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-bold text-sm">TOTAIS DE PERÍODO</TableCell>
                    <TableCell className="text-center font-bold">57</TableCell>
                    <TableCell className="text-center font-bold">182</TableCell>
                    <TableCell className="text-center font-bold">20</TableCell>
                    <TableCell className="text-center font-bold text-lg text-primary">6.050</TableCell>
                    <TableCell />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Rankings + Exceptions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Ranking de Consumo</CardTitle>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Top Equipamentos por Site</p>
            </CardHeader>
            <CardContent className="space-y-5">
              {rankings.map((r) => (
                <div key={r.rank} className="flex items-center gap-4">
                  <span className="text-xl font-black text-muted-foreground/20 w-8">{r.rank}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-1">
                      <p className="text-sm font-bold">{r.name}</p>
                      <span className="text-xs font-bold text-primary">{r.value}</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: `${r.percent}%`, opacity: r.percent > 80 ? 1 : r.percent > 50 ? 0.7 : 0.4 }} />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Exceções Críticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {exceptions.map((ex, i) => (
                <div key={i} className={`p-4 rounded-xl border ${ex.type === "critical" ? "bg-destructive/5 border-destructive/10" : "bg-amber-50 border-amber-200"}`}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={`h-4 w-4 mt-0.5 ${ex.type === "critical" ? "text-destructive" : "text-amber-600"}`} />
                    <div>
                      <p className="text-sm font-bold">{ex.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{ex.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </OperatorLayout>
  );
}
