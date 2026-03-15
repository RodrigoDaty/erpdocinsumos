import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Download, Settings, Package, AlertTriangle, Printer, ChevronLeft, ChevronRight, Save, X } from "lucide-react";

const catalogItems = [
  { tipo: "Toner", modelo: "CE285A", marca: "HP Monochrome", capacidade: "1.600 pág.", printers: ["P1102", "M132", "+2"] },
  { tipo: "Cilindro", modelo: "DR-2340", marca: "Brother Unit", capacidade: "12.000 pág.", printers: ["L2320", "L25"] },
  { tipo: "Papel", modelo: "A4 75g", marca: "Sulfite Standard", capacidade: "500 fls.", printers: ["Universal"] },
  { tipo: "Toner", modelo: "W1103A", marca: "HP Neverstop", capacidade: "2.500 pág.", printers: ["NS", "120"] },
];

export default function Insumos() {
  const [tipoInsumo, setTipoInsumo] = useState("toner");
  const [rma, setRma] = useState([5]);
  const [page, setPage] = useState(1);
  const [linkedPrinters, setLinkedPrinters] = useState(["LaserJet P1102", "M132"]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Matriz de Insumos</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Gerencie e cadastre novos componentes de impressão para o seu catálogo de suprimentos.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Cadastro
            <Save className="h-3 w-3" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                Cadastro de Insumo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Tipo de Insumo
                </label>
                <Select value={tipoInsumo} onValueChange={setTipoInsumo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toner">Toner</SelectItem>
                    <SelectItem value="cilindro">Cilindro</SelectItem>
                    <SelectItem value="papel">Papel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Nome do Modelo
                </label>
                <Input placeholder="Ex: HP CE285A Black" className="bg-surface-container-low" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Cor</label>
                  <Input placeholder="Black / CMYK" className="bg-surface-container-low" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Capacidade (Pág)</label>
                  <Input placeholder="1600" type="number" className="bg-surface-container-low" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Limite RMA (%)</label>
                  <span className="text-sm font-semibold text-primary">{rma[0]}%</span>
                </div>
                <Slider value={rma} onValueChange={setRma} max={20} step={1} />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Vincular Impressoras
                </label>
                <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-dashed border-border bg-surface-container-low min-h-[48px]">
                  {linkedPrinters.map((p) => (
                    <Badge key={p} variant="secondary" className="gap-1">
                      {p}
                      <button onClick={() => setLinkedPrinters(linkedPrinters.filter((x) => x !== p))}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <button className="text-xs text-primary font-medium border border-dashed border-primary/30 rounded-full px-3 py-1 hover:bg-primary/5">
                    + Adicionar
                  </button>
                </div>
              </div>

              <Button className="w-full gap-2">
                <Save className="h-4 w-4" />
                Salvar Dados
              </Button>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  📋 Insumos Cadastrados
                </CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Capacidade</TableHead>
                    <TableHead>Impressoras Vinculadas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {catalogItems.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Badge
                          variant={item.tipo === "Toner" ? "default" : item.tipo === "Cilindro" ? "destructive" : "secondary"}
                          className="text-[10px] uppercase"
                        >
                          {item.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-sm">{item.modelo}</p>
                        <p className="text-xs text-muted-foreground">{item.marca}</p>
                      </TableCell>
                      <TableCell className="text-sm">{item.capacidade}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {item.printers.map((p, j) => (
                            <Badge key={j} variant="outline" className="text-[10px]">{p}</Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <p>Mostrando 1-4 de 28 insumos</p>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {[1, 2].map((p) => (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  ))}
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total no Catálogo</p>
                <p className="text-2xl font-bold">128</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">RMA Crítico</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Printer className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">Modelos Atendidos</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-xs text-muted-foreground py-2">
          © 2024 ERP Insumos. Chromatix Ledger Design System.
        </p>
      </div>
    </AdminLayout>
  );
}
