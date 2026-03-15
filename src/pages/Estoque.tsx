import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Settings, Plus, FileText, AlertCircle, ArrowDownToLine, RefreshCw, Save } from "lucide-react";

const stockSummary = [
  { label: "Papel A4 / A3", value: "14.280", unit: "resmas", icon: "📄", percent: 85, status: "Estoque saudável", min: "5.000" },
  { label: "Toners & Tintas", value: "842", unit: "unid.", icon: "🖨️", percent: 45, status: "Nível de atenção (45%)", min: "600" },
  { label: "Cilindros & Peças", value: "156", unit: "unid.", icon: "⚙️", percent: 20, status: "Abaixo do mínimo de segurança", min: "200", critical: true },
];

const inventory = [
  { site: "Prédio Administrativo - Centro", code: "#2024-001", city: "São Paulo, SP", papel: 1200, minPapel: 500, toner: 45, minToner: 20, status: "normal" },
  { site: "Unidade Logística Oeste", code: "#2024-005", city: "Osasco, SP", papel: 350, minPapel: 400, toner: 8, minToner: 15, status: "critico" },
  { site: "Campus Educacional Leste", code: "#2023-088", city: "Mogi das Cruzes, SP", papel: 2840, minPapel: 1000, toner: 112, minToner: 50, status: "normal" },
  { site: "Central de Atendimento", code: "#2024-012", city: "Sorocaba, SP", papel: 50, minPapel: 200, toner: 3, minToner: 10, status: "critico" },
];

const alerts = [
  { type: "critico", title: "Nível Crítico", tag: "AGORA", detail: "Site Sorocaba atingiu saldo de 50 resmas (Mínimo: 200)", action: "Gerar Reposição" },
  { type: "entrada", title: "Entrada de Estoque", tag: "ENTRADA", detail: "Lote #9921 - Toner Magenta HP-CF\n+25 unidades • Hoje, 10:45", action: null },
  { type: "consumo", title: "Baixa Automática", tag: "CONSUMO", detail: "Relatório Site Sorocaba - Toner K\n-1 unidade • Hoje, 09:12", action: null },
];

export default function Estoque() {
  const [showCritical, setShowCritical] = useState(false);
  const [clientFilter, setClientFilter] = useState("all");

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Estoque Virtual</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Gestão centralizada de insumos e monitoramento de níveis mínimos.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Configurar Alertas
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Entrada de Estoque
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stockSummary.map((item) => (
            <Card key={item.label} className={item.critical ? "border-destructive" : ""}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-3xl font-bold ${item.critical ? "text-destructive" : ""}`}>{item.value}</span>
                  <span className="text-sm text-muted-foreground">{item.unit}</span>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${item.critical ? "bg-destructive" : item.percent < 50 ? "bg-primary" : "bg-primary"}`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-muted-foreground">{item.status}</span>
                    <Badge variant={item.critical ? "destructive" : "outline"} className="text-[10px]">
                      Min: {item.min}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Todos os Clientes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Clientes</SelectItem>
              <SelectItem value="sp">São Paulo</SelectItem>
              <SelectItem value="rj">Rio de Janeiro</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">Tipo de Item</Button>
          <Button variant="ghost" size="sm" className="text-primary ml-auto">Limpar Filtros</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table */}
          <Card className="lg:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Inventário Detalhado por Localidade</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Mostrar apenas críticos:</span>
                  <Switch checked={showCritical} onCheckedChange={setShowCritical} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Site / Localidade</TableHead>
                    <TableHead className="text-center">Saldo Papel</TableHead>
                    <TableHead className="text-center">Min. Papel</TableHead>
                    <TableHead className="text-center">Saldo Toner</TableHead>
                    <TableHead className="text-center">Min. Toner</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory
                    .filter((inv) => !showCritical || inv.status === "critico")
                    .map((inv, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <p className="font-medium text-sm">{inv.site}</p>
                          <p className="text-xs text-muted-foreground">{inv.code} • {inv.city}</p>
                        </TableCell>
                        <TableCell className={`text-center font-medium ${inv.papel < inv.minPapel ? "text-destructive" : ""}`}>
                          {inv.papel.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <Input defaultValue={inv.minPapel} className="w-16 h-8 text-center mx-auto" />
                        </TableCell>
                        <TableCell className={`text-center font-medium ${inv.toner < inv.minToner ? "text-destructive" : ""}`}>
                          {inv.toner}
                        </TableCell>
                        <TableCell className="text-center">
                          <Input defaultValue={inv.minToner} className="w-16 h-8 text-center mx-auto" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={inv.status === "critico" ? "destructive" : "default"} className="text-[10px] uppercase">
                            {inv.status === "critico" ? "Crítico" : "Normal"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <div className="flex justify-center mt-4">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações de Mínimos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Alertas de Estoque</h3>
            {alerts.map((alert, i) => (
              <Card key={i} className={alert.type === "critico" ? "border-destructive" : ""}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {alert.type === "critico" ? (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      ) : alert.type === "entrada" ? (
                        <ArrowDownToLine className="h-4 w-4 text-success" />
                      ) : (
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm font-semibold">{alert.title}</span>
                    </div>
                    <Badge
                      variant={alert.type === "critico" ? "destructive" : "outline"}
                      className="text-[9px]"
                    >
                      {alert.tag}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-pre-line">{alert.detail}</p>
                  {alert.action && (
                    <Button variant="link" size="sm" className="p-0 h-auto text-primary text-xs">
                      {alert.action}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="w-full text-sm">
              Ver Log Completo
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground py-2">
          © 2024 ERP Insumos. Gestão de Suprimentos Corporativos.
        </p>
      </div>
    </AdminLayout>
  );
}
