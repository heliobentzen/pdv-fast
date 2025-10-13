// Mock data for orders
const mockOrders = [
  {
    id: 1,
    customerName: 'João Silva',
    items: [
      { id: 1, name: 'Produto A', quantity: 2, price: 50.00 },
      { id: 2, name: 'Produto B', quantity: 1, price: 30.00 },
    ],
    total: 130.00,
    status: 'pending',
    createdAt: new Date('2025-10-13T10:00:00'),
  },
  {
    id: 2,
    customerName: 'Maria Santos',
    items: [
      { id: 3, name: 'Produto C', quantity: 3, price: 25.00 },
    ],
    total: 75.00,
    status: 'completed',
    createdAt: new Date('2025-10-13T11:30:00'),
  },
  {
    id: 3,
    customerName: 'Pedro Costa',
    items: [
      { id: 4, name: 'Produto D', quantity: 1, price: 100.00 },
      { id: 5, name: 'Produto E', quantity: 2, price: 45.00 },
    ],
    total: 190.00,
    status: 'pending',
    createdAt: new Date('2025-10-13T12:00:00'),
  },
];

/**
 * Fetch all orders
 * @returns {Promise<Array>} List of orders
 */
export const fetchOrders = async () => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockOrders]);
    }, 500);
  });
};

/**
 * Fetch a single order by ID
 * @param {number} id - Order ID
 * @returns {Promise<Object|null>} Order object or null if not found
 */
export const fetchOrderById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = mockOrders.find((order) => order.id === id);
      resolve(order || null);
    }, 300);
  });
};

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Created order
 */
export const createOrder = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder = {
        id: mockOrders.length + 1,
        ...orderData,
        status: 'pending',
        createdAt: new Date(),
      };
      mockOrders.push(newOrder);
      resolve(newOrder);
    }, 400);
  });
};

/**
 * Update order status
 * @param {number} id - Order ID
 * @param {string} status - New status
 * @returns {Promise<Object|null>} Updated order or null if not found
 */
export const updateOrderStatus = async (id, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderIndex = mockOrders.findIndex((order) => order.id === id);
      if (orderIndex !== -1) {
        mockOrders[orderIndex].status = status;
        resolve(mockOrders[orderIndex]);
      } else {
        resolve(null);
      }
    }, 300);
  });
};

/**
 * Delete an order
 * @param {number} id - Order ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteOrder = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderIndex = mockOrders.findIndex((order) => order.id === id);
      if (orderIndex !== -1) {
        mockOrders.splice(orderIndex, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
};
