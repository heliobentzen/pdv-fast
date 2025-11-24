# Fluxo de telas #

1.Login

- *usuario (email) // nome e telefone?* // login com conta google // *QR Code*
- senha (inserir / criar senha) X
- botão criar senha X
- *botão entrar*

2.Menu

- lista de produtos
- card do produto (imagem, descrição, valor, observação sobre o produto, + e - item, adicionar item)

3.Carrinho

- verificar compra
- forma de pagamento
- fazer o pagamento

## Implementações Futuras ##

1.Autenticação e autorização (cliente, atendente, admin)
2.Dashboard de relatórios financeiros

## Pendências ##

- Já temos uma API? (não)

## Links ##

Trello: <https://trello.com/invite/b/691388a4641e1a8652f29757/ATTI0aa57dcb23d7505e4f6cceb639b8ecbd296AE723/pdv-sistema-gestor-de-pedidos>

____________________________________

## Tradução - Boilerplate - PDV Fast ##

Visão Geral (Overview)
Este Pull Request (PR) cria um aplicativo boilerplate React completo para o sistema PDV Fast (Ponto de Venda), utilizando a estrutura de diretórios exata especificada nos requisitos. O aplicativo oferece um sistema de gerenciamento de pedidos totalmente funcional com dados simulados (mock data), recursos de filtragem e atualizações de status em tempo real.

## Estrutura Implementada (Structure Implemented) ##

src/
 ├── api/
 │    └── orders.js        # Funções de API/simuladas para gerenciamento de pedidos
 ├── components/           # Componentes reutilizáveis (UI Primitiva)
 │    └── ProductCard.jsx  # Componente reutilizável para o cartão de produto
 ├── features/
 │    └── Orders/
 │         ├── OrderList.jsx   # Lista de pedidos com funcionalidade de filtragem
 │         └── OrderCard.jsx   # Componente de exibição de pedido individual
 ├── pages/
 │    └── Dashboard.jsx    # Página principal do painel de controle (Dashboard)
 ├── App.jsx              # Componente raiz da aplicação
 └── main.jsx             # Ponto de entrada da aplicação

## Principais Recursos (Key Features) ##

Camada de API Simulada (src/api/orders.js)

- Dados de exemplo com 3 pedidos realistas, incluindo nomes de clientes, produtos e totais.

- Operações CRUD (Criar, Ler, Atualizar, Excluir) completas: fetchOrders, fetchOrderById, createOrder, updateOrderStatus, deleteOrder.

- Comportamento assíncrono simulado com atrasos apropriados para uma interação de API realista.

- Geração robusta de ID usando Math.max() para evitar IDs duplicados, mesmo após exclusões.

## Arquitetura de Componentes (Component Architecture) ##

ProductCard - Exibe informações de produtos individuais com:

- Nome do produto, quantidade e preço unitário.

- Subtotal calculado.

- Efeitos de hover para melhor experiência do usuário.

OrderCard - Exibe detalhes completos do pedido com:

- Informações do cliente e registro de data/hora (timestamp).

- Lista de produtos pedidos usando o ProductCard.

- Crachás de status com código de cores (Pendente: Amarelo, Concluído: Verde, Cancelado: Vermelho).

- Botões de ação (Concluir/Cancelar) para pedidos pendentes.

OrderList - Interface principal de gerenciamento de pedidos com:

- Exibição de todos os pedidos em uma lista limpa e rolável (scrollable).

- Funcionalidade de filtro para Todos, Pendentes e Concluídos.

- Atualizações de contagem em tempo real nos botões de filtro.

- Estados de carregamento (loading states) e tratamento de erros.

- Notificações de erro com descarte automático (auto-dismissing) e animações suaves.

Dashboard - Página principal profissional, apresentando:

- Cabeçalho em gradient (eye-catching gradient header) que chama a atenção.

- Identidade visual da aplicação (branding).

- Componente de lista de pedidos integrado.

## Destaques Técnicos (Technical Highlights) ##

- Pilha Tecnológica Moderna: Construído com React 19.2.0 e Vite 7.1.9 para desempenho ideal.

- Arquitetura Limpa: Clara separação de preocupações (separation of concerns) com pastas dedicadas para API, componentes, recursos (features) e páginas.

- Melhores Práticas React: Componentes funcionais com hooks (useState, useEffect, useRef).

- Segurança de Memória: Limpeza adequada de timers usando useRef para prevenir vazamentos de memória (memory leaks).

- UX Amigável: Substituição de caixas de diálogo alert por notificações elegantes no estilo toast com descarte automático.

- Estilo Profissional: CSS moderno com gradients, sombras, transições e design responsivo.

Pronto para Produção: Compilação bem-sucedida sem erros ou avisos.

## Garantia de Qualidade (Quality Assurance) ##

Todo o feedback da revisão de código foi abordado:

✅ Substituídas as chamadas alert() por notificações amigáveis ao usuário.

✅ Corrigida a geração de ID para usar Math.max(), prevenindo duplicatas após exclusões.

✅ Adicionada prevenção de vazamento de memória com limpeza adequada do timeout.

✅ Removida complexidade de código desnecessária.

## Captura de Tela (Screenshot) ##

A captura de tela mostra o painel de controle (Dashboard) do PDV Fast totalmente funcional com:

- Cabeçalho em gradient profissional com a identidade visual da aplicação.

- Botões de filtro mostrando contagens de pedidos (Todos, Pendentes, Concluídos).

- Três pedidos de exemplo com detalhes completos.

- Crachás de status com código de cores.

- Botões de ação para gerenciamento de pedidos.

- Design de UI limpo e moderno.

____________________________________

## Comandos Git ##

- git remote -v

Você usa esse comando para verificar se o seu repositório está apontando para o lugar certo antes de fazer um push ou um pull.

- git remote set-url <nome_do_remoto> <nova_url>

Este comando é usado para mudar ou atualizar a URL de um repositório remoto existente.
Mudar de HTTP/HTTPS para SSH (e vice-versa).
Corrigir um erro de digitação na URL do repositório.
Migrar o projeto de uma plataforma de hospedagem (como mudar de Bitbucket para GitHub).
