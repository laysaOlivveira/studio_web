import { useState } from "react";
import { Plus, Send, Filter, Trash2 } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  message: string;
  target: "Todos" | "Turma Específica" | "Individual";
  targetName?: string;
  date: string;
  sentViaWhatsApp: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Feriado Carnaval",
    message: "O studio estará fechado nos dias 03 e 04/03. Retornamos no dia 05/03.",
    target: "Todos",
    date: "25/02/2026",
    sentViaWhatsApp: true,
  },
  {
    id: 2,
    title: "Troca de Horário",
    message: "A turma de funcional da manhã será às 07:30 amanhã.",
    target: "Turma Específica",
    targetName: "Funcional Manhã",
    date: "01/03/2026",
    sentViaWhatsApp: true,
  },
  {
    id: 3,
    title: "Avaliação Agendada",
    message: "Sua avaliação física foi agendada para 05/03 às 14:00.",
    target: "Individual",
    targetName: "João Silva",
    date: "02/03/2026",
    sentViaWhatsApp: true,
  },
  {
    id: 4,
    title: "Novo Treino Disponível",
    message: "Seu novo treino de musculação está disponível no app!",
    target: "Individual",
    targetName: "Ana Oliveira",
    date: "01/03/2026",
    sentViaWhatsApp: true,
  },
];

export function AdminAnnouncements() {
  const [filterTarget, setFilterTarget] = useState("all");
  const [showNewModal, setShowNewModal] = useState(false);

  const filteredAnnouncements = mockAnnouncements.filter(
    (a) => filterTarget === "all" || a.target === filterTarget
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Painel de Avisos</h1>
          <p className="text-muted-foreground">
            Envie avisos gerais, por turma ou individuais
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Aviso
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-card border border-border hover:border-primary rounded-lg p-6 text-left transition-colors">
          <div className="bg-primary p-3 rounded-lg w-fit mb-3">
            <Send className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold mb-1">Aviso Geral</h3>
          <p className="text-sm text-muted-foreground">Enviar para todos os alunos</p>
        </button>

        <button className="bg-card border border-border hover:border-primary rounded-lg p-6 text-left transition-colors">
          <div className="bg-accent p-3 rounded-lg w-fit mb-3">
            <Send className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold mb-1">Aviso por Turma</h3>
          <p className="text-sm text-muted-foreground">Enviar para uma turma específica</p>
        </button>

        <button className="bg-card border border-border hover:border-primary rounded-lg p-6 text-left transition-colors">
          <div className="bg-primary p-3 rounded-lg w-fit mb-3">
            <Send className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold mb-1">Aviso Individual</h3>
          <p className="text-sm text-muted-foreground">Enviar para um aluno</p>
        </button>
      </div>

      {/* Announcements List */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold">Histórico de Avisos</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
              value={filterTarget}
              onChange={(e) => setFilterTarget(e.target.value)}
              className="px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">Todos</option>
              <option value="Todos">Avisos Gerais</option>
              <option value="Turma Específica">Por Turma</option>
              <option value="Individual">Individuais</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-border">
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-6 hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div>
                      <h4 className="font-bold mb-1">{announcement.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {announcement.message}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-muted rounded">
                          {announcement.target}
                          {announcement.targetName && `: ${announcement.targetName}`}
                        </span>
                        <span className="px-2 py-1 bg-muted rounded">
                          {announcement.date}
                        </span>
                        {announcement.sentViaWhatsApp && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                            Enviado via WhatsApp
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Announcement Modal (simplified, just for UI demo) */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold mb-4">Novo Aviso</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Título</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Título do aviso"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Mensagem</label>
                <textarea
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Escreva sua mensagem..."
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Destinatários</label>
                <select className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Todos os alunos</option>
                  <option>Turma específica</option>
                  <option>Aluno individual</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="whatsapp" className="w-4 h-4" />
                <label htmlFor="whatsapp" className="text-sm">
                  Enviar via WhatsApp
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Enviar Aviso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
