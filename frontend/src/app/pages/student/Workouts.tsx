import { Calendar, Clock, AlertCircle } from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

interface Workout {
  id: number;
  name: string;
  type: string;
  createdDate: string;
  exercises: Exercise[];
}

const currentWorkout: Workout = {
  id: 1,
  name: "Treino A - Peito e Tríceps",
  type: "Musculação",
  createdDate: "15/01/2026",
  exercises: [
    {
      name: "Supino Reto com Barra",
      sets: 4,
      reps: "8-10",
      rest: "90s",
      notes: "Controlar descida, explosão na subida",
    },
    {
      name: "Supino Inclinado com Halteres",
      sets: 3,
      reps: "10-12",
      rest: "60s",
    },
    {
      name: "Crucifixo na Polia",
      sets: 3,
      reps: "12-15",
      rest: "45s",
    },
    {
      name: "Tríceps Testa",
      sets: 3,
      reps: "10-12",
      rest: "60s",
    },
    {
      name: "Tríceps Corda",
      sets: 3,
      reps: "12-15",
      rest: "45s",
    },
  ],
};

const workoutHistory = [
  { id: 2, name: "Treino B - Costas e Bíceps", date: "10/12/2025" },
  { id: 3, name: "Treino C - Pernas", date: "05/11/2025" },
];

const daysUntilChange = 25;
const canRequestChange = daysUntilChange <= 0;

export function StudentWorkouts() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Meus Treinos</h1>
        <p className="text-muted-foreground">Acompanhe seu treino de musculação</p>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-blue-900">
            {canRequestChange
              ? "Você já pode solicitar a troca do seu treino!"
              : `Você poderá solicitar a troca do treino em ${daysUntilChange} dias (após 40 dias do treino atual).`}
          </p>
        </div>
      </div>

      {/* Current Workout */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold mb-1">{currentWorkout.name}</h2>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Criado em {currentWorkout.createdDate}
                </span>
              </div>
            </div>
            <button
              disabled={!canRequestChange}
              className={`px-6 py-3 rounded-lg transition-colors ${
                canRequestChange
                  ? "bg-primary hover:bg-primary/90 text-white"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Solicitar Troca
            </button>
          </div>
        </div>

        {/* Exercises */}
        <div className="p-6 space-y-4">
          {currentWorkout.exercises.map((exercise, index) => (
            <div
              key={index}
              className="bg-muted/50 rounded-lg p-4 border border-border"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-bold">{exercise.name}</h3>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
                  {index + 1}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Séries</p>
                  <p className="font-bold">{exercise.sets}x</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Repetições</p>
                  <p className="font-bold">{exercise.reps}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Descanso</p>
                  <p className="font-bold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {exercise.rest}
                  </p>
                </div>
              </div>
              {exercise.notes && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Observações:</strong> {exercise.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Workout History */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold">Histórico de Treinos</h3>
        </div>
        <div className="divide-y divide-border">
          {workoutHistory.map((workout) => (
            <div
              key={workout.id}
              className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-bold mb-1">{workout.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {workout.date}
                </p>
              </div>
              <button className="text-primary hover:underline text-sm">Ver treino</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
