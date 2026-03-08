import { useLocation } from "react-router-dom"
import logo from "../assets/logo.png"
import adriano from "../assets/adriano.jpeg"

export function AdminHeader() {

  const location = useLocation()

  function getTitle() {

    if(location.pathname.includes("students"))
      return "Alunos"

    if(location.pathname.includes("classes"))
      return "Turmas"

    if(location.pathname.includes("workouts"))
      return "Treinos"

    if(location.pathname.includes("dashboard"))
      return "Dashboard"

    return "Painel Admin"
  }

  return (

    <header className="w-full h-20 border-b border-border bg-card flex items-center justify-between px-6">

      {/* logo + titulo */}

      <div className="flex items-center gap-3">

        <img
          src={logo}
          alt="logo"
          className="w-10 h-10 object-contain"
        />

        <h1 className="text-2xl font-bold text-foreground">
          {getTitle()}
        </h1>

      </div>

      {/* admin */}

      <div className="flex items-center gap-3">

        <div className="text-right hidden md:block">

          <p className="font-semibold">
            Adriano Oliveira
          </p>

          <p className="text-sm text-muted-foreground">
            Professor
          </p>

        </div>

        <img
          src={adriano}
          alt="Adriano"
          className="w-12 h-12 rounded-full object-cover border"
        />

      </div>

    </header>
  )
}