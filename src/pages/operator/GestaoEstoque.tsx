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
import { PlusCircle, FileText, Pencil, Filter, CheckCircle, Clock, ArrowDownToLine } from "lucide-react";

const inventory = [
  { site: "Prédio Administrativo", papel: "1.200", toner: 45, status: "normal" },
  { site: "Unidade Logística Oeste", papel: "350", toner: 8, status: "critico" },
  { site: "Campus Educacional Leste", papel: "2.840", toner: 112, status: "normal" },
];

const replenishments = [
  { title: "+25 Toners", site: "Prédio Administrativo", time: "Hoje, 10:45 • Por: Admin", icon: CheckCircle },
  { title: "+100 Resmas A4", site: "Campus Leste", time: "Ontem, 16:30 • Por: Logística", icon: CheckCircle },
  { title: "Ajuste: -2 Unid.", site: "Unidade Oeste", time: "Ontem, 09:15 • Inventário", icon: Clock },
];

export default function GestaoEstoque() {
  const [localidade, setLocalidade] = useState("");
  const [insumo, setInsumo] = useState("");

  return (
    <OperatorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Estoque</h1>
          <p className="text-muted-foreground text-sm mt-1">Reposição direta de insumos por localidade e contrato.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reposição Direta */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">Reposição Direta</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Localidade / Site</Label>
                  <Select value={localidade} onValueChange={setLocalidade}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o destino..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pred-adm">Prédio Administrativo</SelectItem>
                      <SelectItem value="uni-oeste">Unidade Logística Oeste</SelectItem>
                      <SelectItem value="campus-leste">Campus Educacional Leste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Insumo</Label>
                  <Select value={insumo} onValueChange={setInsumo}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o item..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="papel-a4">Papel A4 75g</SelectItem>
                      <SelectItem value="toner-hp">Toner HP CF226X</SelectItem>
                      <SelectItem value="cilindro">Cilindro DR-313</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quantidade</Label>
                    <Input type="number" defaultValue={0} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Data</Label>
                    <Input type="date" className="mt-1" />
                  </div>
                </div>

                <Button className="w-full gap-2 mt-2">
                  <ArrowDownToLine className="h-4 w-4" />
                  Confirmar Entrada
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Global Cards */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estoque Global A4</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-bold">14.280</span>
                    <span className="text-sm text-muted-foreground">RESMAS</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estoque Global Toners</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl font-bold">842</span>
                    <span className="text-sm text-muted-foreground">UNID.</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Saldos por Localidade */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Saldos Atuais por Localidade</CardTitle>
                <Button variant="ghost" size="icon"><Filter className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px] uppercase">Site</TableHead>
                    <TableHead className="text-[10px] uppercase text-right">Papel</TableHead>
                    <TableHead className="text-[10px] uppercase text-right">Toner</TableHead>
                    <TableHead className="text-[10px] uppercase text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((inv, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm font-medium">{inv.site}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{inv.papel}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{inv.toner}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={inv.status === "critico" ? "destructive" : "default"}
                          className="text-[9px] uppercase"
                        >
                          {inv.status === "critico" ? "Crítico" : "Normal"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="link" className="w-full mt-2 text-primary text-sm">
                VER RELATÓRIO COMPLETO
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Histórico */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">Histórico de Reposições</CardTitle>
              <span className="text-xs text-muted-foreground">Últimos 7 dias</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {replenishments.map((rep, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <rep.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{rep.title}</p>
                    <p className="text-xs text-muted-foreground">{rep.site}</p>
                    <p className="text-[10px] text-muted-foreground">{rep.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <footer className="flex items-center justify-between text-xs text-muted-foreground py-4 border-t border-border">
          <span>© 2024 ERP Insumos. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <span>Termos de Uso</span>
            <span>Privacidade</span>
            <span>Suporte</span>
          </div>
        </footer>
      </div>
    </OperatorLayout>
  );
}
