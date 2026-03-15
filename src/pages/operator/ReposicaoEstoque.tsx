import { useState } from "react";
import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MapPin, Tag, Palette, Settings, FileText, Calculator, CalendarDays,
  PlusCircle, History, Info, CheckCircle,
} from "lucide-react";

const recentEntries = [
  { site: "Prédio Administrativo", ref: "#REQ-882", desc: "Toner Magenta HP-CF • +25 unid.", time: "Hoje, 10:45" },
  { site: "Unidade Logística Oeste", ref: "#REQ-879", desc: "Papel A4 Chambril • +100 resmas", time: "Ontem, 16:20" },
  { site: "Campus Educacional Leste", ref: "#REQ-875", desc: "Kit Cilindro Brother • +5 unid.", time: "22 Mai, 09:15" },
];

export default function ReposicaoEstoque() {
  const [tipoInsumo, setTipoInsumo] = useState("toner");
  const [qty, setQty] = useState(1);

  return (
    <OperatorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Reposição de Estoque</h1>
            <p className="text-muted-foreground">Registre a entrada de novos insumos por site ou contrato.</p>
          </div>
          <Button variant="outline" className="gap-2">
            <History className="h-4 w-4" />
            Histórico de Reposições
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Nova Entrada de Insumo</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Site */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Site / Localidade
                    </Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Selecione o local de destino" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pred-adm">Prédio Administrativo - Centro</SelectItem>
                        <SelectItem value="uni-oeste">Unidade Logística Oeste</SelectItem>
                        <SelectItem value="campus-leste">Campus Educacional Leste</SelectItem>
                        <SelectItem value="central">Central de Atendimento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* O.S. */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <Tag className="h-4 w-4" /> Número da O.S. / Referência
                    </Label>
                    <Input placeholder="Ex: REQ-2024-045" />
                  </div>

                  {/* Tipo */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Tipo de Insumo
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "toner", icon: Palette, label: "Toner" },
                        { value: "cilindro", icon: Settings, label: "Cilindro" },
                        { value: "papel", icon: FileText, label: "Papel" },
                      ].map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setTipoInsumo(t.value)}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                            tipoInsumo === t.value
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:bg-muted text-muted-foreground"
                          }`}
                        >
                          <t.icon className="h-5 w-5 mb-1" />
                          <span className="text-[10px] font-bold uppercase">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Item */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Item Específico
                    </Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hp258a">Toner HP CF258A (Preto)</SelectItem>
                        <SelectItem value="hp258x">Toner HP CF258X (Preto Alto Rend.)</SelectItem>
                        <SelectItem value="brother760">Toner Brother TN-760</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Qty */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <Calculator className="h-4 w-4" /> Quantidade para Entrada
                    </Label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" type="button" onClick={() => setQty(Math.max(0, qty - 1))}>-</Button>
                      <Input
                        type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))}
                        className="text-center text-lg font-bold"
                      />
                      <Button variant="outline" size="icon" type="button" onClick={() => setQty(qty + 1)}>+</Button>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> Data da Operação
                    </Label>
                    <Input type="date" defaultValue="2024-05-24" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button variant="ghost" type="reset">Cancelar</Button>
                  <Button className="gap-2">
                    <CheckCircle className="h-4 w-4" /> Confirmar Reposição
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Entries */}
            <Card>
              <div className="p-4 border-b border-border bg-muted/30">
                <h2 className="text-sm font-bold">Últimas Entradas</h2>
              </div>
              <div className="divide-y divide-border">
                {recentEntries.map((entry, i) => (
                  <div key={i} className="p-4 flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold">{entry.site}</span>
                      <span className="text-[10px] font-mono text-primary bg-primary/10 px-1.5 rounded">{entry.ref}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{entry.desc}</p>
                    <span className="text-[10px] text-muted-foreground">{entry.time}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-muted/20">
                <Button variant="link" className="w-full text-xs font-bold text-primary">Ver Histórico Completo</Button>
              </div>
            </Card>

            {/* Instructions */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <Info className="h-4 w-4" />
                  <span className="text-sm font-bold">Instruções de Reposição</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Certifique-se de selecionar o <b>site correto</b> antes de salvar. Entradas de estoque afetam o faturamento dos contratos vinculados ao local.
                </p>
                <ul className="text-[11px] text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Confira o lote no material físico</li>
                  <li>Anexe a O.S. se disponível</li>
                  <li>Verifique a validade dos toners</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </OperatorLayout>
  );
}
