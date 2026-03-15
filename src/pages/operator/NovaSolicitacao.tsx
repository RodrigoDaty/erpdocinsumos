import { useState } from "react";
import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search, Printer, History, TrendingUp, TrendingDown, Flag, Lock, ShieldAlert,
  RefreshCw, FileText, AlertTriangle,
} from "lucide-react";

const tonerItems = [
  {
    name: "Toner HP CF360A (Black)", color: "bg-foreground", rendimento: "6.000",
    ultimoContador: "42.100", producaoReal: "8.330", checked: false, qty: 1,
  },
  {
    name: "Toner HP CF361A (Cyan)", color: "bg-cyan-500", rendimento: "5.000",
    ultimoContador: "45.000", producaoReal: "5.430", checked: false, qty: 1,
  },
];

function PaletteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="8" r="1.5" fill="currentColor" /><circle cx="8" cy="12" r="1.5" fill="currentColor" /><circle cx="16" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function NovaSolicitacao() {
  const [search, setSearch] = useState("ERP-22345");
  const [contadorT, setContadorT] = useState("50430");
  const [contadorFV, setContadorFV] = useState("1200");
  const [items, setItems] = useState(tonerItems);

  const toggleItem = (idx: number) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, checked: !it.checked } : it));
  };

  const updateQty = (idx: number, delta: number) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, qty: Math.max(0, it.qty + delta) } : it));
  };

  return (
    <OperatorLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        <header className="mb-2">
          <h1 className="text-4xl font-black tracking-tight mb-2">Nova Solicitação de Insumos</h1>
          <p className="text-muted-foreground font-medium text-lg">Inicie um novo pedido pesquisando o equipamento pelo seu identificador.</p>
        </header>

        {/* Search & O.S. */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-primary/5 rounded-2xl p-6 border-2 border-primary/20">
            <Label className="text-xs font-black uppercase tracking-widest text-primary mb-3 block">Localizar Equipamento</Label>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-14 pr-6 py-4 text-lg font-medium rounded-2xl border-2 border-primary/20 bg-card h-14"
                placeholder="Patrimônio ou Série..."
              />
            </div>
            <p className="mt-2 text-xs font-medium text-muted-foreground">
              Resultado: <span className="text-primary font-bold">HP Color LaserJet Enterprise M553</span>
            </p>
          </div>
          <Card className="rounded-2xl border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Nº O.S. / Chamado</Label>
                <span className="text-destructive font-black text-xs">* Obrigatório</span>
              </div>
              <Input className="text-lg font-bold h-14 rounded-xl" placeholder="Ex: 2024-0988" required />
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Equipment Info */}
            <Card className="rounded-2xl">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
                  <div className="flex items-start gap-5">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                      <Printer className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Equipamento Identificado (COLOR)</p>
                      <h2 className="text-3xl font-black tracking-tight mb-2">HP Color LaserJet M553</h2>
                      <div className="flex flex-wrap gap-4">
                        <span className="text-sm bg-muted px-3 py-1 rounded-lg font-bold text-muted-foreground">
                          Patrimônio: <span className="text-foreground">ERP-22345</span>
                        </span>
                        <span className="text-sm bg-muted px-3 py-1 rounded-lg font-bold text-muted-foreground">
                          Série: <span className="text-foreground">JPB2G03412</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-50 text-green-700 border-green-200 gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> ONLINE
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-border">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">Cliente / Faturamento</p>
                    <p className="text-xl font-bold">Indústrias Metalúrgicas S.A.</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">Localização / Unidade</p>
                    <p className="text-xl font-bold">Escritório Central - TI</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Counter Readings */}
            <Card className="rounded-2xl">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Leitura de Contadores
                  </h3>
                  <Badge variant="outline" className="text-[10px] gap-1 text-primary border-primary/20 bg-primary/5">
                    <RefreshCw className="h-3 w-3 animate-spin" /> PROCESSANDO REGRAS
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold">Numerador Painel</Label>
                    <Input type="number" placeholder="Ex: 50200" className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold">Contador Total (T)</Label>
                      <span className="text-destructive font-black">*</span>
                    </div>
                    <Input
                      type="number" value={contadorT} onChange={(e) => setContadorT(e.target.value)}
                      className="rounded-xl h-12 border-2 border-primary/20 font-mono font-bold text-primary text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold">Contador FV (FV)</Label>
                      <span className="text-destructive font-black">*</span>
                    </div>
                    <Input
                      type="number" value={contadorFV} onChange={(e) => setContadorFV(e.target.value)}
                      className="rounded-xl h-12 border-2 border-primary/20 font-mono font-bold text-primary text-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supply Items */}
            <Card className="rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 mb-8">
                  <FileText className="h-4 w-4" /> Seleção de Itens (Toner Color)
                </h3>
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <label key={idx} className="flex flex-col gap-4 p-5 rounded-2xl hover:bg-muted/30 transition-all border border-border cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          <Checkbox checked={item.checked} onCheckedChange={() => toggleItem(idx)} className="w-6 h-6" />
                          <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white`}>
                            <PaletteIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-black">{item.name}</p>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">Rendimento: {item.rendimento} págs</p>
                          </div>
                        </div>
                        <div className="flex items-center bg-muted rounded-lg p-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); updateQty(idx, -1); }}>-</Button>
                          <span className="w-8 text-center font-black">{item.qty}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.preventDefault(); updateQty(idx, 1); }}>+</Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                        <div className="flex items-center gap-2">
                          <History className="h-3.5 w-3.5" />
                          Contador Última Entrega: <span className="text-foreground">{item.ultimoContador}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3.5 w-3.5" />
                          Produção Real: <span className="text-primary">{item.producaoReal} págs</span>
                        </div>
                      </div>
                    </label>
                  ))}

                  {/* Paper - Blocked */}
                  <div className="pt-6 border-t border-border">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4">Mídias e Papel</h4>
                    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-destructive/5 ring-1 ring-destructive/20 border-l-[6px] border-destructive">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          <Checkbox disabled className="w-6 h-6" />
                          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <p className="font-black">Papel A4 Alkaline 75g (Caixa)</p>
                              <Badge variant="destructive" className="text-[8px] uppercase">Bloqueado</Badge>
                            </div>
                            <p className="text-[10px] text-destructive font-bold">Produção insuficiente para nova remessa.</p>
                          </div>
                        </div>
                        <div className="flex items-center bg-muted rounded-lg p-1 opacity-50">
                          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>-</Button>
                          <span className="w-8 text-center font-black">0</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>+</Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-destructive/10 text-[10px] font-bold uppercase tracking-wider text-destructive/80">
                        <div className="flex items-center gap-2">
                          <History className="h-3.5 w-3.5" /> Último Contador: <span className="text-foreground">49.200</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Flag className="h-3.5 w-3.5" /> Meta de Liberação: <span className="text-foreground">4.000 págs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingDown className="h-3.5 w-3.5" /> Produção Real: <span className="text-destructive font-black">1.230 págs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Justification */}
                <div className="mt-8 p-6 bg-muted/50 rounded-2xl border border-border">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 block">
                    Justificativa para Liberação Excepcional
                  </Label>
                  <Textarea
                    placeholder="Caso o bloqueio de papel ou toners deva ser ignorado, descreva o motivo técnico..."
                    className="min-h-[100px] rounded-xl"
                  />
                  <p className="mt-2 text-[10px] text-muted-foreground italic font-medium">Sujeito a aprovação do gestor via Workflow.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Rules Panel */}
            <Card className="bg-destructive text-destructive-foreground rounded-2xl shadow-2xl relative overflow-hidden">
              <CardContent className="p-8 relative z-10">
                <div className="absolute -right-6 -top-6 opacity-10">
                  <ShieldAlert className="h-40 w-40" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-8 border-b border-white/20 pb-4">Motor de Regras: Análise</h3>
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 p-2 rounded-xl">
                      <AlertTriangle className="h-8 w-8" />
                    </div>
                    <div>
                      <span className="text-3xl font-black tracking-tight block uppercase">Bloqueado</span>
                      <span className="text-[10px] font-bold uppercase opacity-80">Validação de Consumo</span>
                    </div>
                  </div>
                  <p className="text-sm opacity-95 leading-relaxed font-semibold">
                    O item Papel foi suspenso. O cálculo aponta saldo remanescente superior ao limite contratual para reposição.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-black/10 p-4 rounded-xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="opacity-70 font-bold uppercase">Regra de Cálculo</span>
                      <span className="font-mono font-bold">Saldo = T - (FV / 2)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl border border-white/20">
                    <span className="text-xs font-bold uppercase">Saldo Estimado</span>
                    <span className="text-xl font-black">1.200 <span className="text-xs opacity-70 uppercase">FLS</span></span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black/20 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4" />
                      <span className="text-xs font-black uppercase">Limite Reposição</span>
                    </div>
                    <span className="font-black text-lg">≤ 500 <span className="text-xs opacity-70 uppercase">FLS</span></span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-[11px] font-medium italic">Baseado na Regra de Consumo 80% do Contrato.</p>
                </div>
              </CardContent>
            </Card>

            {/* Consumption Metrics */}
            <Card className="rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-8">Status do Consumo (Regra 80%)</h3>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <div>
                        <span className="block text-xs font-black text-muted-foreground uppercase">Produção Real (Papel)</span>
                        <span className="text-3xl font-black text-destructive">30.7%</span>
                      </div>
                      <Badge variant="destructive" className="text-[10px] uppercase">Abaixo da Meta</Badge>
                    </div>
                    <div className="h-4 w-full bg-muted rounded-full overflow-hidden p-1 border border-border">
                      <div className="h-full bg-destructive rounded-full" style={{ width: "30.7%" }} />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-[10px] text-muted-foreground font-bold italic">*Meta de Liberação: 80%</p>
                      <span className="text-xs font-black text-destructive uppercase">Faltam 1.970 págs</span>
                    </div>
                  </div>
                  <div className="p-5 bg-primary/5 rounded-2xl border-2 border-primary/10">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">Estoque Estimado em Site</p>
                    </div>
                    <p className="text-2xl font-black">10 resmas <span className="text-sm font-bold text-muted-foreground">/ 2 cx</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <Button disabled className="w-full py-6 rounded-2xl font-black text-base gap-3" variant="secondary">
                <Lock className="h-5 w-5" /> CONFIRMAR SOLICITAÇÃO
              </Button>
              <Button variant="outline" className="w-full py-6 rounded-2xl font-black text-base uppercase border-2">
                Descartar Pedido
              </Button>
            </div>
          </div>
        </div>
      </div>
    </OperatorLayout>
  );
}
