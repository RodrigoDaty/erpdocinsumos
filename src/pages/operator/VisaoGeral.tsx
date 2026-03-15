import { useNavigate } from "react-router-dom";
import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Printer, AlertTriangle, ChevronRight, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const kpis = [
  { label: "PENDENTES", value: "24", sub: "Solicitações em aguardo", icon: Clock, color: "text-primary", bgColor: "bg-primary/10" },
  { label: "ATIVOS", value: "1,284", sub: "Impressoras conectadas", icon: Printer, color: "text-primary", bgColor: "bg-primary/10" },
  { label: "CRÍTICO", value: "12", sub: "Insumos abaixo do nível", icon: AlertTriangle, color: "text-destructive", bgColor: "bg-destructive/10" },
];

const weeklyData = [
  { week: "Semana 1", value: 45 },
  { week: "Semana 2", value: 60 },
  { week: "Semana 3", value: 85 },
  { week: "Semana 4", value: 55 },
  { week: "Semana 5", value: 70 },
];

const alerts = [
  { title: "Unidade Centro - T01", detail: "Cilindro de imagem atingiu 5% de vida útil. Substituição necessária.", time: "HÁ 12 MINUTOS", color: "bg-destructive" },
  { title: "Solicitação #8829", detail: "Aguardando aprovação de gerente para compra de kit fotocondutor.", time: "HÁ 2 HORAS", color: "bg-primary" },
  { title: "Logística SP", detail: "Carga de insumos HP Laser Jet despachada para o hub regional.", time: "HÁ 5 HORAS", color: "bg-primary" },
];

const securityAlerts = [
  { tag: "EXCEÇÃO DE REGRA", time: "AGORA", title: "Sobrescrita Manual de Custo", detail: "Usuário id_8291 forçou aprovação de pedido acima do limite contratual para Site Curitiba.", icon: "⚠️", color: "bg-destructive/10 text-destructive" },
  { tag: "FALHA DE ACESSO", time: "14 MIN", title: "Múltiplas Tentativas de Login", detail: "5 tentativas falhas detectadas para o IP 189.45.2.112 (Admin User).", icon: "🔒", color: "bg-orange-100 text-orange-700" },
  { tag: "PERMISSÃO ALTERADA", time: "42 MIN", title: "Novo Perfil de Acesso", detail: "Permissões de 'Gestor Financeiro' concedidas para marcos.silva@erpinsumos.com.", icon: "🛡️", color: "bg-primary/10 text-primary" },
];

const skuItems = [
  { name: "Toner HP CF226X (Preto)", sku: "SKU: 0092-226X", percent: 78, qty: "142 unidades", status: "ESTOQUE LOCAL", statusColor: "text-muted-foreground" },
  { name: "Toner Brother TN-750", sku: "SKU: 1104-TN7", percent: 12, qty: "08 unidades", status: "RASH POINT", statusColor: "text-destructive" },
  { name: "Cilindro Lexmark MS811", sku: "SKU: 50F0Z00", percent: 3, qty: "02 unidades", status: "ESTOQUE CRÍTICO", statusColor: "text-destructive" },
];
  return (
export default function VisaoGeral() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const notify = () => toast({ title: "Em desenvolvimento", description: "Esta funcionalidade será implementada em breve." });
    <OperatorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Visão Geral</h1>
          <p className="text-muted-foreground text-sm mt-1">Monitoramento de ativos e logística de suprimentos em tempo real.</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`h-7 w-7 rounded-full ${kpi.bgColor} flex items-center justify-center`}>
                        <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                    </div>
                    <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                  </div>
                  <div className="h-12 w-16 opacity-10">
                    <kpi.icon className="h-full w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Consumo de Toners</CardTitle>
                  <p className="text-xs text-muted-foreground">Últimos 30 dias por departamento</p>
                </div>
                <Select defaultValue="mar2024">
                  <SelectTrigger className="w-36 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mar2024">Março 2024</SelectItem>
                    <SelectItem value="fev2024">Fevereiro 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4 h-48 mt-4">
                {weeklyData.map((w) => (
                  <div key={w.week} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-primary rounded-t-md transition-all"
                      style={{ height: `${(w.value / 100) * 160}px` }}
                    />
                    <span className="text-[10px] text-muted-foreground uppercase">{w.week}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Alertas Recentes</CardTitle>
                <Badge variant="destructive" className="text-[9px]">URGENTE</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-1 rounded-full ${alert.color} shrink-0`} />
                  <div>
                    <p className="text-sm font-semibold">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.detail}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{alert.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-sm">
                Ver Todas Notificações
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Security Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Alertas de Segurança</CardTitle>
                <p className="text-xs text-muted-foreground">Registros de auditoria crítica e integridade do sistema.</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                Ver Log Completo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {securityAlerts.map((sa, i) => (
                <Card key={i}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={`text-[9px] ${sa.color} border-0`}>{sa.tag}</Badge>
                      <span className="text-[10px] text-muted-foreground">{sa.time}</span>
                    </div>
                    <p className="text-sm font-bold">{sa.title}</p>
                    <p className="text-xs text-muted-foreground">{sa.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SKU Status */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">Status dos Insumos por SKU</CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon"><Filter className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {skuItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Printer className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{item.sku}</p>
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.percent < 15 ? "bg-destructive" : "bg-primary"}`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-10 text-right">{item.percent}%</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{item.qty}</p>
                  <p className={`text-[10px] font-bold uppercase ${item.statusColor}`}>{item.status}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground py-2">
          © 2024 ERP Insumos. Todos os direitos reservados.
        </p>
      </div>
    </OperatorLayout>
  );
}
