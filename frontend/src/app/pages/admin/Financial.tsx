import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Download, Filter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Set", income: 22000, expenses: 8000 },
  { month: "Out", income: 24500, expenses: 8500 },
  { month: "Nov", income: 26000, expenses: 9000 },
  { month: "Dez", income: 25500, expenses: 9200 },
  { month: "Jan", income: 27000, expenses: 8800 },
  { month: "Fev", income: 28400, expenses: 9500 },
];

interface Transaction {
  id: number;
  studentName: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  status: "Confirmado" | "Pendente" | "Atrasado";
  method?: "PIX" | "Cartão de Crédito";
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    studentName: "João Silva",
    type: "income",
    amount: 200.0,
    description: "Mensalidade Março",
    date: "01/03/2026",
    status: "Confirmado",
    method: "PIX",
  },
  {
    id: 2,
    studentName: "Maria Santos",
    type: "income",
    amount: 200.0,
    description: "Mensalidade Março",
    date: "01/03/2026",
    status: "Confirmado",
    method: "Cartão de Crédito",
  },
  {
    id: 3,
    studentName: "Despesa",
    type: "expense",
    amount: 1500.0,
    description: "Aluguel do espaço",
    date: "28/02/2026",
    status: "Confirmado",
  },
  {
    id: 4,
    studentName: "Ana Oliveira",
    type: "income",
    amount: 200.0,
    description: "Mensalidade Março",
    date: "05/03/2026",
    status: "Pendente",
    method: "PIX",
  },
  {
    id: 5,
    studentName: "Pedro Costa",
    type: "income",
    amount: 200.0,
    description: "Mensalidade Fevereiro",
    date: "15/02/2026",
    status: "Atrasado",
    method: "PIX",
  },
];

export function AdminFinancial() {
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");

  const filteredTransactions = mockTransactions.filter(
    (t) => filterType === "all" || t.type === filterType
  );

  const totalIncome = revenueData[revenueData.length - 1].income;
  const totalExpenses = revenueData[revenueData.length - 1].expenses;
  const netRevenue = totalIncome - totalExpenses;
  const growthRate = 8.5;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Sistema Financeiro</h1>
          <p className="text-muted-foreground">Controle completo de fluxo de caixa</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Exportar Relatório
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-700" />
            </div>
            <span className="text-green-700 text-sm font-medium">+{growthRate}%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Receita Total</p>
          <p className="text-2xl font-bold">R$ {totalIncome.toLocaleString("pt-BR")}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-700" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Despesas</p>
          <p className="text-2xl font-bold">R$ {totalExpenses.toLocaleString("pt-BR")}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-primary p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Lucro Líquido</p>
          <p className="text-2xl font-bold">R$ {netRevenue.toLocaleString("pt-BR")}</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-bold mb-4">Fluxo de Caixa (6 meses)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2}
              name="Receita"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#DC0A2D"
              strokeWidth={2}
              name="Despesas"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold">Movimentações</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">Todas</option>
              <option value="income">Entradas</option>
              <option value="expense">Saídas</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm">Descrição</th>
                <th className="text-left p-4 text-sm hidden sm:table-cell">Data</th>
                <th className="text-left p-4 text-sm hidden md:table-cell">Método</th>
                <th className="text-left p-4 text-sm">Valor</th>
                <th className="text-left p-4 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border last:border-0">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{transaction.studentName}</p>
                      <p className="text-sm text-muted-foreground">{transaction.description}</p>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">{transaction.date}</td>
                  <td className="p-4 hidden md:table-cell">{transaction.method || "-"}</td>
                  <td className="p-4">
                    <span
                      className={
                        transaction.type === "income" ? "text-green-700" : "text-red-700"
                      }
                    >
                      {transaction.type === "income" ? "+" : "-"} R${" "}
                      {transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        transaction.status === "Confirmado"
                          ? "bg-green-100 text-green-700"
                          : transaction.status === "Pendente"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
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
