import { Calendar, Users, Clock, MapPin } from "lucide-react";

interface Class {
  id: number;
  name: string;
  schedule: string;
  instructor: string;
  location: string;
  nextSession: string;
}

const enrolledClasses: Class[] = [
  {
    id: 1,
    name: "Funcional Manhã",
    schedule: "Segunda a Sexta - 07:00",
    instructor: "Adriano Oliveira",
    location: "Studio Principal",
    nextSession: "03/03/2026 - 07:00",
  },
];

const availableClasses: Class[] = [
  {
    id: 2,
    name: "Funcional Tarde",
    schedule: "Segunda a Sexta - 15:00",
    instructor: "Adriano Oliveira",
    location: "Studio Principal",
    nextSession: "03/03/2026 - 15:00",
  },
  {
    id: 3,
    name: "Funcional Noite",
    schedule: "Segunda a Sexta - 19:00",
    instructor: "Adriano Oliveira",
    location: "Studio Principal",
    nextSession: "03/03/2026 - 19:00",
  },
  {
    id: 4,
    name: "Funcional Sábado",
    schedule: "Sábado - 09:00",
    instructor: "Adriano Oliveira",
    location: "Studio Principal",
    nextSession: "08/03/2026 - 09:00",
  },
];

const classAnnouncements = [
  {
    id: 1,
    title: "Troca de Horário",
    message: "A aula de amanhã será às 07:30",
    date: "01/03/2026",
  },
];

export function StudentClasses() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Minhas Turmas</h1>
        <p className="text-muted-foreground">Gerencie suas turmas de treino funcional</p>
      </div>

      {/* Enrolled Classes */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Turmas Matriculadas</h2>
        {enrolledClasses.map((classItem) => (
          <div key={classItem.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {classItem.schedule}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Instrutor: {classItem.instructor}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {classItem.location}
                  </p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                Matriculado
              </span>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-primary mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-bold text-sm">Próxima Aula</span>
              </div>
              <p className="text-sm">{classItem.nextSession}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Class Announcements */}
      {classAnnouncements.length > 0 && (
        <div className="bg-card border border-border rounded-lg">
          <div className="p-6 border-b border-border">
            <h3 className="font-bold">Avisos da Turma</h3>
          </div>
          <div className="divide-y divide-border">
            {classAnnouncements.map((announcement) => (
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
      )}

      {/* Available Classes */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Turmas Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
            >
              <h3 className="font-bold mb-3">{classItem.name}</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {classItem.schedule}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {classItem.instructor}
                </p>
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors">
                Solicitar Matrícula
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
