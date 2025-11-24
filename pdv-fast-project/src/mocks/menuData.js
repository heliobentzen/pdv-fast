//Mock de Menu e Produtos


const MENU_MOCK = [
  { id: 101, name: 'Picanha Grelhada', description: 'Acompanha arroz e fritas.', price: 79.90, category: 'Prato Principal', available: true },
  { id: 102, name: 'Salmão com Ervas', description: 'Servido com legumes grelhados.', price: 65.00, category: 'Prato Principal', available: true },
  { id: 201, name: 'Refrigerante Cola', description: 'Lata 350ml.', price: 6.50, category: 'Bebida', available: true },
  { id: 301, name: 'Mousse de Chocolate', description: 'Mousse de chocolate meio amargo.', price: 18.00, category: 'Sobremesa', available: false }, // Indisponível para teste
];
//let currentMenu = [...MENU_MOCK]; // Use uma cópia para simular a edição