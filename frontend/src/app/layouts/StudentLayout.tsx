import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Dumbbell, UsersRound, ClipboardCheck, CreditCard, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export function StudentLayout() {

  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // 🔹 MENU DO ALUNO
  const menuItems = [
    {
      label: "Dashboard",
      path: "/student",
      icon: LayoutDashboard,
      exact: true
    },
    {
      label: "Treinos",
      path: "/student/workouts",
      icon: Dumbbell
    },
    {
      label: "Aulas",
      path: "/student/classes",
      icon: UsersRound
    },
    {
      label: "Avaliações",
      path: "/student/assessments",
      icon: ClipboardCheck
    },
    {
      label: "Pagamentos",
      path: "/student/payments",
      icon: CreditCard
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">

        <div className="p-6 border-b border-sidebar-border">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">SF</span>
            </div>

            <div>
              <h2 className="font-bold">Studio Funcional</h2>
              <p className="text-xs text-sidebar-foreground/60">Aluno</p>
            </div>

          </div>

        </div>

        <nav className="flex-1 p-4 space-y-1">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`
              }
            >

              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>

            </NavLink>

          ))}

        </nav>

        <div className="p-4 border-t border-sidebar-border">

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >

            <LogOut className="w-5 h-5" />
            <span>Sair</span>

          </button>

        </div>

      </aside>

      {/* Mobile Header */}

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border">

        <div className="flex items-center justify-between p-4">

          <div className="flex items-center gap-3">

            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">SF</span>
            </div>

            <span className="text-sidebar-foreground font-bold">
              Studio Funcional
            </span>

          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-sidebar-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {mobileMenuOpen && (

        <div className="lg:hidden fixed inset-0 z-40 bg-sidebar pt-16">

          <nav className="p-4 space-y-1">

            {menuItems.map((item) => (

              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`
                }
              >

                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>

              </NavLink>

            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors mt-4"
            >

              <LogOut className="w-5 h-5" />
              <span>Sair</span>

            </button>

          </nav>

        </div>

      )}

      {/* Main Content */}

      <main className="flex-1 overflow-auto pt-16 lg:pt-0">

        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
}