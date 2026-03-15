import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  FileText,
  MapPin,
  Printer,
  Package,
  ClipboardList,
  BarChart3,
  Shield,
  Bell,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  Plus,
  ChevronDown,
  AlertTriangle,
  CalendarCheck,
  ArrowLeftRight,
  UserCheck,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const reportSubItems = [
  { icon: BarChart3, label: "Consumo Geral", path: "/op/relatorios" },
  { icon: RotateCcw, label: "Gestão de RMAs", path: "/op/relatorios/rmas" },
  { icon: AlertTriangle, label: "Exceções", path: "/op/relatorios/excecoes" },
  { icon: CalendarCheck, label: "Fechamento Mensal", path: "/op/relatorios/fechamento" },
  { icon: ArrowLeftRight, label: "Movimentação", path: "/op/relatorios/movimentacao" },
  { icon: UserCheck, label: "Consumo por Cliente", path: "/op/relatorios/consumo-cliente" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Visão Geral", path: "/op/visao-geral" },
  { icon: Users, label: "Clientes", path: "/op/clientes" },
  { icon: FileText, label: "Contratos", path: "/op/contratos" },
  { icon: MapPin, label: "Sites", path: "/op/sites" },
  { icon: Printer, label: "Equipamentos", path: "/op/equipamentos" },
  { icon: Package, label: "Estoque", path: "/op/estoque" },
  { icon: ClipboardList, label: "Solicitações", path: "/op/solicitacoes" },
  { icon: Shield, label: "Permissões", path: "/op/permissoes-op" },
];

export function OperatorLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(location.pathname.startsWith("/op/relatorios"));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-56 bg-card border-r border-border flex flex-col transition-transform duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-5 flex items-center gap-3 border-b border-border">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Printer className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-primary">ERP Insumos</h1>
          </div>
          <button className="lg:hidden ml-auto" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {item.label}
              </Link>
            );
          })}

          {/* Reports expandable section */}
          <button
            onClick={() => setReportsOpen(!reportsOpen)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full",
              location.pathname.startsWith("/op/relatorios")
                ? "text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <BarChart3 className="h-[18px] w-[18px]" />
            Relatórios
            <ChevronDown className={cn("h-4 w-4 ml-auto transition-transform", reportsOpen && "rotate-180")} />
          </button>
          {reportsOpen && (
            <div className="ml-4 pl-3 border-l border-border space-y-0.5">
              {reportSubItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
              {user?.name?.charAt(0) ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-[11px] text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar insumos, sites ou contratos..."
                className="pl-9 w-72 h-9 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
            <Button className="gap-2 hidden sm:flex" onClick={() => navigate("/op/solicitacoes/nova")}>
              <Plus className="h-4 w-4" />
              Nova Solicitação
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
