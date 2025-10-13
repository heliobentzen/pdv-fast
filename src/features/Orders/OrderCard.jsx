import React from 'react';
import ProductCard from '../../components/ProductCard';
import './OrderCard.css';

const OrderCard = ({ order, onStatusChange }) => {
  if (!order) {
    return null;
  }

  const { id, customerName, items, total, status, createdAt } = order;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-badge status-completed';
      case 'pending':
        return 'status-badge status-pending';
      case 'cancelled':
        return 'status-badge status-cancelled';
      default:
        return 'status-badge';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pendente',
      completed: 'Concluído',
      cancelled: 'Cancelado',
    };
    return statusMap[status] || status;
  };

  const handleStatusChange = (newStatus) => {
    if (onStatusChange) {
      onStatusChange(id, newStatus);
    }
  };

  return (
    <div className="order-card">
      <div className="order-header">
        <div className="order-info">
          <h3 className="order-title">Pedido #{id}</h3>
          <p className="order-customer">Cliente: {customerName}</p>
          <p className="order-date">
            {new Date(createdAt).toLocaleString('pt-BR')}
          </p>
        </div>
        <span className={getStatusBadgeClass(status)}>
          {getStatusText(status)}
        </span>
      </div>

      <div className="order-items">
        <h4>Itens:</h4>
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      <div className="order-footer">
        <div className="order-total">
          <span>Total:</span>
          <strong>R$ {total.toFixed(2)}</strong>
        </div>
        {status === 'pending' && (
          <div className="order-actions">
            <button
              className="btn btn-success"
              onClick={() => handleStatusChange('completed')}
            >
              Concluir
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleStatusChange('cancelled')}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
