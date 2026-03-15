import { useState } from "react";
import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Printer, AlertTriangle, Lock, Minus, Plus, Package } from "lucide-react";

const tonerItems = [
  { name: "Toner HP CF360A (Black)", rendimento: "6.000 PÁGS", color: "bg-foreground", checked: false },
  { name: "Toner HP CF361A (Cyan)", rendimento: "5.000 PÁGS", color: "bg-cyan-500", checked: false },
  { name: "Toner HP CF363A (Magenta)", rendimento: "5.000 PÁGS", color: "bg-pink-500", checked: false },
  { name: "Toner HP CF362A (Yellow)", rendimento: "5.000 PÁGS", color: "bg-yellow-400", checked: false },
];

const cilindroItems = [
  { name: "Kit de Cilindro de Imagem HP", rendimento: "30.000 PÁGS", color: "bg-muted-foreground" },
];

export default function NovaSolicitacao() {
  const [patrimonio, setPatrimonio] = useState("ERP-22345");
  const [equipFound, setEquipFound] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [contadorT, setContadorT] = useState("50430");
  const [contadorFV, setContadorFV] = useState("1200");

  const getQty = (name: string) => quantities[name] || 1;
  const setQty = (name: string, v: number) => setQuantities((prev) => ({ ...prev, [name]: Math.max(0, v) }));

  const saldoEstimado = 1200;
  const limiteReposicao = 500;
  const consumoPercent = 24;
  const blocked = saldoEstimado > limiteReposicao;

  return (
    <OperatorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Nova Solicitação de Insumos</h1>
          <p className="text-muted-foreground text-sm mt-1">Inicie um novo pedido pesquisando o equipamento pelo seu identificador.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Search Equipment */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Localizar Equipamento</p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={patrimonio}
                      onChange={(e) => setPatrimonio(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" size="sm">ENTER</Button>
                </div>
                {equipFound && (
                  <p className="text-xs text-muted-foreground">
                    Resultado: <span className="text-primary font-medium">HP Color LaserJet Enterprise M553</span>
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Equipment Identified */}
            {equipFound && (
              <Card>
                <CardContent className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-3">Equipamento Identificado (Color)</p>
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Printer className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">HP Color LaserJet M553</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px]">Patrimônio: ERP-22345</Badge>
                        <Badge variant="outline" className="text-[10px]">Série: JPB2G03412</Badge>
                        <Badge className="text-[10px] bg-green-100 text-green-700 border-0">● ONLINE</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                        <div>
                          <p className="text-muted-foreground uppercase tracking-wider text-[10px]">Cliente / Faturamento</p>
                          <p className="font-semibold">Indústrias Metalúrgicas S.A.</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground uppercase tracking-wider text-[10px]">Localização / Unidade</p>
                          <p className="font-semibold">Escritório Central - TI</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Counter Readings */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">⚡</span>
                    <p className="text-[10px] font-bold uppercase tracking-wider">Leitura de Contadores</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] text-primary">⟳ Processando Regras</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Numerador Painel</Label>
                    <Input placeholder="Ex: 50200" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Contador Total (T) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      value={contadorT}
                      onChange={(e) => setContadorT(e.target.value)}
                      className="mt-1 border-primary text-primary font-bold"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Contador FV (FV) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      value={contadorFV}
                      onChange={(e) => setContadorFV(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Toner Selection */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  ⚙ Seleção de Itens (Toner Color)
                </p>
                <div className="space-y-2">
                  {tonerItems.map((item) => (
                    <div key={item.name} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <Checkbox />
                      <div className={`h-8 w-8 rounded-lg ${item.color} flex items-center justify-center`}>
                        <Package className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">RENDIMENTO: {item.rendimento}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setQty(item.name, getQty(item.name) - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-bold">{getQty(item.name)}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setQty(item.name, getQty(item.name) + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-4">
                  Cilindros de Imagem
                </p>
                {cilindroItems.map((item) => (
                  <div key={item.name} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <Checkbox />
                    <div className={`h-8 w-8 rounded-lg ${item.color} flex items-center justify-center`}>
                      <Package className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">RENDIMENTO: {item.rendimento}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Minus className="h-3 w-3" /></Button>
                      <span className="w-6 text-center text-sm font-bold">1</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Plus className="h-3 w-3" /></Button>
                    </div>
                  </div>
                ))}

                {/* Paper - Blocked */}
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-4">
                  Mídias e Papel
                </p>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                  <Checkbox disabled />
                  <div className="h-8 w-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                    <Package className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Papel A4 Alkaline 75g (Caixa)</p>
                    <p className="text-[10px] text-destructive font-medium">
                      <Badge variant="destructive" className="text-[9px] mr-1">BLOQUEADO</Badge>
                      Consumo 80% não atingido (Atual: {consumoPercent}%).
                    </p>
                  </div>
                  <div className="flex items-center gap-2 opacity-40">
                    <Button variant="ghost" size="icon" className="h-7 w-7" disabled><Minus className="h-3 w-3" /></Button>
                    <span className="w-6 text-center text-sm font-bold">0</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" disabled><Plus className="h-3 w-3" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Justification */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider">
                  Justificativa para Liberação Excepcional
                </p>
                <Textarea
                  placeholder="Caso o bloqueio de papel ou toners deva ser ignorado, descreva o motivo técnico..."
                  className="min-h-20"
                />
                <p className="text-[10px] text-muted-foreground italic">Sujeito à aprovação do gestor.</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* O.S. */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Nº O.S. / Chamado</Label>
                  <span className="text-[10px] text-destructive font-bold">* Obrigatório</span>
                </div>
                <Input placeholder="Ex: 2024-0988" className="mt-2" />
              </CardContent>
            </Card>

            {/* Motor de Regras */}
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="p-5 space-y-3">
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 text-destructive mx-auto" />
                  <p className="text-lg font-black text-destructive mt-1">BLOQUEADO</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Validação de Consumo</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  O item Papel foi suspenso. O cálculo aponta saldo remanescente superior a 500 folhas.
                </p>

                <div className="bg-card rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Regra de Cálculo</p>
                  </div>
                  <p className="text-xs font-mono font-bold">Saldo = T - (FV / 2)</p>
                </div>

                <div className="bg-destructive/10 rounded-lg p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-destructive font-bold">Saldo Estimado</p>
                  <p className="text-2xl font-black text-destructive">{saldoEstimado.toLocaleString()} <span className="text-sm">FLS</span></p>
                </div>

                <div className="bg-destructive/10 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Lock className="h-3 w-3 text-destructive" />
                    <p className="text-[10px] uppercase tracking-wider text-destructive font-bold">Limite Reposição</p>
                  </div>
                  <p className="text-sm font-bold">≤ {limiteReposicao} <span className="text-xs">FLS</span></p>
                </div>

                <p className="text-[10px] text-destructive italic">Baseado na Regra de Consumo 80% do Contrato.</p>
              </CardContent>
            </Card>

            {/* Consumo Status */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status do Consumo (Regra 80%)</p>
                <div>
                  <p className="text-xs text-muted-foreground">Uso de Papel</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-destructive">{consumoPercent}.0%</span>
                    <Badge variant="destructive" className="text-[9px]">INSUFICIENTE</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                    <div className="h-1.5 rounded-full bg-destructive" style={{ width: `${consumoPercent}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[10px] text-muted-foreground">•Meta para Liberação: 80%</p>
                    <p className="text-[10px] text-destructive font-bold">FALTAM 56%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Site Stock */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estoque em Site</p>
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="text-center mt-2">
                  <p className="text-3xl font-bold">10 resmas</p>
                  <p className="text-xs text-muted-foreground">/ 2 cx</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Button className="w-full gap-2" disabled={blocked}>
              <Lock className="h-4 w-4" />
              Confirmar Solicitação
            </Button>
            <Button variant="outline" className="w-full">
              Descartar Pedido
            </Button>
          </div>
        </div>

        <footer className="text-center text-xs text-muted-foreground py-4 border-t border-border">
          <strong>ERP Insumos</strong> • © 2024 Gestão de Suprimentos Inteligente.
        </footer>
      </div>
    </OperatorLayout>
  );
}
