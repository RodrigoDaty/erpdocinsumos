import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Printer, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepConnected, setKeepConnected] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: "E-mail ou senha inválidos. Tente novamente.",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-container-low">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] bg-primary relative flex-col justify-between p-10 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-1/4 right-0 translate-x-1/2 w-[400px] h-[400px] rounded-full border border-primary-foreground/10" />
        <div className="absolute top-1/3 right-0 translate-x-1/3 w-[300px] h-[300px] rounded-full border border-primary-foreground/10" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="h-10 w-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Printer className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-primary-foreground font-semibold text-lg">ERP Admin</span>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight mb-6">
            Precisão na
            <br />
            Gestão de Insumos.
          </h2>
          <p className="text-primary-foreground/70 text-base leading-relaxed max-w-sm">
            Controle de estoque, SKUs e níveis de tinta com a autoridade de uma arquitetura de dados moderna.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-9 w-9 rounded-full bg-primary-foreground/30 border-2 border-primary flex items-center justify-center text-xs text-primary-foreground font-medium"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-primary-foreground/70 text-sm">
            Junte-se a mais de 2.000 administradores
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <Printer className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">ERP Admin</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Acesse o Portal</h1>
            <p className="text-muted-foreground mt-1">Entre com suas credenciais para gerenciar insumos.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                E-mail Corporativo
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="nome@empresa.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-surface-container-low"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Senha</label>
                <span className="text-[11px] text-muted-foreground italic">
                  Para alteração de senha, entre em contato com o administrador do sistema.
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-surface-container-low"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="keep"
                checked={keepConnected}
                onCheckedChange={(v) => setKeepConnected(!!v)}
              />
              <label htmlFor="keep" className="text-sm text-muted-foreground cursor-pointer">
                Manter conectado neste dispositivo
              </label>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold gap-2">
              Entrar no Sistema
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Problemas com o acesso?{" "}
              <button className="text-primary font-medium hover:underline">Fale com o Suporte TI</button>
            </p>
          </div>

          <div className="text-center">
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest">
              Portal Administrativo ERP • Insumos & Impressão v4.2.0 • © 2024 Gestão de Acessos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
