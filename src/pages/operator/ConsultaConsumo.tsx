import { useState } from "react";
import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Search, Printer, MapPin, Settings, Download, ChevronLeft, ChevronRight } from "lucide-react";

const consumptionHistory = [
  {
    date: "12/10/2023", time: "14:22",
    insumo: "Toner Black TN-324K", sku: "SKU: KON-324-BK", color: "bg-foreground",
    total: "142.503", fv: "89.201", capacidade: "28.000 pág.",
    liberacao: "OVERRIDE MANUAL", liberacaoType: "warning",
    obs: "Solicitação antecipada para evento corporativo (Demanda extraordinária aprovada pela gerência).",
  },
  {
    date: "05/09/2023", time: "09:15",
    insumo: "Toner Cyan TN-324C", sku: "SKU: KON-324-CY", color: "bg-cyan-500",
    total: "131.420", fv: "81.102", capacidade: "26.000 pág.",
    liberacao: "AUTOMÁTICA", liberacaoType: "success",
    obs: "—",
  },
  {
    date: "18/07/2023", time: "16:45",
    insumo: "Cilindro de Imagem DR-313", sku: "SKU: KON-DR-313", color: "bg-primary",
    total: "118.990", fv: "72.450", capacidade: "120.000 pág.",
    liberacao: "AUTOMÁTICA", liberacaoType: "success",
    obs: "Manutenção preventiva programada.",
  },
];

export default function ConsultaConsumo() {
  const [patrimonio, setPatrimonio] = useState("PRT-9920-X");
  const [showEquip, setShowEquip] = useState(true);

  return (
    <OperatorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Consulta de Consumo</h1>
          <p className="text-muted-foreground text-sm mt-1">Análise detalhada de insumos por equipamento e histórico de solicitações.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Identificação do Equipamento</p>
              
              <div>
                <Label className="text-xs font-bold uppercase tracking-wider">Patrimônio ou Série</Label>
                <div className="flex gap-2 mt-1">
                  <div className="relative flex-1">
                    <Printer className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={patrimonio}
                      onChange={(e) => setPatrimonio(e.target.value)}
                      className="pl-9"
                      placeholder="PRT-9920-X"
                    />
                  </div>
                  <Button className="gap-2">
                    <Search className="h-4 w-4" />
                    Localizar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wider">Tipo de Insumo</Label>
                  <Select defaultValue="todos">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="toner">Toner</SelectItem>
                      <SelectItem value="cilindro">Cilindro</SelectItem>
                      <SelectItem value="papel">Papel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wider">Cor (CMYK)</Label>
                  <div className="flex gap-2 mt-2">
                    {[
                      { color: "bg-black", label: "K" },
                      { color: "bg-cyan-500", label: "C" },
                      { color: "bg-pink-500", label: "M" },
                      { color: "bg-yellow-400", label: "Y" },
                    ].map((c) => (
                      <button
                        key={c.label}
                        className={`h-8 w-8 rounded-full ${c.color} border-2 border-border hover:ring-2 ring-primary transition-all`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment Card */}
          {showEquip && (
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-5 space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider opacity-80">Equipamento Ativo</p>
                  <h3 className="text-lg font-bold">Konica Minolta C308</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 opacity-80" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider opacity-80">Localização</p>
                      <p className="text-sm font-medium">Andar 04 - Setor Financeiro</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-3.5 w-3.5 opacity-80" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider opacity-80">Status do Hardware</p>
                      <p className="text-sm font-medium flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-green-400" /> Operacional
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-primary-foreground/20">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-wider opacity-80">Saúde do Equipamento</p>
                    <span className="text-sm font-bold">92%</span>
                  </div>
                  <div className="w-full bg-primary-foreground/20 rounded-full h-1.5 mt-1">
                    <div className="h-1.5 rounded-full bg-primary-foreground" style={{ width: "92%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* History Table */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base font-bold">Histórico de Consumo e Solicitações</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="gap-2 text-xs text-primary">
                <Download className="h-3.5 w-3.5" />
                EXPORTAR
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] uppercase">Data Solicitação</TableHead>
                  <TableHead className="text-[10px] uppercase">Insumo & Modelo</TableHead>
                  <TableHead className="text-[10px] uppercase">Numerador (T / FV)</TableHead>
                  <TableHead className="text-[10px] uppercase">Capacidade</TableHead>
                  <TableHead className="text-[10px] uppercase">Liberação</TableHead>
                  <TableHead className="text-[10px] uppercase">Observações / Exceção</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consumptionHistory.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <p className="text-sm font-medium">{row.date}</p>
                      <p className="text-xs text-muted-foreground">{row.time}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-1 h-8 rounded-full ${row.color}`} />
                        <div>
                          <p className="text-sm font-bold">{row.insumo}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">{row.sku}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <div>
                          <p className="text-[9px] text-muted-foreground uppercase">Total</p>
                          <p className="text-sm font-mono">{row.total}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-muted-foreground uppercase">Frente</p>
                          <p className="text-sm font-mono">{row.fv}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{row.capacidade}</TableCell>
                    <TableCell>
                      <Badge
                        variant={row.liberacaoType === "warning" ? "destructive" : "default"}
                        className="text-[9px]"
                      >
                        {row.liberacaoType === "success" && "✅ "}
                        {row.liberacaoType === "warning" && "⚠️ "}
                        {row.liberacao}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {row.obs !== "—" ? (
                        <p className="text-xs text-muted-foreground max-w-48 border-l-2 border-destructive/30 pl-2">{row.obs}</p>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">Exibindo 3 de <strong>42</strong> registros</p>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                <Button size="icon" className="h-8 w-8">1</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">2</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">3</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </OperatorLayout>
  );
}
