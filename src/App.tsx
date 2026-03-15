import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminGuard } from "@/components/auth/AdminGuard";
import { OperatorGuard } from "@/components/auth/OperatorGuard";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Permissoes from "./pages/Permissoes";
import Insumos from "./pages/Insumos";
import Estoque from "./pages/Estoque";
import GestaoAtivos from "./pages/GestaoAtivos";
import VisaoGeral from "./pages/operator/VisaoGeral";
import GestaoEstoque from "./pages/operator/GestaoEstoque";
import LiberacaoInsumos from "./pages/operator/LiberacaoInsumos";
import NovaSolicitacao from "./pages/operator/NovaSolicitacao";
import ReposicaoEstoque from "./pages/operator/ReposicaoEstoque";
import GestaoRMAs from "./pages/operator/GestaoRMAs";
import RelatorioExcecoes from "./pages/operator/RelatorioExcecoes";
import RelatorioFechamento from "./pages/operator/RelatorioFechamento";
import MovimentacaoEstoque from "./pages/operator/MovimentacaoEstoque";
import RelatorioConsumo from "./pages/operator/RelatorioConsumo";
import ConsumoPorCliente from "./pages/operator/ConsumoPorCliente";
import Clientes from "./pages/operator/Clientes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* Admin routes */}
            <Route path="/dashboard" element={<AdminGuard><Dashboard /></AdminGuard>} />
            <Route path="/usuarios" element={<AdminGuard><Usuarios /></AdminGuard>} />
            <Route path="/permissoes" element={<AdminGuard><Permissoes /></AdminGuard>} />
            <Route path="/insumos" element={<AdminGuard><Insumos /></AdminGuard>} />
            <Route path="/estoque" element={<AdminGuard><Estoque /></AdminGuard>} />
            <Route path="/gestao-ativos" element={<AdminGuard><GestaoAtivos /></AdminGuard>} />
            {/* Operator routes */}
            <Route path="/op/visao-geral" element={<OperatorGuard><VisaoGeral /></OperatorGuard>} />
            <Route path="/op/estoque" element={<OperatorGuard><GestaoEstoque /></OperatorGuard>} />
            <Route path="/op/solicitacoes" element={<OperatorGuard><LiberacaoInsumos /></OperatorGuard>} />
            <Route path="/op/solicitacoes/nova" element={<OperatorGuard><NovaSolicitacao /></OperatorGuard>} />
            <Route path="/op/reposicao" element={<OperatorGuard><ReposicaoEstoque /></OperatorGuard>} />
            {/* Report routes */}
            <Route path="/op/relatorios" element={<OperatorGuard><RelatorioConsumo /></OperatorGuard>} />
            <Route path="/op/relatorios/rmas" element={<OperatorGuard><GestaoRMAs /></OperatorGuard>} />
            <Route path="/op/relatorios/excecoes" element={<OperatorGuard><RelatorioExcecoes /></OperatorGuard>} />
            <Route path="/op/relatorios/fechamento" element={<OperatorGuard><RelatorioFechamento /></OperatorGuard>} />
            <Route path="/op/relatorios/movimentacao" element={<OperatorGuard><MovimentacaoEstoque /></OperatorGuard>} />
            <Route path="/op/relatorios/consumo-cliente" element={<OperatorGuard><ConsumoPorCliente /></OperatorGuard>} />
            {/* Placeholder routes */}
            <Route path="/op/clientes" element={<OperatorGuard><Clientes /></OperatorGuard>} />
            <Route path="/op/contratos" element={<OperatorGuard><VisaoGeral /></OperatorGuard>} />
            <Route path="/op/sites" element={<OperatorGuard><VisaoGeral /></OperatorGuard>} />
            <Route path="/op/equipamentos" element={<OperatorGuard><VisaoGeral /></OperatorGuard>} />
            <Route path="/op/permissoes-op" element={<OperatorGuard><VisaoGeral /></OperatorGuard>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
