import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, RefreshCw, Info, Calendar, User, FileSpreadsheet, MoreVertical } from "lucide-react";

const barData = [
  { month: "JAN", entrada: 60, saida: 40 },
  { month: "FEV", entrada: 80, saida: 55 },
  { month: "MAR", entrada: 45, saida: 30 },
  { month: "ABR", entrada: 95, saida: 70 },
  { month: "MAI", entrada: 75, saida: 50 },
  { month: "JUN", entrada: 85, saida: 65 },
];

const movements = [
  {
    insumo: "Toner HP CF226X", sku: "SKU: HP-226X-BLK", modelo: "HP M402 / Black", cor: "bg-foreground",
    site: "São Paulo - Central", data: "12/06/2024", hora: "14:32", operador: "Ricardo Alves",
    tipo: "Entrada", qty: "+ 120", saldo: 450, saldoPercent: 70,
  },
  {
    insumo: "Cilindro Lexmark MS811", sku: "SKU: LX-52D0-DRM", modelo: "Lexmark / Drum", cor: "bg-muted-foreground",
    site: "Rio de Janeiro - Un. Barra", data: "11/06/2024", hora: "09:15", operador: "Juliana Mendes",
    tipo: "Saída", qty: "- 15", saldo: 12, saldoPercent: 20,
  },
  {
    insumo: "Papel A4 Chamex 75g", sku: "SKU: PP-A4-75G", modelo: "Resma / Branco", cor: "bg-primary",
    site: "Curitiba - Hub Sul", data: "10/06/2024", hora: "16:45", operador: "Carlos Mendes",
    tipo: "Entrada", qty: "+ 500", saldo: 2100, saldoPercent: 85,
  },
];

export default function MovimentacaoEstoque() {
  return (
    <OperatorLayout>
      <div className="space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <span>Home</span>
          <span>›</span>
          <span className="text-primary">Relatórios Avançados</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Movimentação de Estoque</h1>
            <p className="text-muted-foreground text-sm mt-1">Inventário analítico consolidado e fluxo de insumos por site.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><FileSpreadsheet className="h-4 w-4" /> CSV</Button>
            <Button variant="outline" className="gap-2"><FileText className="h-4 w-4" /> PDF</Button>
            <Button className="gap-2"><RefreshCw className="h-4 w-4" /> Atualizar Dados</Button>
          </div>
        </div>

        {/* Chip Filters */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          <Badge variant="outline" className="gap-1 py-1.5 px-3 text-xs font-bold cursor-pointer">
            <Calendar className="h-3 w-3" /> Filtrar Data
          </Badge>
          <Badge variant="outline" className="gap-1 py-1.5 px-3 text-xs font-bold cursor-pointer">
            <User className="h-3 w-3" /> Selecionar Cliente
          </Badge>
          <Badge variant="outline" className="gap-1 py-1.5 px-3 text-xs font-bold cursor-pointer">
            <FileText className="h-3 w-3" /> Contrato
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="md:col-span-2">
            <CardContent className="p-5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Saldo Total Consolidado</p>
              <h2 className="text-3xl font-extrabold text-primary mt-2">14.820 <span className="text-lg font-medium text-muted-foreground">un</span></h2>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground bg-muted p-2.5 rounded-lg">
                <Info className="h-4 w-4 text-primary" />
                <span>Aumento de 12% em relação ao fechamento anterior.</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Entradas (Mês)</p>
              <h2 className="text-3xl font-extrabold mt-2">2.450</h2>
              <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[65%] rounded-full" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Saídas (Mês)</p>
              <h2 className="text-3xl font-extrabold mt-2">1.892</h2>
              <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[45%] rounded-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-base">Fluxo Mensal: Entradas vs Saídas</CardTitle>
                <p className="text-xs text-muted-foreground">Comparativo de volume de insumos por período de 6 meses.</p>
              </div>
              <div className="flex gap-4 items-center text-xs font-bold">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-primary" /><span>Entradas</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-muted-foreground/30" /><span>Saídas</span></div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-6 md:gap-10 px-4 border-b border-border">
              {barData.map((b) => (
                <div key={b.month} className="flex-1 flex items-end justify-center gap-1 relative">
                  <div className="w-full max-w-[20px] bg-primary rounded-t-sm" style={{ height: `${(b.entrada / 100) * 180}px` }} />
                  <div className="w-full max-w-[20px] bg-muted-foreground/30 rounded-t-sm" style={{ height: `${(b.saida / 100) * 180}px` }} />
                  <span className="absolute -bottom-5 text-[10px] font-bold text-muted-foreground">{b.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Detalhamento de Movimentações</CardTitle>
              <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                <Button variant="secondary" size="sm" className="text-xs h-7">Tudo</Button>
                <Button variant="ghost" size="sm" className="text-xs h-7">Entradas</Button>
                <Button variant="ghost" size="sm" className="text-xs h-7">Saídas</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Insumo / SKU</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Modelo / Cor</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Site Destino</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Data</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Operador</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Tipo</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Qtd</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((m, i) => (
                  <TableRow key={i} className="hover:bg-muted/30">
                    <TableCell>
                      <p className="text-sm font-bold">{m.insumo}</p>
                      <p className="text-[10px] text-muted-foreground">{m.sku}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${m.cor}`} />
                        <span className="text-xs font-medium">{m.modelo}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-medium">{m.site}</TableCell>
                    <TableCell>
                      <p className="text-xs font-medium">{m.data}</p>
                      <p className="text-[10px] text-muted-foreground">{m.hora}</p>
                    </TableCell>
                    <TableCell className="text-xs font-medium">{m.operador}</TableCell>
                    <TableCell>
                      <Badge variant={m.tipo === "Entrada" ? "default" : "secondary"} className="text-[10px]">
                        {m.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-sm font-bold ${m.tipo === "Saída" ? "text-destructive" : ""}`}>{m.qty}</TableCell>
                    <TableCell>
                      <p className="text-sm font-bold">{m.saldo}</p>
                      <div className="w-16 h-1 bg-muted rounded-full mt-1">
                        <div className={`h-full rounded-full ${m.saldoPercent < 25 ? "bg-destructive" : "bg-primary"}`} style={{ width: `${m.saldoPercent}%` }} />
                      </div>
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
