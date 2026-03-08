import { Dumbbell, Calendar, CreditCard, TrendingUp, Megaphone, Bell } from "lucide-react";

const studentProfile = {
  name: "João Silva",
  modality: "Musculação e Funcional",
  status: "Ativo",
  memberSince: "15/01/2026",
  nextAssessment: "05/03/2026",
};

const recentAnnouncements = [
  {
    id: 1,
    title: "Feriado Carnaval",
    message: "O studio estará fechado nos dias 03 e 04/03.",
    date: "25/02/2026",
  },
  {
    id: 2,
    title: "Novo Treino Disponível",
    message: "Seu novo treino de musculação está disponível!",
    date: "01/03/2026",
  },
];

const recentActivity = [
  { id: 1, type: "Treino", description: "Treino A - Peito e Tríceps", date: "02/03/2026" },
  { id: 2, type: "Avaliação", description: "Avaliação Física Mensal", date: "01/02/2026" },
  { id: 3, type: "Pagamento", description: "Mensalidade de Março", date: "01/03/2026" },
];

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Olá, {studentProfile.name}!
        </h1>
        <p className="text-muted-foreground">Bem-vindo ao Studio Funcional</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Modalidade</p>
          <p className="font-bold">{studentProfile.modality}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-600 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Status</p>
          <p className="font-bold text-green-700">{studentProfile.status}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-accent p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Próxima Avaliação</p>
          <p className="font-bold">{studentProfile.nextAssessment}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Mensalidade</p>
          <p className="font-bold text-green-700">Em dia</p>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <Megaphone className="w-5 h-5 text-primary" />
          <h3 className="font-bold">Avisos Recentes</h3>
        </div>
        <div className="divide-y divide-border">
          {recentAnnouncements.map((announcement) => (
            <div key={announcement.id} className="p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-bold">{announcement.title}</h4>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {announcement.date}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{announcement.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="font-bold">Atividade Recente</h3>
        </div>
        <div className="divide-y divide-border">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-6 flex items-center justify-between">
              <div>
                <p className="font-bold mb-1">{activity.description}</p>
                <p className="text-sm text-muted-foreground">{activity.type}</p>
              </div>
              <span className="text-sm text-muted-foreground">{activity.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-primary hover:bg-primary/90 text-white p-6 rounded-lg transition-colors text-left">
          <Dumbbell className="w-8 h-8 mb-3" />
          <h3 className="font-bold mb-1">Ver Meus Treinos</h3>
          <p className="text-sm opacity-90">Acesse seus treinos de musculação</p>
        </button>

        <button className="bg-accent hover:bg-accent/90 text-white p-6 rounded-lg transition-colors text-left">
          <Calendar className="w-8 h-8 mb-3" />
          <h3 className="font-bold mb-1">Minhas Avaliações</h3>
          <p className="text-sm opacity-90">Acompanhe sua evolução</p>
        </button>
      </div>
    </div>
  );
}
