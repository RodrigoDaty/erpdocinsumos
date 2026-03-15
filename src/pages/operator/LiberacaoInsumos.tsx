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
import {
  ShieldCheck, BarChart3, MapPin, ChevronRight, ArrowUpRight, Clock, User,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const releases = [
  { time: "Hoje, 14:22", site: "SP-Centro", user: "Analista SAC", insumo: "Toner Yellow HP", qty: "12", os: "OS-2024-912" },
  { time: "Hoje, 10:15", site: "RJ-Barra", user: "Analista SAC", insumo: "Papel Glossy 180g", qty: "25", os: "OS-2024-899" },
  { time: "Ontem, 16:45", site: "PR-Industrial", user: "Suporte Central", insumo: "Kit Limpeza Ind.", qty: "04", os: "OS-2024-845" },
];

const sites = [
  { code: "SP-01 Centro", items: "54 Itens em Estoque", status: "Estável", statusColor: "text-primary", barColor: "bg-primary" },
  { code: "RJ-04 Barra", items: "08 Itens em Estoque", status: "Crítico", statusColor: "text-destructive", barColor: "bg-destructive", border: true },
  { code: "RS-02 Porto Alegre", items: "122 Itens em Estoque", status: "Abastecido", statusColor: "text-secondary-foreground", barColor: "bg-secondary" },
];

export default function LiberacaoInsumos() {
  const { user } = useAuth();
  const [siteDestino, setSiteDestino] = useState("");
  const [insumo, setInsumo] = useState("");

  return (
    <OperatorLayout>
      <div className="space-y-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between border-b border-border pb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Liberação de Insumos</h1>
            <p className="text-muted-foreground mt-2 text-lg">Distribuição controlada por Site/Unidade Física</p>
          </div>
          <div className="bg-muted px-4 py-2 rounded-lg flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Status Global</p>
              <p className="text-sm font-bold text-primary">84% de Capacidade</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Form Card */}
            <Card className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-muted/50 p-8 border-r border-border">
                  <h3 className="text-xl font-bold mb-4">Configuração</h3>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                    Selecione o destino e defina a volumetria exata para liberação de estoque centralizado.
                  </p>
                  <div className="p-4 bg-card rounded-lg border-l-4 border-primary shadow-sm">
                    <p className="text-[10px] font-bold text-primary uppercase">Estoque Disponível</p>
                    <p className="text-2xl font-bold">14.2k <span className="text-xs font-normal text-muted-foreground">und</span></p>
                  </div>
                </div>
                <div className="flex-1 p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div>
                      <p className="text-[10px] font-bold text-primary uppercase mb-1">Operador Atual</p>
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <User className="h-4 w-4" /> {user?.name ?? "Analista SAC"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-primary uppercase mb-1">Data/Hora</p>
                      <p className="text-sm font-semibold">{new Date().toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wide mb-2 block">Selecione o Site de Destino</Label>
                    <Select value={siteDestino} onValueChange={setSiteDestino}>
                      <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sp01">Filial São Paulo - Centro (SP01)</SelectItem>
                        <SelectItem value="rj04">Filial Rio de Janeiro - Barra (RJ04)</SelectItem>
                        <SelectItem value="rs02">CD Extremo Sul - Porto Alegre (RS02)</SelectItem>
                        <SelectItem value="pr01">Unidade Curitiba - Industrial (PR01)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wide mb-2 block">Insumo (Item da Matriz)</Label>
                    <Select value={insumo} onValueChange={setInsumo}>
                      <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toner-m">Toner Magenta HP M553 High Yield (CF363X)</SelectItem>
                        <SelectItem value="papel-g">Papel Fotográfico Glossy A4 180g (CX-500)</SelectItem>
                        <SelectItem value="cilindro">Cilindro Imaging Drum Brother DR3400</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wide mb-2 block">Quantidade a Liberar</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wide mb-2 block">Número da O.S.</Label>
                      <Input placeholder="Ex: OS-2024-889" />
                    </div>
                  </div>

                  <Button className="w-full py-5 font-bold text-base gap-2 rounded-xl">
                    <ShieldCheck className="h-5 w-5" /> Liberar para Site
                  </Button>
                </div>
              </div>
            </Card>

            {/* Recent Releases */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Log de Liberações Recentes</h3>
                <Button variant="link" className="text-xs font-bold text-primary">Ver Histórico Completo</Button>
              </div>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest">Data/Hora</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest">Site Destino</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest">Usuário</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest">Insumo</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest">Qtd</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest">O.S.</TableHead>
                      <TableHead className="text-[10px] uppercase font-bold tracking-widest text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {releases.map((r, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-muted-foreground">{r.time}</TableCell>
                        <TableCell className="font-semibold">{r.site}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                              <User className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-xs font-medium">{r.user}</span>
                          </div>
                        </TableCell>
                        <TableCell>{r.insumo}</TableCell>
                        <TableCell className="font-mono font-bold">{r.qty}</TableCell>
                        <TableCell>
                          <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded">{r.os}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="default" className="text-[10px] uppercase">Efetuado</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Sites Monitor */}
            <Card className="bg-muted/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-bold">Monitor de Sites</CardTitle>
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {sites.map((s, i) => (
                  <div
                    key={i}
                    className={`bg-card p-4 rounded-lg flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow ${s.border ? "border border-destructive/20" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-10 ${s.barColor} rounded-full`} />
                      <div>
                        <p className="text-xs font-bold">{s.code}</p>
                        <p className="text-[10px] text-muted-foreground">{s.items}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <p className={`text-xs font-bold ${s.statusColor}`}>{s.status}</p>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bento Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary text-primary-foreground p-6 rounded-xl flex flex-col justify-between aspect-square">
                <ArrowUpRight className="h-5 w-5" />
                <div>
                  <p className="text-3xl font-black">452</p>
                  <p className="text-[10px] uppercase font-bold opacity-80">Liberações/Mês</p>
                </div>
              </div>
              <div className="bg-muted p-6 rounded-xl flex flex-col justify-between aspect-square">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-3xl font-black">14m</p>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Tempo Médio Processo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OperatorLayout>
  );
}
