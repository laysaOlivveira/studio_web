import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Search,
  Copy,
  FileText,
  Dumbbell,
} from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes: string;
  order: number;
}

// Mock exercise library
const exerciseLibrary = [
  { id: "1", name: "Supino Reto com Barra", muscleGroup: "Peito" },
  { id: "2", name: "Supino Inclinado com Halteres", muscleGroup: "Peito" },
  { id: "3", name: "Crucifixo na Polia", muscleGroup: "Peito" },
  { id: "4", name: "Tríceps Testa", muscleGroup: "Tríceps" },
  { id: "5", name: "Tríceps Corda", muscleGroup: "Tríceps" },
  { id: "6", name: "Puxada Frontal", muscleGroup: "Costas" },
  { id: "7", name: "Remada Curvada", muscleGroup: "Costas" },
  { id: "8", name: "Rosca Direta", muscleGroup: "Bíceps" },
  { id: "9", name: "Rosca Alternada", muscleGroup: "Bíceps" },
  { id: "10", name: "Agachamento Livre", muscleGroup: "Pernas" },
  { id: "11", name: "Leg Press 45°", muscleGroup: "Pernas" },
  { id: "12", name: "Extensora", muscleGroup: "Pernas" },
  { id: "13", name: "Flexora", muscleGroup: "Pernas" },
  { id: "14", name: "Desenvolvimento com Barra", muscleGroup: "Ombros" },
  { id: "15", name: "Elevação Lateral", muscleGroup: "Ombros" },
];

const workoutTemplates = [
  { id: "1", name: "Treino A - Peito e Tríceps", exercises: ["1", "2", "3", "4", "5"] },
  { id: "2", name: "Treino B - Costas e Bíceps", exercises: ["6", "7", "8", "9"] },
  { id: "3", name: "Treino C - Pernas", exercises: ["10", "11", "12", "13"] },
];

export function WorkoutBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("studentId");
  const workoutId = searchParams.get("workoutId");

  const [workoutName, setWorkoutName] = useState("Novo Treino");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("all");

  const muscleGroups = ["all", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps"];

  const filteredExercises = exerciseLibrary.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup =
      selectedMuscleGroup === "all" || exercise.muscleGroup === selectedMuscleGroup;
    return matchesSearch && matchesGroup;
  });

  const addExercise = (exerciseFromLibrary: typeof exerciseLibrary[0]) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseFromLibrary.name,
      sets: "3",
      reps: "10-12",
      rest: "60s",
      notes: "",
      order: exercises.length + 1,
    };
    setExercises([...exercises, newExercise]);
    setShowExerciseLibrary(false);
    setSearchTerm("");
  };

  const updateExercise = (id: string, field: keyof Exercise, value: string) => {
    setExercises(
      exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  const moveExercise = (index: number, direction: "up" | "down") => {
    const newExercises = [...exercises];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < exercises.length) {
      [newExercises[index], newExercises[newIndex]] = [
        newExercises[newIndex],
        newExercises[index],
      ];
      setExercises(newExercises);
    }
  };

  const loadTemplate = (templateId: string) => {
    const template = workoutTemplates.find((t) => t.id === templateId);
    if (template) {
      setWorkoutName(template.name);
      const templateExercises = template.exercises.map((exerciseId, index) => {
        const exercise = exerciseLibrary.find((e) => e.id === exerciseId);
        return {
          id: Date.now().toString() + index,
          name: exercise?.name || "",
          sets: "3",
          reps: "10-12",
          rest: "60s",
          notes: "",
          order: index + 1,
        };
      });
      setExercises(templateExercises);
    }
  };

  const handleSave = () => {

    const workout = {
      name: workoutName,
      exercises
    }

    localStorage.setItem(
      "workout-"+Date.now(),
      JSON.stringify(workout)
    )

    alert("Treino salvo!")

    navigate("/admin/workouts")
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/workouts")}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {workoutId ? "Editar Treino" : "Montar Novo Treino"}
          </h1>
          <p className="text-muted-foreground">
            {studentId ? "João Silva" : "Selecione exercícios e configure séries"}
          </p>
        </div>
        <button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Salvar Treino
        </button>
      </div>

      {/* Workout Name */}
      <div className="bg-card border border-border rounded-lg p-6">
        <label className="block text-sm mb-2">Nome do Treino</label>
        <input
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Ex: Treino A - Peito e Tríceps"
        />
      </div>

      {/* Templates */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Copy className="w-5 h-5 text-primary" />
          <h3 className="font-bold">Usar Template</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {workoutTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => loadTemplate(template.id)}
              className="p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">{template.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {template.exercises.length} exercícios
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Exercise List */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="font-bold">Exercícios do Treino ({exercises.length})</h3>
          <button
            onClick={() => setShowExerciseLibrary(true)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Adicionar Exercício
          </button>
        </div>

        {exercises.length === 0 ? (
          <div className="p-12 text-center">
            <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">
              Nenhum exercício adicionado ainda
            </p>
            <button
              onClick={() => setShowExerciseLibrary(true)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Adicionar Primeiro Exercício
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {exercises.map((exercise, index) => (
              <div key={exercise.id} className="p-6">
                <div className="flex items-start gap-4">
                  {/* Order Controls */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveExercise(index, "up")}
                      disabled={index === 0}
                      className="p-1 hover:bg-muted rounded disabled:opacity-30"
                    >
                      ▲
                    </button>
                    <span className="text-center font-bold text-sm px-2">
                      {index + 1}
                    </span>
                    <button
                      onClick={() => moveExercise(index, "down")}
                      disabled={index === exercises.length - 1}
                      className="p-1 hover:bg-muted rounded disabled:opacity-30"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Exercise Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="font-bold mb-3">{exercise.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm text-muted-foreground mb-1">
                            Séries
                          </label>
                          <input
                            type="text"
                            value={exercise.sets}
                            onChange={(e) =>
                              updateExercise(exercise.id, "sets", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-input-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ex: 3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-muted-foreground mb-1">
                            Repetições
                          </label>
                          <input
                            type="text"
                            value={exercise.reps}
                            onChange={(e) =>
                              updateExercise(exercise.id, "reps", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-input-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ex: 10-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-muted-foreground mb-1">
                            Descanso
                          </label>
                          <input
                            type="text"
                            value={exercise.rest}
                            onChange={(e) =>
                              updateExercise(exercise.id, "rest", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-input-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ex: 60s"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">
                        Observações
                      </label>
                      <textarea
                        value={exercise.notes}
                        onChange={(e) =>
                          updateExercise(exercise.id, "notes", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-input-background rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: Controlar descida, explosão na subida"
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeExercise(exercise.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exercise Library Modal */}
      {showExerciseLibrary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Biblioteca de Exercícios</h2>
                <button
                  onClick={() => {
                    setShowExerciseLibrary(false);
                    setSearchTerm("");
                  }}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Buscar exercício..."
                />
              </div>

              {/* Muscle Group Filter */}
              <div className="flex flex-wrap gap-2">
                {muscleGroups.map((group) => (
                  <button
                    key={group}
                    onClick={() => setSelectedMuscleGroup(group)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedMuscleGroup === group
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {group === "all" ? "Todos" : group}
                  </button>
                ))}
              </div>
            </div>

            {/* Exercise List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredExercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => addExercise(exercise)}
                    className="p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left"
                  >
                    <p className="font-medium mb-1">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.muscleGroup}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}