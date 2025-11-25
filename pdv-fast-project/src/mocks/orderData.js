//Mock de Pedidos

const ORDERS_MOCK = [
  {
    id: 'PED_2025001', tableId: 5, waiterId: 'u003', status: 'Aberto',
    items: [{ productId: 102, name: 'Salmão com Ervas', qty: 2, price: 65.00 }],
    subtotal: 130.00, serviceFee: 13.00, total: 143.00, paymentMethod: null, closingTime: null
  },
];
let TABLES_MOCK = [
  { id: 1, capacity: 2, status: 'Livre', orderId: null },
  { id: 5, capacity: 4, status: 'Ocupada', orderId: 'PED_2025001', startTime: new Date() },
  { id: 10, capacity: 8, status: 'Aguardando Conta', orderId: 'PED_2025002', startTime: new Date() }
];