import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../services/api";
import logo from "../../assets/logo.PNG";

export function Register(){

  const navigate = useNavigate();

  const [nome,setNome] = useState("");
  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");

  const handleRegister = async (e:React.FormEvent)=>{
    e.preventDefault();

    try{

      await apiPost("/auth/register",{
        nome,
        email,
        senha
      });

      alert("Cadastro realizado!");

      navigate("/");

    }catch{
      alert("Erro ao cadastrar");
    }
  };

  return(

    <div className="min-h-screen bg-black flex items-center justify-center p-4">

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Studio Funcional AO"
            className="w-64 object-contain mx-auto"
          />
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">
          Criar conta
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e)=>setNome(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e)=>setSenha(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <button className="w-full bg-primary text-white py-3 rounded-lg">
            Criar conta
          </button>

        </form>

        <div className="text-center mt-4">

          <button
            onClick={()=>navigate("/")}
            className="text-primary hover:underline"
          >
            Voltar para login
          </button>

        </div>

      </div>

    </div>

  );
}