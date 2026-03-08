import { Users, DollarSign, AlertCircle, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { useEffect, useState } from "react";
import { dashboardMock } from "../../../services/mockApi";

interface DashboardStats {
  totalAlunos: number;
  inadimplentes: number;
  receitaMensal: number;
  proximasAvaliacoes: number;
  receitaMensal6Meses?: any[];
  modalidades?: any[];
  ultimosAlunos?: Aluno[];
}

interface Aluno {
  id: number;
  nome: string;
  modalidade: string;
  status: string;
  data_matricula: string;
}

export function AdminDashboard() {

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [modalityData, setModalityData] = useState<any[]>([]);
  const [recentStudents, setRecentStudents] = useState<Aluno[]>([]);

  const presenceData = [
    { name: "Presentes", value: 82, color: "#22c55e" },
    { name: "Faltas", value: 18, color: "#ef4444" }
  ];

  useEffect(() => {

    setStats(dashboardMock);

    setMonthlyRevenue(dashboardMock.receitaMensal6Meses || []);

    setModalityData(dashboardMock.modalidades || []);

    setRecentStudents(dashboardMock.ultimosAlunos || []);

  }, []);

  const statsData = [

    {
      label: "Total de Alunos",
      value: stats?.totalAlunos ?? 0,
      icon: Users,
      color: "bg-primary",
    },

    {
      label: "Inadimplentes",
      value: stats?.inadimplentes ?? 0,
      icon: AlertCircle,
      color: "bg-destructive",
    },

    {
      label: "Receita Mensal",
      value: `R$ ${stats?.receitaMensal?.toLocaleString("pt-BR") ?? 0}`,
      icon: DollarSign,
      color: "bg-accent",
    },

    {
      label: "Próximas Avaliações",
      value: stats?.proximasAvaliacoes ?? 0,
      icon: Calendar,
      color: "bg-primary",
    }

  ];

  return (

    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Bem-vindo ao painel administrativo
        </p>
      </div>

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {statsData.map((stat, index) => (

          <div key={index} className="bg-card border rounded-lg p-6">

            <div className="flex justify-between mb-4">

              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white"/>
              </div>

            </div>

            <p className="text-sm text-muted-foreground">
              {stat.label}
            </p>

            <p className="text-2xl font-bold">
              {stat.value}
            </p>

          </div>

        ))}

      </div>

      {/* GRÁFICOS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* RECEITA */}

        <div className="bg-card border rounded-lg p-6">

          <h3 className="font-bold mb-4">
            Receita Mensal (6 meses)
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={monthlyRevenue}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip
                formatter={(value:number)=>
                  `R$ ${value.toLocaleString("pt-BR")}`
                }
              />

              <Bar dataKey="value" fill="#DC0A2D" radius={[8,8,0,0]}/>

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* MODALIDADES */}

        <div className="bg-card border rounded-lg p-6">

          <h3 className="font-bold mb-4">
            Distribuição por Modalidade
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={modalityData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({name,value})=>`${name}: ${value}`}
              >

                {modalityData.map((entry,index)=>(
                  <Cell key={index} fill={entry.color}/>
                ))}

              </Pie>

              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* PRESENÇA */}

        <div className="bg-card border rounded-lg p-6">

          <h3 className="font-bold mb-4">
            Presença nas Aulas
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={presenceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({name,value})=>`${name}: ${value}%`}
              >

                {presenceData.map((entry,index)=>(
                  <Cell key={index} fill={entry.color}/>
                ))}

              </Pie>

              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ÚLTIMOS ALUNOS */}

      <div className="bg-card border rounded-lg">

        <div className="p-6 border-b">
          <h3 className="font-bold">
            Últimos Alunos Cadastrados
          </h3>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-muted">

              <tr>
                <th className="text-left p-4 text-sm">Nome</th>
                <th className="text-left p-4 text-sm">Modalidade</th>
                <th className="text-left p-4 text-sm">Status</th>
                <th className="text-left p-4 text-sm">Data Matrícula</th>
              </tr>

            </thead>

            <tbody>

              {recentStudents.map((student)=>(

                <tr key={student.id} className="border-b">

                  <td className="p-4">
                    {student.nome}
                  </td>

                  <td className="p-4">
                    {student.modalidade}
                  </td>

                  <td className="p-4">

                    <span className={`px-3 py-1 rounded-full text-xs
                      ${student.status==="Ativo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"}`}>

                      {student.status}

                    </span>

                  </td>

                  <td className="p-4">
                    {student.data_matricula}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}