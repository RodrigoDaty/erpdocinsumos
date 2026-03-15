import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminGuard } from "@/components/auth/AdminGuard";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Permissoes from "./pages/Permissoes";
import Insumos from "./pages/Insumos";
import Estoque from "./pages/Estoque";
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
            <Route
              path="/dashboard"
              element={
                <AdminGuard>
                  <Dashboard />
                </AdminGuard>
              }
            />
            <Route
              path="/usuarios"
              element={
                <AdminGuard>
                  <Usuarios />
                </AdminGuard>
              }
            />
            <Route
              path="/permissoes"
              element={
                <AdminGuard>
                  <Permissoes />
                </AdminGuard>
              }
            />
            <Route
              path="/insumos"
              element={
                <AdminGuard>
                  <Insumos />
                </AdminGuard>
              }
            />
            <Route
              path="/estoque"
              element={
                <AdminGuard>
                  <Estoque />
                </AdminGuard>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
