export const mockStudents = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "99999-1111",
    modalidade: "Funcional",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Maria Souza",
    email: "maria@email.com",
    telefone: "99999-2222",
    modalidade: "Musculação",
    status: "Inadimplente"
  }
]

export const dashboardMock = {
  totalAlunos: 42,
  inadimplentes: 3,
  receitaMensal: 8200,
  proximasAvaliacoes: 6,

  receitaMensal6Meses: [
    { month: "Jan", value: 4200 },
    { month: "Fev", value: 5200 },
    { month: "Mar", value: 6100 },
    { month: "Abr", value: 7000 },
    { month: "Mai", value: 7600 },
    { month: "Jun", value: 8200 }
  ],

  modalidades: [
    { name: "Funcional", value: 20, color: "#DC0A2D" },
    { name: "Musculação", value: 12, color: "#111827" },
  ],

  ultimosAlunos: [
    {
      id: 1,
      nome: "João Silva",
      modalidade: "Funcional",
      status: "Ativo",
      data_matricula: "12/03/2026"
    }
  ]
}