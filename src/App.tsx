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
import VisaoGeral from "./pages/operator/VisaoGeral";
import GestaoEstoque from "./pages/operator/GestaoEstoque";
import ConsultaConsumo from "./pages/operator/ConsultaConsumo";
import LiberacaoInsumos from "./pages/operator/LiberacaoInsumos";
import NovaSolicitacao from "./pages/operator/NovaSolicitacao";
import ReposicaoEstoque from "./pages/operator/ReposicaoEstoque";
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
            {/* Operator routes */}
            <Route path="/op/visao-geral" element={<OperatorGuard><VisaoGeral /></OperatorGuard>} />
            <Route path="/op/estoque" element={<OperatorGuard><GestaoEstoque /></OperatorGuard>} />
            <Route path="/op/relatorios" element={<OperatorGuard><ConsultaConsumo /></OperatorGuard>} />
            <Route path="/op/solicitacoes" element={<OperatorGuard><LiberacaoInsumos /></OperatorGuard>} />
            <Route path="/op/solicitacoes/nova" element={<OperatorGuard><NovaSolicitacao /></OperatorGuard>} />
            {/* Placeholder routes for sidebar links */}
            <Route path="/op/clientes" element={<OperatorGuard><VisaoGeral /></OperatorGuard>} />
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
