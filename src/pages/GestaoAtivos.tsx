import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Search, MapPin, Pencil, Hash, Trash2, Plus, Filter, Download,
  BarChart3, RefreshCw, Wrench, Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const equipments = [
  {
    id: "99201", patrimonio: "#PAT-99201", modelo: "Ricoh MP 501", serie: "RJL00123984",
    cliente: "Logística Global S.A.", contrato: "CON-2023-012",
    localizacao: "Prédio Administrativo - Piso 2", contador: "124.582",
    history: [
      { icon: "sync", label: "Leitura de Contador", detail: "Hoje, 14:20 • 124.582 págs", color: "bg-primary" },
      { icon: "location", label: "Localização Atualizada", detail: "Ontem, 09:15 • Setor B → Piso 2", color: "bg-secondary" },
      { icon: "wrench", label: "Manutenção Preventiva", detail: "12 Jan 2024 • Técnico: Roberto", color: "bg-muted" },
    ],
  },
  {
    id: "99202", patrimonio: "#PAT-99202", modelo: "HP LaserJet Enterprise", serie: "CNB1K2L3M4",
    cliente: "Tech Solutions Ltda.", contrato: "CON-2023-045",
    localizacao: "Setor TI - Sala de Servidores", contador: "45.201",
    history: [],
  },
  {
    id: "99344", patrimonio: "#PAT-99344", modelo: "Canon imageRUNNER", serie: "DX-4825-99",
    cliente: "Ferreira & Associados", contrato: "CON-2024-001",
    localizacao: "Recepção Principal", contador: "8.420",
    history: [],
  },
];

type ModalType = "location" | "counters" | "remove" | null;

export default function GestaoAtivos() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEquip, setSelectedEquip] = useState(equipments[0]);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalEquipId, setModalEquipId] = useState("");

  // Modal form states
  const [newSite, setNewSite] = useState("");
  const [justification, setJustification] = useState("");
  const [counterT, setCounterT] = useState("");
  const [counterFV, setCounterFV] = useState("");

  const openModal = (type: ModalType, equipId: string) => {
    setModalType(type);
    setModalEquipId(equipId);
    setJustification("");
    setNewSite("");
    setCounterT("");
    setCounterFV("");
  };

  const handleConfirm = () => {
    const equip = equipments.find(e => e.id === modalEquipId);
    const actions: Record<string, string> = {
      location: `Localização de ${equip?.patrimonio} atualizada com sucesso.`,
      counters: `Numeradores de ${equip?.patrimonio} ajustados com sucesso.`,
      remove: `${equip?.patrimonio} removido da base operacional.`,
    };
    toast({ title: "Ação Concluída", description: actions[modalType!] });
    setModalType(null);
  };

  const filtered = equipments.filter(e =>
    e.patrimonio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.modelo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.serie.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Gestão de Ativos</h1>
            <p className="text-muted-foreground">Gerencie e monitore o status de todo o seu parque de equipamentos.</p>
          </div>
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-11 rounded-xl"
              placeholder="Buscar por patrimônio ou série..."
            />
          </div>
        </div>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
          {/* Table */}
          <Card className="xl:col-span-3">
            <CardHeader className="pb-2 bg-muted/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Equipamentos Cadastrados</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon"><Filter className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[11px] uppercase font-bold tracking-widest">Patrimônio</TableHead>
                    <TableHead className="text-[11px] uppercase font-bold tracking-widest">Modelo</TableHead>
                    <TableHead className="text-[11px] uppercase font-bold tracking-widest">Cliente / Contrato</TableHead>
                    <TableHead className="text-[11px] uppercase font-bold tracking-widest">Localização</TableHead>
                    <TableHead className="text-[11px] uppercase font-bold tracking-widest">Último Contador</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((equip) => (
                    <TableRow
                      key={equip.id}
                      className="cursor-pointer hover:bg-muted/30"
                      onClick={() => setSelectedEquip(equip)}
                    >
                      <TableCell>
                        <span className="font-mono text-xs font-bold bg-muted px-2 py-1 rounded text-primary">{equip.patrimonio}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">{equip.modelo}</span>
                          <span className="text-[11px] text-muted-foreground">Série: {equip.serie}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{equip.cliente}</span>
                          <span className="text-[11px] text-muted-foreground">{equip.contrato}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          {equip.localizacao}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-bold text-primary">{equip.contador}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost" size="icon"
                            className="hover:bg-primary/10 hover:text-primary"
                            title="Editar Localização"
                            onClick={() => openModal("location", equip.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost" size="icon"
                            className="hover:bg-primary/10 hover:text-primary"
                            title="Ajustar Numeradores"
                            onClick={() => openModal("counters", equip.id)}
                          >
                            <Hash className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost" size="icon"
                            className="hover:bg-destructive/10 text-destructive"
                            title="Remover"
                            onClick={() => openModal("remove", equip.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Right Detail Panel */}
          <div className="xl:col-span-1 space-y-6">
            {/* Selected Equipment Detail */}
            <Card className="overflow-hidden shadow-lg border-primary/10">
              <div className="h-32 bg-gradient-to-br from-primary to-primary/80 p-6 relative">
                <Badge className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white border-0 text-[10px] uppercase tracking-widest">
                  Ativo
                </Badge>
                <h4 className="text-primary-foreground font-bold text-lg mt-8">{selectedEquip.modelo}</h4>
                <p className="text-primary-foreground/70 text-xs">Patrimônio: {selectedEquip.patrimonio}</p>
              </div>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h5 className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-widest mb-3">Histórico Recente</h5>
                  <div className="space-y-4">
                    {(selectedEquip.history.length > 0 ? selectedEquip.history : [
                      { icon: "sync", label: "Sem registros recentes", detail: "—", color: "bg-muted" },
                    ]).map((h, i) => (
                      <div key={i} className="flex gap-3 relative">
                        {i < (selectedEquip.history.length || 1) - 1 && (
                          <div className="absolute left-[11px] top-6 bottom-0 w-[1px] bg-border" />
                        )}
                        <div className={`h-6 w-6 rounded-full ${h.color} flex items-center justify-center shrink-0`}>
                          {h.icon === "sync" && <RefreshCw className="h-3 w-3 text-primary-foreground" />}
                          {h.icon === "location" && <MapPin className="h-3 w-3 text-primary-foreground" />}
                          {h.icon === "wrench" && <Wrench className="h-3 w-3 text-muted-foreground" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold">{h.label}</p>
                          <p className="text-[10px] text-muted-foreground">{h.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <Button className="w-full gap-2">
                    <Eye className="h-4 w-4" /> Ver Detalhes Completos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-card rounded-xl">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Média Mensal</h4>
                    <p className="text-2xl font-black text-primary">12.4k</p>
                  </div>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary w-[75%] h-full rounded-full" />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 font-medium">Capacidade operacional: 75%</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAB */}
        <Button
          className="fixed bottom-8 right-8 h-14 px-6 rounded-full shadow-2xl gap-3 hover:scale-105 active:scale-95 transition-transform"
        >
          <Plus className="h-5 w-5" /> Novo Equipamento
        </Button>
      </div>

      {/* Modal: Edit Location */}
      <Dialog open={modalType === "location"} onOpenChange={() => setModalType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Localização</DialogTitle>
            <DialogDescription>Altere o site/local do equipamento {equipments.find(e => e.id === modalEquipId)?.patrimonio}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Novo Site / Localização</Label>
              <Select value={newSite} onValueChange={setNewSite}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pred-adm-p1">Prédio Administrativo - Piso 1</SelectItem>
                  <SelectItem value="pred-adm-p2">Prédio Administrativo - Piso 2</SelectItem>
                  <SelectItem value="setor-ti">Setor TI - Sala de Servidores</SelectItem>
                  <SelectItem value="recepcao">Recepção Principal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Justificativa</Label>
              <Textarea value={justification} onChange={(e) => setJustification(e.target.value)} placeholder="Motivo da alteração..." className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalType(null)}>Cancelar</Button>
            <Button onClick={handleConfirm}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Adjust Counters */}
      <Dialog open={modalType === "counters"} onOpenChange={() => setModalType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajustar Numeradores</DialogTitle>
            <DialogDescription>Ajuste manual dos contadores do equipamento {equipments.find(e => e.id === modalEquipId)?.patrimonio}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contador Total (T)</Label>
                <Input type="number" value={counterT} onChange={(e) => setCounterT(e.target.value)} className="mt-1" placeholder="0" />
              </div>
              <div>
                <Label>Contador FV</Label>
                <Input type="number" value={counterFV} onChange={(e) => setCounterFV(e.target.value)} className="mt-1" placeholder="0" />
              </div>
            </div>
            <div>
              <Label>Justificativa</Label>
              <Textarea value={justification} onChange={(e) => setJustification(e.target.value)} placeholder="Motivo do ajuste manual..." className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalType(null)}>Cancelar</Button>
            <Button onClick={handleConfirm}>Confirmar Ajuste</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Remove */}
      <Dialog open={modalType === "remove"} onOpenChange={() => setModalType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover Equipamento</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover {equipments.find(e => e.id === modalEquipId)?.patrimonio} da base operacional? Esta ação será registrada em auditoria.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label>Justificativa</Label>
            <Textarea value={justification} onChange={(e) => setJustification(e.target.value)} placeholder="Motivo da remoção..." className="mt-1" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalType(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleConfirm}>Remover Equipamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
