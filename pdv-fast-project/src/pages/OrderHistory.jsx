import { useState, useEffect } from "react";
import { Eye, Printer, RefreshCw, Download } from "lucide-react";
import { api } from "../services/api";
import Table from "../components/ui/Table";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Card from "../components/ui/Card";
import { useToast } from "../contexts/ToastContext";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      const data = await api.get("/orders");

      // Ordenar do mais recente para o mais antigo
      const sorted = data.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
      );

      setOrders(sorted);
    } catch (error) {
      showToast("Erro ao carregar pedidos", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Filtrar pedidos por cliente ou número
  const filteredOrders = orders.filter((order) => {
    const searchLower = search.toLowerCase();
    const matchClient = order.clientName?.toLowerCase().includes(searchLower);
    const matchNumber = String(order.orderNumber).includes(search);
    const matchPhone = order.clientPhone?.includes(search);

    return matchClient || matchNumber || matchPhone;
  });

  // Estatísticas
  const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const todayOrders = orders.filter(order => {
    const orderDate = new Date(order.timestamp).toDateString();
    const today = new Date().toDateString();
    return orderDate === today;
  });

  function handleView(order) {
    // TODO: Implementar modal com detalhes do pedido
    showToast("Funcionalidade em desenvolvimento", "info");
    console.log("Ver pedido:", order);
  }

  function handleReprint(order) {
    // TODO: Integrar com impressora
    showToast("Imprimindo pedido...", "success");
    console.log("Imprimir:", order);
  }

  function handleExport() {
    // TODO: Exportar para Excel/CSV
    showToast("Exportação em desenvolvimento", "info");
  }

  // Definição das colunas da tabela
  const columns = [
    {
      header: "Nº Pedido",
      field: "orderNumber",
      render: (row) => (
        <span className="font-mono font-bold text-orange-400">
          #{row.orderNumber}
        </span>
      ),
    },
    {
      header: "Cliente",
      field: "clientName",
      render: (row) => (
        <div>
          <p className="font-medium">{row.clientName}</p>
          <p className="text-xs text-gray-400">{row.clientPhone}</p>
        </div>
      ),
    },
    {
      header: "Itens",
      field: "items",
      render: (row) => (
        <span className="text-gray-300">
          {row.items?.length || 0} {row.items?.length === 1 ? "item" : "itens"}
        </span>
      ),
    },
    {
      header: "Total",
      field: "total",
      render: (row) => (
        <span className="text-orange-400 font-bold">
          R$ {(row.total || 0).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Pagamento",
      field: "payment",
      render: (row) => {
        const paymentIcons = {
          money: "💵",
          pix: "📱",
          credit: "💳",
          debit: "💳",
        };

        return (
          <span className="capitalize">
            {paymentIcons[row.payment] || ""} {row.payment || "—"}
          </span>
        );
      },
    },
    {
      header: "Data/Hora",
      field: "timestamp",
      render: (row) => {
        const date = new Date(row.timestamp);
        return (
          <div className="text-sm">
            <p>{date.toLocaleDateString("pt-BR")}</p>
            <p className="text-xs text-gray-400">
              {date.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
          </div>
        );
      },
    },
    {
      header: "Ações",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            onClick={() => handleView(row)}
            variant="ghost"
            className="p-2"
            title="Ver detalhes"
          >
            <Eye size={16} />
          </Button>

          <Button
            onClick={() => handleReprint(row)}
            variant="secondary"
            className="p-2"
            title="Reimprimir"
          >
            <Printer size={16} />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Loader text="Carregando histórico de pedidos..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* CABEÇALHO */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-orange-400">
            📋 Histórico de Pedidos
          </h1>
          <p className="text-gray-400 mt-1">
            {filteredOrders.length} {filteredOrders.length === 1 ? "pedido encontrado" : "pedidos encontrados"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={loadOrders}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Atualizar
          </Button>

          <Button
            onClick={handleExport}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Exportar
          </Button>
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-gray-400 text-sm mb-1">Total de Pedidos</p>
          <p className="text-3xl font-bold text-orange-400">{orders.length}</p>
        </Card>

        <Card className="text-center">
          <p className="text-gray-400 text-sm mb-1">Pedidos Hoje</p>
          <p className="text-3xl font-bold text-orange-400">{todayOrders.length}</p>
        </Card>

        <Card className="text-center">
          <p className="text-gray-400 text-sm mb-1">Total Vendido</p>
          <p className="text-3xl font-bold text-green-400">
            R$ {totalSales.toFixed(2)}
          </p>
        </Card>
      </div>

      {/* BUSCA */}
      <Card>
        <Input
          placeholder="Buscar por cliente, telefone ou número do pedido..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      {/* TABELA */}
      <Table
        data={filteredOrders}
        columns={columns}
        rowKey="id"
        emptyMessage="Nenhum pedido encontrado"
      />
    </div>
  );
}