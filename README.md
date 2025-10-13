# 🍔 PDV - Fast

Este projeto é um **exemplo educacional** de como estruturar um frontend em **React** para um sistema de pedidos no setor de alimentação (restaurantes, bares, lanchonetes).  
O objetivo é mostrar como organizar o código, consumir dados de uma API (ou mock JSON) e modularizar as features.

---

## 🎯 Objetivos do sistema
- Organizar pedidos e comunicação entre **caixa, cozinha e atendimento**.
- Melhorar a eficiência no atendimento ao cliente.
- Exibir **fluxo de pedidos em tempo real**.
- Fornecer **relatórios claros** para gestores.
- Ser **responsivo**, funcionando bem em desktop, tablet e celular.

---

## 🛠️ Tecnologias utilizadas
- [React](https://react.dev/)  
- [Vite](https://vitejs.dev/)  
- [React Query (TanStack)](https://tanstack.com/query/latest)  
- [Axios](https://axios-http.com/)  
- [json-server](https://github.com/typicode/json-server)  

---

## 📦 Pré-requisitos
- Node.js (versão LTS recomendada)  
- npm ou yarn  

## Mock API

{
  "orders": [
    { "id": 1, "product": "Hambúrguer", "status": "pendente" },
    { "id": 2, "product": "Pizza", "status": "em preparo" }
  ],
  "products": [
    { "id": 1, "name": "Hambúrguer", "price": 25 },
    { "id": 2, "name": "Pizza", "price": 40 }
  ]
}

Verifique:
```bash
node -v
npm -v

