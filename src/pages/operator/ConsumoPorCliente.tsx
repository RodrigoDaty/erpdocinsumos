import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, RefreshCw, FileSpreadsheet, CheckCircle, AlertTriangle, Info } from "lucide-react";

const barData = [
  { month: "JAN", toner: 60, papel: 80 },
  { month: "FEV", toner: 45, papel: 65 },
  { month: "MAR", toner: 75, papel: 90 },
  { month: "ABR", toner: 30, papel: 50 },
  { month: "MAI", toner: 85, papel: 75 },
  { month: "JUN", toner: 55, papel: 40 },
];

const clients = [
  {
    initials: "BC", color: "bg-primary/10 text-primary",
    name: "Banco Central Sul", site: "Sede Porto Alegre", equip: "Bizhub C360i",
    insumo: "Toner Magenta", data: "12 Out 2024", uso: 82, status: "Dentro da Meta", statusOk: true,
  },
  {
    initials: "LA", color: "bg-secondary/10 text-secondary-foreground",
    name: "Logística Avançada", site: "CD Guarulhos", equip: "HP LaserJet 600",
    insumo: "Toner Black XL", data: "08 Out 2024", uso: 58, status: "Exceção", statusOk: false,
  },
  {
    initials: "AM", color: "bg-primary/10 text-primary",
    name: "Advocacia Martins", site: "Escritório Central", equip: "Kyocera Ecosys",
    insumo: "Papel A4 75g", data: "15 Out 2024", uso: 94, status: "Dentro da Meta", statusOk: true,
  },
];

export default function ConsumoPorCliente() {
  return (
    <OperatorLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Consumo por Cliente</h1>
            <p className="text-muted-foreground text-sm mt-1">Relatório analítico detalhado de suprimentos e produtividade.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2"><FileText className="h-4 w-4" /> PDF</Button>
            <Button variant="outline" className="gap-2"><FileSpreadsheet className="h-4 w-4" /> Excel</Button>
            <Button className="gap-2"><RefreshCw className="h-4 w-4" /> Atualizar</Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-2">
                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Cliente</p>
                <Select defaultValue="all"><SelectTrigger className="h-8 text-sm border-0 p-0"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Clientes</SelectItem>
                    <SelectItem value="bc">Banco Central Sul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-2 border-l">
                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Contrato</p>
                <Select defaultValue="mps"><SelectTrigger className="h-8 text-sm border-0 p-0"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mps">Managed Print Services</SelectItem>
                    <SelectItem value="loc">Locação Pura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-2 border-l">
                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Período</p>
                <Select defaultValue="30d"><SelectTrigger className="h-8 text-sm border-0 p-0"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30d">Últimos 30 dias</SelectItem>
                    <SelectItem value="trim">Trimestre Atual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-center">
                <Button variant="secondary" className="w-full gap-2 text-sm">Filtrar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <FileText className="h-7 w-7 text-primary mb-3" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Papel Entregue</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-extrabold">14.280</h3>
                <span className="text-sm text-muted-foreground mb-1">resmas</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Download className="h-7 w-7 text-primary mb-3" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total de Toners</p>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl font-extrabold">342</h3>
                <span className="text-sm text-muted-foreground mb-1">unidades</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Média de Eficiência</p>
              <h3 className="text-4xl font-extrabold">84.2%</h3>
              <div className="mt-3 bg-white/10 p-2.5 rounded-xl">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Regra de 80%</span>
                  <span>Acima da Meta</span>
                </div>
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full" style={{ width: "84%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Consumo Mensal de Insumos</CardTitle>
              <div className="flex gap-4">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary" /><span className="text-xs">Toners</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-secondary" /><span className="text-xs">Papel</span></div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-4 px-4 border-b border-border">
              {barData.map((b) => (
                <div key={b.month} className="w-full flex flex-col items-center gap-1">
                  <div className="w-full flex gap-1 justify-center items-end h-40">
                    <div className="w-4 bg-primary rounded-t-sm" style={{ height: `${b.toner}%` }} />
                    <div className="w-4 bg-secondary rounded-t-sm" style={{ height: `${b.papel}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground mt-1">{b.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Client Detail Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Detalhamento por Cliente</CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground text-sm bg-muted px-3 py-1.5 rounded-lg">
                <Info className="h-4 w-4" />
                Regra de Eficiência baseada em 80% de uso esperado.
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Cliente</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Site</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Equipamento</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Insumo</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Data Entrega</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-center">Uso %</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Status Regra</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((c, i) => (
                  <TableRow key={i} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${c.color} flex items-center justify-center text-xs font-bold`}>{c.initials}</div>
                        <span className="text-sm font-semibold">{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.site}</TableCell>
                    <TableCell className="text-sm font-medium">{c.equip}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px]">{c.insumo}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.data}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <span className={`text-sm font-bold ${c.uso < 70 ? "text-destructive" : ""}`}>{c.uso}%</span>
                        <div className="w-12 bg-muted h-1 rounded-full">
                          <div className={`h-full rounded-full ${c.uso < 70 ? "bg-destructive" : "bg-primary"}`} style={{ width: `${c.uso}%` }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {c.statusOk ? (
                        <Badge className="gap-1 bg-primary/10 text-primary border-0 text-[10px]">
                          <CheckCircle className="h-3 w-3" /> {c.status}
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1 text-[10px]">
                          <AlertTriangle className="h-3 w-3" /> {c.status}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </OperatorLayout>
  );
}
