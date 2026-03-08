import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Dumbbell,
  Activity,
  Award,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// Mock student data
const studentInfo = {
  id: 1,
  name: "João Silva",
  email: "joao@email.com",
  phone: "(11) 98765-4321",
  modality: "Musculação e Funcional",
  status: "Ativo",
  joinDate: "15/01/2026",
  lastWorkoutChange: "15/01/2026",
  nextAssessment: "05/03/2026",
};

const assessmentHistory = [
  {
    date: "01/02/2026",
    weight: 82.5,
    imc: 26.9,
    chest: 102,
    waist: 88,
    hip: 98,
    arm: 38,
    thigh: 58,
  },
  {
    date: "01/01/2026",
    weight: 84.0,
    imc: 27.4,
    chest: 104,
    waist: 91,
    hip: 100,
    arm: 38.5,
    thigh: 59,
  },
  {
    date: "01/12/2025",
    weight: 85.5,
    imc: 27.9,
    chest: 105,
    waist: 93,
    hip: 101,
    arm: 39,
    thigh: 60,
  },
];

const performanceData = [
  { metric: "Força", value: 78 },
  { metric: "Resistência", value: 85 },
  { metric: "Flexibilidade", value: 65 },
  { metric: "Disciplina", value: 92 },
  { metric: "Evolução", value: 88 },
];

const attendanceData = [
  { month: "Set", workouts: 18 },
  { month: "Out", workouts: 20 },
  { month: "Nov", workouts: 22 },
  { month: "Dez", workouts: 19 },
  { month: "Jan", workouts: 21 },
  { month: "Fev", workouts: 20 },
];

const weightProgressData = assessmentHistory.reverse().map((a) => ({
  date: a.date,
  weight: a.weight,
}));

const latestAssessment = assessmentHistory[assessmentHistory.length - 1];
const previousAssessment = assessmentHistory[assessmentHistory.length - 2];

const weightChange = latestAssessment.weight - previousAssessment.weight;
const waistChange = latestAssessment.waist - previousAssessment.waist;

export function StudentPerformance() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("id") || "1";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/students")}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Desempenho do Aluno
          </h1>
          <p className="text-muted-foreground">{studentInfo.name}</p>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Email</p>
            <p className="font-medium">{studentInfo.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Telefone</p>
            <p className="font-medium">{studentInfo.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Modalidade</p>
            <p className="font-medium">{studentInfo.modality}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
              {studentInfo.status}
            </span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-primary p-3 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            {weightChange < 0 ? (
              <TrendingDown className="w-5 h-5 text-green-700" />
            ) : (
              <TrendingUp className="w-5 h-5 text-red-700" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">Peso Atual</p>
          <p className="text-2xl font-bold">{latestAssessment.weight} kg</p>
          <p
            className={`text-sm mt-1 ${
              weightChange < 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {weightChange > 0 ? "+" : ""}
            {weightChange.toFixed(1)} kg
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-accent p-3 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            {waistChange < 0 ? (
              <TrendingDown className="w-5 h-5 text-green-700" />
            ) : (
              <TrendingUp className="w-5 h-5 text-red-700" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">Cintura</p>
          <p className="text-2xl font-bold">{latestAssessment.waist} cm</p>
          <p
            className={`text-sm mt-1 ${
              waistChange < 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {waistChange > 0 ? "+" : ""}
            {waistChange} cm
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-primary p-3 rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Treinos/Mês</p>
          <p className="text-2xl font-bold">20</p>
          <p className="text-sm text-green-700 mt-1">83% frequência</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-accent p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Tempo de Casa</p>
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm text-muted-foreground mt-1">meses</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Progress */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold mb-4">Evolução de Peso</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[80, 90]} />
              <Tooltip formatter={(value: number) => `${value} kg`} />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#DC0A2D"
                strokeWidth={2}
                dot={{ fill: "#DC0A2D", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold mb-4">Frequência Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value} treinos`} />
              <Bar dataKey="workouts" fill="#DC0A2D" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Radar */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-bold mb-4">Avaliação de Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={performanceData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Performance"
              dataKey="value"
              stroke="#DC0A2D"
              fill="#DC0A2D"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Measurements Table */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold">Histórico de Medidas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm">Data</th>
                <th className="text-left p-4 text-sm">Peso</th>
                <th className="text-left p-4 text-sm">IMC</th>
                <th className="text-left p-4 text-sm">Peitoral</th>
                <th className="text-left p-4 text-sm">Cintura</th>
                <th className="text-left p-4 text-sm">Quadril</th>
                <th className="text-left p-4 text-sm">Braço</th>
                <th className="text-left p-4 text-sm">Coxa</th>
              </tr>
            </thead>
            <tbody>
              {assessmentHistory.reverse().map((assessment, index) => (
                <tr key={index} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium">{assessment.date}</td>
                  <td className="p-4">{assessment.weight} kg</td>
                  <td className="p-4">{assessment.imc}</td>
                  <td className="p-4">{assessment.chest} cm</td>
                  <td className="p-4">{assessment.waist} cm</td>
                  <td className="p-4">{assessment.hip} cm</td>
                  <td className="p-4">{assessment.arm} cm</td>
                  <td className="p-4">{assessment.thigh} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />
          Agendar Avaliação
        </button>
        <button className="flex-1 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Dumbbell className="w-5 h-5" />
          Criar Novo Treino
        </button>
        <button className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Award className="w-5 h-5" />
          Enviar Feedback
        </button>
      </div>
    </div>
  );
}
