import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, MapPin, Wrench, Package, Save } from "lucide-react";
import { Link } from "react-router-dom";

const sites = [
  { name: "Matriz Administrativa", location: "São Paulo - SP", checked: true },
  { name: "Unidade Logística", location: "Barueri - SP", checked: false },
  { name: "Filial Sul", location: "Curitiba - PR", checked: true },
  { name: "Escritório Central", location: "Rio de Janeiro - RJ", checked: false },
  { name: "Almoxarifado Leste", location: "São Paulo - SP", checked: false },
  { name: "Suporte Nordeste", location: "Recife - PE", checked: false },
];

const tiposInsumos = [
  { name: "Toner", icon: "🖨️", checked: true },
  { name: "Cilindro", icon: "🔄", checked: true },
  { name: "Papel", icon: "📄", checked: false },
];

export default function Permissoes() {
  const [siteChecks, setSiteChecks] = useState(sites.map((s) => s.checked));
  const [insumoChecks, setInsumoChecks] = useState(tiposInsumos.map((t) => t.checked));
  const [entradaEstoque, setEntradaEstoque] = useState(true);
  const [entradaPapel, setEntradaPapel] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl">
        {/* Top banner */}
        <div className="bg-primary text-primary-foreground text-center py-2 text-xs font-semibold uppercase tracking-widest rounded-lg">
          Portal de Controle Administrativo
        </div>

        {/* Back + Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link to="/usuarios" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            Usuários › <span className="text-primary font-medium">Permissões de Acesso</span>
          </div>
        </div>

        {/* User Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Ricardo Oliveira</h1>
            <p className="text-sm text-muted-foreground">Analista de Suporte Técnico • ID: #44829</p>
            <p className="text-xs text-muted-foreground italic mt-1">
              Alterações de permissões são registradas em auditoria e exclusivas para perfis Administradores
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        {/* Sites + Tipos */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sites */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Sites Autorizados</h3>
                    <p className="text-xs text-muted-foreground">
                      Defina em quais unidades este usuário possui visibilidade.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {sites.map((site, i) => (
                    <label
                      key={i}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        siteChecks[i]
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-accent"
                      }`}
                    >
                      <Checkbox
                        checked={siteChecks[i]}
                        onCheckedChange={(v) => {
                          const next = [...siteChecks];
                          next[i] = !!v;
                          setSiteChecks(next);
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium">{site.name}</p>
                        <p className="text-xs text-muted-foreground">{site.location}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tipos de Insumos */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Tipos de Insumos</h3>
                    <p className="text-xs text-muted-foreground">
                      Categorias de produtos autorizadas.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {tiposInsumos.map((tipo, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{tipo.icon}</span>
                        <span className="text-sm font-medium">{tipo.name}</span>
                      </div>
                      <Switch
                        checked={insumoChecks[i]}
                        onCheckedChange={(v) => {
                          const next = [...insumoChecks];
                          next[i] = v;
                          setInsumoChecks(next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações de Estoque */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Ações de Estoque</h3>
                  <p className="text-xs text-muted-foreground">
                    Controle operacional de entradas e saídas.
                  </p>
                </div>
              </div>
              <div className="flex-1 space-y-4 bg-surface-container-low rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pode dar entrada em estoque?</span>
                  <div className="flex items-center gap-2">
                    <Switch checked={entradaEstoque} onCheckedChange={setEntradaEstoque} />
                    <span className="text-sm font-medium text-primary">{entradaEstoque ? "Sim" : "Não"}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pode dar entrada de papel em estoque?</span>
                  <div className="flex items-center gap-2">
                    <Switch checked={entradaPapel} onCheckedChange={setEntradaPapel} />
                    <span className="text-sm text-muted-foreground">{entradaPapel ? "Sim" : "Não"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Relatórios de Inventário:</span>
                  <Badge className="bg-success text-success-foreground text-[10px]">Habilitado</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Banner */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-primary">Segurança de Acesso</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                Lembre-se que o acesso à Matriz Administrativa concede ao usuário privilégios de visualização global de relatórios.
                Certifique-se de que o nível de permissão condiz com as responsabilidades atuais do colaborador.
              </p>
            </div>
            <Button variant="outline" className="whitespace-nowrap">
              Ver Log de Alterações
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground py-4">
          © 2024 Portal Administrativo ERP - Gestão de Suprimentos Corporativos
        </p>
      </div>
    </AdminLayout>
  );
}
