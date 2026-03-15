import { OperatorLayout } from "@/components/layout/OperatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ban, Download, Share2, User, ChevronLeft, ChevronRight } from "lucide-react";

const exceptions = [
  {
    protocol: "#PR-2024-0982",
    client: "Gráfica Imperial",
    site: "Unidade São Paulo - SP",
    material: "Toner Magenta High Capacity",
    sku: "SKU: TN-542M-HC",
    justificativa: "Pedido crítico para fechamento de campanha eleitoral. Aprovação autorizada pelo VP.",
    aprovador: "Marcos Andrade",
    data: "24 Out 2024, 14:32",
  },
  {
    protocol: "#PR-2024-0975",
    client: "Indústrias Solnas",
    site: "Centro de Distribuição Curitiba",
    material: "Kit Limpeza Drum Unit B2",
    sku: "SKU: KL-D-8891",
    justificativa: "Troca preventiva devido a falhas na impressão de faturas de exportação.",
    aprovador: "Ana Julia Silva",
    data: "23 Out 2024, 09:15",
  },
  {
    protocol: "#PR-2024-0961",
    client: "Universidade Regional",
    site: "Campus Universitário Norte",
    material: "Papel Fotográfico A3 Glossy",
    sku: "SKU: PP-GL-A3-100",
    justificativa: "Erro de cálculo do sistema no estoque mínimo; material fisicamente indisponível na unidade.",
    aprovador: "Carlos Eduardo",
    data: "21 Out 2024, 16:50",
  },
  {
    protocol: "#PR-2024-0958",
    client: "Serviços Prime S/A",
    site: "Matriz Belo Horizonte",
    material: "Cilindro de Imagem Black K2",
    sku: "SKU: CI-BK-K2-00",
    justificativa: "Aparelho alugado com manutenção preventiva atrasada por fornecedor externo.",
    aprovador: "Marcos Andrade",
    data: "20 Out 2024, 11:22",
  },
];

export default function RelatorioExcecoes() {
  return (
    <OperatorLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Justificativas e Exceções</h1>
            <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
              Análise detalhada de solicitações aprovadas manualmente via override, ignorando o status de bloqueio calculado pelo sistema.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" /> Compartilhar
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" /> Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Filters + Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="md:col-span-3">
            <CardContent className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Filtros Avançados</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1.5 ml-1">Motivo do Override</p>
                  <Select defaultValue="todos">
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Motivos</SelectItem>
                      <SelectItem value="urgencia">Urgência de Produção</SelectItem>
                      <SelectItem value="falha">Falha de Inventário</SelectItem>
                      <SelectItem value="teste">Teste de Equipamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1.5 ml-1">Período</p>
                  <Select defaultValue="out">
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="out">01/10/2024 - 31/10/2024</SelectItem>
                      <SelectItem value="set">01/09/2024 - 30/09/2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1.5 ml-1">Aprovado Por</p>
                  <Select defaultValue="qualquer">
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qualquer">Qualquer Aprovador</SelectItem>
                      <SelectItem value="admin">Administrador Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Total de Exceções</p>
                <h2 className="text-4xl font-bold mt-1">124</h2>
              </div>
              <div className="flex items-center gap-2 text-sm mt-3">
                <Badge className="bg-white/20 border-0 text-primary-foreground">+12%</Badge>
                <span className="opacity-80">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Protocolo</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Cliente / Site</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Material</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Status</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Justificativa</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest">Aprovado Por</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest text-right">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exceptions.map((item) => (
                  <TableRow key={item.protocol} className="hover:bg-muted/30">
                    <TableCell className="text-sm font-semibold text-primary">{item.protocol}</TableCell>
                    <TableCell>
                      <p className="text-sm font-semibold">{item.client}</p>
                      <p className="text-[10px] text-muted-foreground">{item.site}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-0.5 h-8 rounded-full bg-primary/20" />
                        <div>
                          <p className="text-sm font-medium">{item.material}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">{item.sku}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive" className="gap-1 text-[10px]">
                        <Ban className="h-3 w-3" /> Bloqueado
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.justificativa}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-3 w-3" />
                        </div>
                        <span className="text-sm font-medium">{item.aprovador}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground tabular-nums">{item.data}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Mostrando 4 de 124 registros</span>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                <Button size="sm" className="h-8 w-8 p-0">1</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
                <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </OperatorLayout>
  );
}
