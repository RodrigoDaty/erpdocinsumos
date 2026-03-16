import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Package, AlertTriangle, FileText, TrendingUp, Activity } from "lucide-react";

const stats = [
  { label: "Total de Ativos", value: "1.248", change: "+12%", icon: Users, trend: "up" },
  { label: "Estoque Papel", value: "14.280", unit: "resmas", icon: Package, trend: "up" },
  { label: "Toners & Tintas", value: "842", unit: "unid.", icon: Package, trend: "neutral" },
  { label: "Alertas Críticos", value: "7", icon: AlertTriangle, trend: "down" },
];

const recentActivity = [
  { action: "Entrada de Estoque", detail: "Lote #9921 - Toner Magenta HP-CF", time: "Hoje, 10:45", type: "entrada" },
  { action: "Solicitação Aprovada", detail: "Site Sorocaba - 500 resmas A4", time: "Hoje, 09:30", type: "aprovado" },
  { action: "Nível Crítico", detail: "Cilindro DR-2340 - Saldo: 3 unid.", time: "Hoje, 08:15", type: "critico" },
  { action: "Novo Usuário", detail: "Marcos Mendes - Op. Logística", time: "Ontem, 17:00", type: "usuario" },
  { action: "Baixa Automática", detail: "Toner K - Site Sorocaba", time: "Ontem, 14:22", type: "consumo" },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Visão geral do sistema ERP de insumos.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-2">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      {stat.unit && <span className="text-sm text-muted-foreground">{stat.unit}</span>}
                    </div>
                    {stat.change && (
                      <p className="text-xs text-success mt-1 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {stat.change} em relação ao mês anterior
                      </p>
                    )}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Atividade Recente */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                    <div
                      className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                        item.type === "critico"
                          ? "bg-destructive"
                          : item.type === "entrada"
                          ? "bg-success"
                          : item.type === "aprovado"
                          ? "bg-primary"
                          : "bg-muted-foreground"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Solicitações Pendentes */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Solicitações Pendentes
              </CardTitle>
              <Badge variant="destructive">14 pendentes</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { site: "Prédio Administrativo", tipo: "Papel A4", qtd: "200 resmas", urgencia: "Normal" },
                { site: "Unidade Logística Oeste", tipo: "Toner HP-CF", qtd: "15 unid.", urgencia: "Urgente" },
                { site: "Campus Educacional", tipo: "Cilindro DR-2340", qtd: "5 unid.", urgencia: "Crítico" },
              ].map((s, i) => (
                <div key={i} className="rounded-lg border border-border p-4 space-y-2">
                  <p className="font-medium text-sm">{s.site}</p>
                  <p className="text-xs text-muted-foreground">{s.tipo} — {s.qtd}</p>
                  <Badge
                    variant={s.urgencia === "Crítico" ? "destructive" : s.urgencia === "Urgente" ? "secondary" : "outline"}
                    className="text-[10px]"
                  >
                    {s.urgencia}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
