import { CreditCard, CheckCircle, XCircle, Clock, QrCode } from "lucide-react";

interface Payment {
  id: number;
  month: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "Pago" | "Pendente" | "Atrasado";
  method?: "PIX" | "Cartão de Crédito";
}

const payments: Payment[] = [
  {
    id: 1,
    month: "Março 2026",
    amount: 200.0,
    dueDate: "01/03/2026",
    paidDate: "01/03/2026",
    status: "Pago",
    method: "PIX",
  },
  {
    id: 2,
    month: "Fevereiro 2026",
    amount: 200.0,
    dueDate: "01/02/2026",
    paidDate: "01/02/2026",
    status: "Pago",
    method: "Cartão de Crédito",
  },
  {
    id: 3,
    month: "Janeiro 2026",
    amount: 200.0,
    dueDate: "01/01/2026",
    paidDate: "02/01/2026",
    status: "Pago",
    method: "PIX",
  },
  {
    id: 4,
    month: "Dezembro 2025",
    amount: 200.0,
    dueDate: "01/12/2025",
    paidDate: "01/12/2025",
    status: "Pago",
    method: "PIX",
  },
];

const nextPayment = {
  month: "Abril 2026",
  amount: 200.0,
  dueDate: "01/04/2026",
};

export function StudentPayments() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Pagamentos</h1>
        <p className="text-muted-foreground">Gerencie suas mensalidades</p>
      </div>

      {/* Payment Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-green-600 p-3 rounded-lg">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-green-900">Pagamentos em Dia</h3>
            <p className="text-sm text-green-700">
              Todas as mensalidades estão quitadas
            </p>
          </div>
        </div>
      </div>

      {/* Next Payment */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-bold">Próximo Vencimento</h3>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold mb-1">R$ {nextPayment.amount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              {nextPayment.month} - Vencimento: {nextPayment.dueDate}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5" />
              Pagar com PIX
            </button>
            <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" />
              Pagar com Cartão
            </button>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold">Histórico de Pagamentos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm">Mês</th>
                <th className="text-left p-4 text-sm hidden sm:table-cell">Vencimento</th>
                <th className="text-left p-4 text-sm hidden md:table-cell">Pagamento</th>
                <th className="text-left p-4 text-sm hidden lg:table-cell">Método</th>
                <th className="text-left p-4 text-sm">Valor</th>
                <th className="text-left p-4 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium">{payment.month}</td>
                  <td className="p-4 hidden sm:table-cell">{payment.dueDate}</td>
                  <td className="p-4 hidden md:table-cell">{payment.paidDate || "-"}</td>
                  <td className="p-4 hidden lg:table-cell">{payment.method || "-"}</td>
                  <td className="p-4">R$ {payment.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                        payment.status === "Pago"
                          ? "bg-green-100 text-green-700"
                          : payment.status === "Pendente"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status === "Pago" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : payment.status === "Pendente" ? (
                        <Clock className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-lg">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold">Pagamento via PIX</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Pagamento instantâneo com confirmação automática através da API do Banco do
            Brasil
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-accent p-3 rounded-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold">Cartão de Crédito</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Pagamento processado de forma segura através da API do Banco do Brasil
          </p>
        </div>
      </div>
    </div>
  );
}
