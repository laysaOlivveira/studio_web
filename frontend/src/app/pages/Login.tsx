import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { apiPost } from "../../services/api";
import logo from "../../assets/logo.PNG";

export function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await apiPost("/auth/login",{
        email,
        senha
      });

      if(response?.token){

        localStorage.setItem("token",response.token);

        // se backend retornar role
        if(response.role){
          localStorage.setItem("role",response.role);

          if(response.role === "admin"){
            navigate("/admin");
          }else{
            navigate("/student");
          }

        }else{

          // fallback temporário enquanto backend não existe
          if(email === "admin@studio.com"){
            localStorage.setItem("role","admin");
            navigate("/admin");
          }else{
            localStorage.setItem("role","student");
            navigate("/student");
          }

        }

      }

    }catch(error){
      alert("Email ou senha inválidos");
    }
  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-lg shadow-xl p-8">

          <div className="text-center mb-8">

            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="Studio Funcional AO"
                className="w-64 object-contain mx-auto"
              />
            </div>

            <h1 className="text-3xl font-bold text-black mb-2">
              Studio Funcional
            </h1>

            <p className="text-muted-foreground">
              Professor Adriano Oliveira
            </p>

          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>

              <label className="block text-sm mb-2 text-black">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="seu@email.com"
                required
              />

            </div>

            <div>

              <label className="block text-sm mb-2 text-black">
                Senha
              </label>

              <input
                type="password"
                value={senha}
                onChange={(e)=>setSenha(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >

              <LogIn className="w-5 h-5" />
              Entrar

            </button>

          </form>

          <div className="mt-6 text-center">

            <button
              onClick={()=>navigate("/forgot-password")}
              className="text-sm text-primary hover:underline"
            >
              Esqueceu sua senha?
            </button>

          </div>

          <div className="mt-4 text-center">

            <p className="text-sm text-muted-foreground">

              Não tem cadastro?{" "}

              <button
                onClick={()=>navigate("/register")}
                className="text-primary hover:underline font-medium"
              >
                Cadastre-se aqui
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>

  );
}