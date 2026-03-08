import { useState } from "react";
import { Plus, Search, Eye, Edit, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Workout {
  id: number;
  studentName: string;
  createdDate: string;
  lastUpdate: string;
  status: "Atual" | "Solicitou Troca" | "Histórico";
  daysUntilChange: number | null;
}

const mockWorkouts: Workout[] = [
  {
    id: 1,
    studentName: "João Silva",
    createdDate: "15/01/2026",
    lastUpdate: "15/01/2026",
    status: "Atual",
    daysUntilChange: 25,
  },
  {
    id: 2,
    studentName: "Ana Oliveira",
    createdDate: "10/01/2026",
    lastUpdate: "10/01/2026",
    status: "Atual",
    daysUntilChange: 20,
  },
  {
    id: 3,
    studentName: "Pedro Costa",
    createdDate: "05/12/2025",
    lastUpdate: "20/02/2026",
    status: "Solicitou Troca",
    daysUntilChange: null,
  },
  {
    id: 4,
    studentName: "Carlos Souza",
    createdDate: "20/01/2026",
    lastUpdate: "20/01/2026",
    status: "Atual",
    daysUntilChange: 30,
  },
];

export function AdminWorkouts() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredWorkouts = mockWorkouts.filter((workout) =>
    workout.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Treinos</h1>
          <p className="text-muted-foreground">Gerencie treinos de musculação</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2" onClick={() => navigate("/admin/workouts/builder")}>
          <Plus className="w-5 h-5" />
          Criar Treino
        </button>
      </div>

      {/* Search */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por aluno..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Workouts Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm">Aluno</th>
                <th className="text-left p-4 text-sm hidden md:table-cell">Data Criação</th>
                <th className="text-left p-4 text-sm hidden sm:table-cell">Última Atualização</th>
                <th className="text-left p-4 text-sm">Status</th>
                <th className="text-left p-4 text-sm hidden lg:table-cell">Dias p/ Troca</th>
                <th className="text-left p-4 text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkouts.map((workout) => (
                <tr key={workout.id} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium">{workout.studentName}</td>
                  <td className="p-4 hidden md:table-cell">{workout.createdDate}</td>
                  <td className="p-4 hidden sm:table-cell">{workout.lastUpdate}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        workout.status === "Atual"
                          ? "bg-green-100 text-green-700"
                          : workout.status === "Solicitou Troca"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {workout.status}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    {workout.daysUntilChange !== null ? `${workout.daysUntilChange} dias` : "-"}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Ver treino"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Editar treino"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"
                        title="Enviar treino"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exercise Bank */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Banco de Exercícios</h3>
          <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Exercício
          </button>
        </div>
        <p className="text-muted-foreground text-sm">
          Gerencie seu banco de exercícios com imagens e descrições para criar treinos personalizados.
        </p>
      </div>
    </div>
  );
}