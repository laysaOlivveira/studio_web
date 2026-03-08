import { useEffect, useState } from "react";
import { apiGet } from "../../../services/api";

import { Plus, Calendar, Clock } from "lucide-react";

interface Avaliacao {
  id: number;
  nome: string;
  data_avaliacao: string;
  status?: string;
}

export function AdminAssessments() {

  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {

        const response = await apiGet("/dashboard/proximas-avaliacoes");

        // garante que sempre será array
        if (Array.isArray(response)) {
          setAvaliacoes(response);
        } else if (Array.isArray(response?.data)) {
          setAvaliacoes(response.data);
        } else {
          setAvaliacoes([]);
        }

      } catch (error) {
        console.error("Erro ao carregar avaliações:", error);
        setAvaliacoes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Avaliações Físicas
          </h1>

          <p className="text-muted-foreground">
            Gerencie avaliações e acompanhe evolução
          </p>
        </div>

        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Nova Avaliação
        </button>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-card border border-border rounded-lg p-6">

          <div className="flex items-center gap-3 mb-3">

            <div className="bg-primary p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Agendadas
              </p>
              <p className="text-2xl font-bold">
                {avaliacoes.length}
              </p>
            </div>

          </div>

        </div>

        <div className="bg-card border border-border rounded-lg p-6">

          <div className="flex items-center gap-3 mb-3">

            <div className="bg-destructive p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Atrasadas
              </p>
              <p className="text-2xl font-bold">
                0
              </p>
            </div>

          </div>

        </div>

        <div className="bg-card border border-border rounded-lg p-6">

          <div className="flex items-center gap-3 mb-3">

            <div className="bg-accent p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Este Mês
              </p>
              <p className="text-2xl font-bold">
                {avaliacoes.length}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Upcoming Assessments */}
      <div className="bg-card border border-border rounded-lg">

        <div className="p-6 border-b border-border">
          <h3 className="font-bold">
            Próximas Avaliações
          </h3>
        </div>

        <div className="divide-y divide-border">

          {loading ? (

            <div className="p-6 text-center text-muted-foreground">
              Carregando avaliações...
            </div>

          ) : avaliacoes.length === 0 ? (

            <div className="p-6 text-center text-muted-foreground">
              Nenhuma avaliação encontrada
            </div>

          ) : (

            avaliacoes.map((assessment) => (

              <div
                key={assessment.id}
                className="p-6 hover:bg-muted/50 transition-colors"
              >

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  <div className="flex-1">

                    <h4 className="font-bold mb-1">
                      {assessment.nome}
                    </h4>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">

                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {assessment.data_avaliacao}
                      </span>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {assessment.status ?? "Agendada"}
                    </span>

                    <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                      Realizar
                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}