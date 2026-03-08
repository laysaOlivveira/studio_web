import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  UsersRound,
  ClipboardCheck,
  DollarSign,
  Megaphone,
  LogOut,
  Menu,
  X
} from "lucide-react";

import { useState } from "react";

import logo from "../../assets/logo.png";
import adriano from "../../assets/adriano.jpeg";

const menuItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Alunos", path: "/admin/students", icon: Users },
  { label: "Treinos", path: "/admin/workouts", icon: Dumbbell },
  { label: "Aulas", path: "/admin/classes", icon: UsersRound },
  { label: "Avaliações", path: "/admin/assessments", icon: ClipboardCheck },
  { label: "Financeiro", path: "/admin/financial", icon: DollarSign },
  { label: "Avisos", path: "/admin/announcements", icon: Megaphone }
];

export function AdminLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  function getTitle() {

    if (location.pathname === "/admin")
      return "Dashboard";

    if (location.pathname.includes("students"))
      return "Alunos";

    if (location.pathname.includes("workouts"))
      return "Treinos";

    if (location.pathname.includes("classes"))
      return "Aulas";

    if (location.pathname.includes("assessments"))
      return "Avaliações";

    if (location.pathname.includes("financial"))
      return "Financeiro";

    if (location.pathname.includes("announcements"))
      return "Avisos";

    return "Painel Admin";
  }

  return (
    <div className="flex min-h-screen bg-background">

      {/* SIDEBAR */}

      <aside
        className={`bg-black text-white transition-all duration-300 flex flex-col
        ${collapsed ? "w-20" : "w-64"} 
        lg:relative fixed z-50 h-full`}
      >

        {/* LOGO */}

        <div className="p-4 flex items-center justify-between border-b border-gray-800">

          <div className="flex items-center gap-2">

            <img
              src={logo}
              alt="logo"
              className="h-10 object-contain"
            />

            {!collapsed && (
              <span className="font-bold text-lg">
                Studio
              </span>
            )}

          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white"
          >
            <Menu />
          </button>

        </div>

        {/* MENU */}

        <nav className="flex-1 p-2 space-y-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive
                  ? "bg-red-600 text-white shadow-lg"
                  : "hover:bg-gray-800 text-gray-300"}`
              }
            >
              <item.icon className="w-5 h-5" />

              {!collapsed && (
                <span className="font-medium">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}

        </nav>

        {/* ADMIN PROFILE FIXO */}

        <div className="p-4 border-t border-gray-800">

          <div className="flex items-center gap-3 mb-3">

            <img
              src={adriano}
              alt="Adriano"
              className="w-10 h-10 rounded-full object-cover"
            />

            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">
                  Adriano Oliveira
                </p>

                <p className="text-xs text-gray-400">
                  Personal Trainer
                </p>
              </div>
            )}

          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
          >
            <LogOut size={18} />

            {!collapsed && "Sair"}

          </button>

        </div>

      </aside>

      {/* MOBILE HEADER */}

      <div className="lg:hidden fixed top-0 left-0 right-0 bg-black text-white flex items-center justify-between p-4 z-40">

        <div className="flex items-center gap-2">

          <img src={logo} className="h-8" />

          <span className="font-bold">
            {getTitle()}
          </span>

        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* MAIN AREA */}

      <div className="flex-1 flex flex-col">

        {/* HEADER DESKTOP */}

        <header className="hidden lg:flex items-center justify-between border-b p-6 bg-card">

          <div className="flex items-center gap-3">

            <img
              src={logo}
              className="h-10"
            />

            <h1 className="text-2xl font-bold">
              {getTitle()}
            </h1>

          </div>

          <div className="flex items-center gap-3">

            <div className="text-right">

              <p className="font-semibold">
                Adriano Oliveira
              </p>

              <p className="text-sm text-muted-foreground">
                Personal Trainer
              </p>

            </div>

            <img
              src={adriano}
              className="w-12 h-12 rounded-full object-cover"
            />

          </div>

        </header>

        {/* CONTENT */}

        <main className="flex-1 p-6 mt-16 lg:mt-0">

          <Outlet />

        </main>

      </div>

    </div>
  );
}