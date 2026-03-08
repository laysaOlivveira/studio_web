import { TrendingDown, TrendingUp, Calendar, Ruler, Weight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Assessment {
  id: number;
  date: string;
  weight: number;
  height: number;
  imc: number;
  chest: number;
  waist: number;
  hip: number;
  arm: number;
  thigh: number;
}

const assessments: Assessment[] = [
  {
    id: 1,
    date: "01/02/2026",
    weight: 82.5,
    height: 1.75,
    imc: 26.9,
    chest: 102,
    waist: 88,
    hip: 98,
    arm: 38,
    thigh: 58,
  },
  {
    id: 2,
    date: "01/01/2026",
    weight: 84.0,
    height: 1.75,
    imc: 27.4,
    chest: 104,
    waist: 91,
    hip: 100,
    arm: 38.5,
    thigh: 59,
  },
  {
    id: 3,
    date: "01/12/2025",
    weight: 85.5,
    height: 1.75,
    imc: 27.9,
    chest: 105,
    waist: 93,
    hip: 101,
    arm: 39,
    thigh: 60,
  },
];

const latestAssessment = assessments[0];
const previousAssessment = assessments[1];

const weightChange = latestAssessment.weight - previousAssessment.weight;
const waistChange = latestAssessment.waist - previousAssessment.waist;

const weightChartData = assessments.reverse().map((a) => ({
  date: a.date,
  weight: a.weight,
}));

export function StudentAssessments() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Minhas Avaliações</h1>
          <p className="text-muted-foreground">Acompanhe sua evolução física</p>
        </div>
      </div>

      {/* Next Assessment Alert */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
        <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-primary mb-1">Próxima Avaliação Agendada</p>
          <p className="text-sm">05/03/2026 às 14:00</p>
        </div>
      </div>

      {/* Evolution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-primary p-3 rounded-lg">
              <Weight className="w-6 h-6 text-white" />
            </div>
            {weightChange < 0 ? (
              <TrendingDown className="w-5 h-5 text-green-700" />
            ) : (
              <TrendingUp className="w-5 h-5 text-red-700" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">Peso</p>
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
              <Ruler className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">IMC</p>
          <p className="text-2xl font-bold">{latestAssessment.imc.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground mt-1">Sobrepeso</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-primary p-3 rounded-lg">
              <Ruler className="w-6 h-6 text-white" />
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
            <div className="bg-accent p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Última Avaliação</p>
          <p className="text-lg font-bold">{latestAssessment.date}</p>
        </div>
      </div>

      {/* Weight Evolution Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-bold mb-4">Evolução de Peso</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weightChartData}>
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

      {/* Measurements Comparison */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold">Comparativo de Medidas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm">Medida</th>
                <th className="text-left p-4 text-sm">Atual</th>
                <th className="text-left p-4 text-sm">Anterior</th>
                <th className="text-left p-4 text-sm">Diferença</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">Peitoral</td>
                <td className="p-4">{latestAssessment.chest} cm</td>
                <td className="p-4">{previousAssessment.chest} cm</td>
                <td className="p-4">
                  <span
                    className={
                      latestAssessment.chest < previousAssessment.chest
                        ? "text-red-700"
                        : "text-green-700"
                    }
                  >
                    {latestAssessment.chest - previousAssessment.chest > 0 ? "+" : ""}
                    {latestAssessment.chest - previousAssessment.chest} cm
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">Cintura</td>
                <td className="p-4">{latestAssessment.waist} cm</td>
                <td className="p-4">{previousAssessment.waist} cm</td>
                <td className="p-4">
                  <span
                    className={
                      latestAssessment.waist < previousAssessment.waist
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  >
                    {latestAssessment.waist - previousAssessment.waist > 0 ? "+" : ""}
                    {latestAssessment.waist - previousAssessment.waist} cm
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">Quadril</td>
                <td className="p-4">{latestAssessment.hip} cm</td>
                <td className="p-4">{previousAssessment.hip} cm</td>
                <td className="p-4">
                  <span
                    className={
                      latestAssessment.hip < previousAssessment.hip
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  >
                    {latestAssessment.hip - previousAssessment.hip > 0 ? "+" : ""}
                    {latestAssessment.hip - previousAssessment.hip} cm
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 font-medium">Braço</td>
                <td className="p-4">{latestAssessment.arm} cm</td>
                <td className="p-4">{previousAssessment.arm} cm</td>
                <td className="p-4">
                  <span
                    className={
                      latestAssessment.arm < previousAssessment.arm
                        ? "text-red-700"
                        : "text-green-700"
                    }
                  >
                    {latestAssessment.arm - previousAssessment.arm > 0 ? "+" : ""}
                    {latestAssessment.arm - previousAssessment.arm} cm
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Coxa</td>
                <td className="p-4">{latestAssessment.thigh} cm</td>
                <td className="p-4">{previousAssessment.thigh} cm</td>
                <td className="p-4">
                  <span
                    className={
                      latestAssessment.thigh < previousAssessment.thigh
                        ? "text-red-700"
                        : "text-green-700"
                    }
                  >
                    {latestAssessment.thigh - previousAssessment.thigh > 0 ? "+" : ""}
                    {latestAssessment.thigh - previousAssessment.thigh} cm
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Assessment History */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold">Histórico de Avaliações</h3>
        </div>
        <div className="divide-y divide-border">
          {assessments.reverse().map((assessment) => (
            <div
              key={assessment.id}
              className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-bold mb-1">{assessment.date}</p>
                <p className="text-sm text-muted-foreground">
                  Peso: {assessment.weight} kg | IMC: {assessment.imc.toFixed(1)}
                </p>
              </div>
              <button className="text-primary hover:underline text-sm">Ver detalhes</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
