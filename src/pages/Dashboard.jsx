import React from 'react';
import OrderList from '../features/Orders/OrderList';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>PDV Fast - Dashboard</h1>
        <p className="dashboard-subtitle">Sistema de Ponto de Venda</p>
      </header>
      <main className="dashboard-content">
        <OrderList />
      </main>
    </div>
  );
};

export default Dashboard;
