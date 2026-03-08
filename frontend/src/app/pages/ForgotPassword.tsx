import { useState } from "react";
import { apiPost } from "../../services/api";

export function ForgotPassword(){

  const [email,setEmail] = useState("");

  const handleSubmit = async (e:any)=>{
    e.preventDefault();

    await apiPost("/auth/forgot-password",{email});

    alert("Se o email existir você receberá instruções");
  };

  return(

    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-white p-8 rounded-lg w-full max-w-md">

        <h1 className="text-xl font-bold mb-4">
          Recuperar senha
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <button className="w-full bg-primary text-white py-3 rounded-lg">
            Enviar
          </button>

        </form>

      </div>

    </div>

  );
}