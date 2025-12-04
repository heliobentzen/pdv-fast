// //Componente raiz da aplicação

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App 


import { useState } from "react";

// Imports dos componentes (cada um na sua pasta)
import Input from "./components/input/Input";
import Checkbox from "./components/checkbox/Checkbox";
import Radio from "./components/radio/Radio";
import {
  SalvarButton,
  AdicionarButton,
  CancelarButton,
  FinalizarButton,
  VoltarButton,
} from "./components/button/Button";

function App() {
  // Estados
  const [mesa, setMesa] = useState("");
  const [adicionais, setAdicionais] = useState([]);
  const [formaPagamento, setFormaPagamento] = useState("");

  // Lista de adicionais
  const adicionaisDisponiveis = ["Queijo extra", "Bacon", "Molho especial", "Picles"];

  // Funções
  const toggleAdicional = (item) => {
    if (adicionais.includes(item)) {
      setAdicionais(adicionais.filter((a) => a !== item));
    } else {
      setAdicionais([...adicionais, item]);
    }
  };

  const handlePagamentoChange = (e) => {
    setFormaPagamento(e.target.value);
  };

  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-orange-500">Novo pedido</h1>

      {/* Input */}
      <Input
        label="Mesa"
        value={mesa}
        onChange={(e) => setMesa(e.target.value)}
        placeholder="Digite o número ou nome da mesa"
      />

      {/* Checkboxes */}
      <div>
        <h2 className="font-semibold mb-2">Adicionais</h2>
        {adicionaisDisponiveis.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={adicionais.includes(item)}
            onChange={() => toggleAdicional(item)}
          />
        ))}
      </div>

      {/* Radios */}
      <div>
        <h2 className="font-semibold mb-2">Forma de Pagamento</h2>
        <Radio
          label="Dinheiro"
          name="pagamento"
          value="Dinheiro"
          checked={formaPagamento === "Dinheiro"}
          onChange={handlePagamentoChange}
        />
        <Radio
          label="Cartão"
          name="pagamento"
          value="Cartão"
          checked={formaPagamento === "Cartão"}
          onChange={handlePagamentoChange}
        />
        <Radio
          label="Pix"
          name="pagamento"
          value="Pix"
          checked={formaPagamento === "Pix"}
          onChange={handlePagamentoChange}
        />
      </div>

      {/* Botões */}
      <div className="flex flex-wrap gap-2">
        <SalvarButton onClick={() => alert("Pedido salvo!")} />
        <AdicionarButton onClick={() => alert("Item adicionado!")} />
        <CancelarButton onClick={() => alert("Pedido cancelado!")} />
        <FinalizarButton onClick={() => alert("Pedido finalizado!")} />
        <VoltarButton onClick={() => alert("Voltando...")} />
      </div>
    </div>
  );
}

export default App;