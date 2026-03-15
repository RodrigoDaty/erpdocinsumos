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
import { CheckCircle, Clock, ChevronRight, BarChart3, RefreshCw } from "lucide-react";

const sites = [
  { code: "SP-01 Centro", items: "54 Itens em Estoque", status: "Estável", statusColor: "text-primary" },
  { code: "RJ-04 Barra", items: "08 Itens em Estoque", status: "Crítico", statusColor: "text-destructive" },
  { code: "RS-02 Porto Alegre", items: "122 Itens em Estoque", status: "Abastecido", statusColor: "text-muted-foreground" },
];

const recentReleases = [
  { date: "Hoje, 14:22", site: "SP-Centro", insumo: "Toner Yellow HP", qty: 12, os: "OS-2024-912", status: "EFETUADO" },
  { date: "Hoje, 10:15", site: "RJ-Barra", insumo: "Papel Glossy 180g", qty: 25, os: "OS-2024-899", status: "EFETUADO" },
  { date: "Ontem, 16:45", site: "PR-Industrial", insumo: "Kit Limpeza Ind.", qty: 4, os: "OS-2024-845", status: "EFETUADO" },
];

export default function LiberacaoInsumos() {
  return (
    <OperatorLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Liberação de Insumos</h1>
            <p className="text-muted-foreground text-sm mt-1">Distribuição controlada por Site/Unidade Física</p>
          </div>
          <Card className="px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status Global</p>
                <p className="text-sm font-bold text-primary">84% de Capacidade</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Config Form */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-bold">Configuração</h2>
                  <p className="text-xs text-muted-foreground">
                    Selecione o destino e defina a volumetria exata para liberação de estoque centralizado.
                  </p>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Estoque Disponível</p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-bold text-primary">14.2k</span>
                        <span className="text-sm text-muted-foreground">und</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Selecione o Site de Destino</Label>
                    <Select defaultValue="sp01">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sp01">Filial São Paulo - Centro (SP01)</SelectItem>
                        <SelectItem value="rj04">Filial Rio de Janeiro - Barra (RJ04)</SelectItem>
                        <SelectItem value="rs02">Filial Porto Alegre (RS02)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Insumo (Item da Matriz)</Label>
                    <Select defaultValue="toner-mag">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toner-mag">Toner Magenta HP M553 High Yield (CF363X)</SelectItem>
                        <SelectItem value="toner-cyn">Toner Cyan HP M553 High Yield (CF361X)</SelectItem>
                        <SelectItem value="papel-a4">Papel A4 Alkaline 75g</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Quantidade a Liberar</Label>
                      <Input type="number" defaultValue={0} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Número da O.S.</Label>
                      <Input placeholder="Ex: OS-2024-889" className="mt-1" />
                    </div>
                  </div>

                  <Button className="w-full gap-2 mt-2">
                    <CheckCircle className="h-4 w-4" />
                    Liberar para Site
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monitor de Sites */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold">Monitor de Sites</CardTitle>
                  <Button variant="ghost" size="icon"><RefreshCw className="h-4 w-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {sites.map((site, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                    <div className={`w-1 h-8 rounded-full ${site.statusColor === "text-destructive" ? "bg-destructive" : "bg-primary"}`} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{site.code}</p>
                      <p className="text-[10px] text-muted-foreground">{site.items}</p>
                    </div>
                    <span className={`text-xs font-semibold ${site.statusColor}`}>{site.status}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-4 text-center">
                  <RefreshCw className="h-5 w-5 mx-auto mb-2 opacity-80" />
                  <p className="text-2xl font-bold">452</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-80">Liberações/Mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">14m</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tempo Médio Processo</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Log de Liberações */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Log de Liberações Recentes</CardTitle>
              <Button variant="link" className="text-primary text-xs p-0 h-auto">Ver Histórico Completo</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] uppercase">Data/Hora</TableHead>
                  <TableHead className="text-[10px] uppercase">Site Destino</TableHead>
                  <TableHead className="text-[10px] uppercase">Insumo</TableHead>
                  <TableHead className="text-[10px] uppercase text-center">Qtd</TableHead>
                  <TableHead className="text-[10px] uppercase">O.S.</TableHead>
                  <TableHead className="text-[10px] uppercase text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReleases.map((rel, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm">{rel.date}</TableCell>
                    <TableCell className="text-sm font-bold">{rel.site}</TableCell>
                    <TableCell className="text-sm">{rel.insumo}</TableCell>
                    <TableCell className="text-center font-bold">{rel.qty}</TableCell>
                    <TableCell className="font-mono text-sm">{rel.os}</TableCell>
                    <TableCell className="text-center">
                      <Badge className="text-[9px] uppercase">{rel.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <footer className="text-center text-xs text-muted-foreground py-4 border-t border-border uppercase tracking-wider">
          © 2024 ERP Insumos. Chromatix Ledger Design System.
        </footer>
      </div>
    </OperatorLayout>
  );
}
