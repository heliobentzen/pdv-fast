import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const cardapio = {
  pratos: [
    { id: 1, nome: "Hambúrguer Clássico", descricao: "Pão, carne, queijo, alface e tomate", preco: 25.0 },
    { id: 2, nome: "Batata Frita", descricao: "Porção média, crocante", preco: 12.0 },
    { id: 3, nome: "Salada Caesar", descricao: "Alface, parmesão, croutons", preco: 18.0 },
  ],
  bebidas: [
    { id: 101, nome: "Refrigerante", descricao: "Lata 350ml", preco: 7.0 },
    { id: 102, nome: "Suco Natural", descricao: "Copão 500ml", preco: 10.0 },
    { id: 103, nome: "Água Mineral", descricao: "500ml", preco: 5.0 },
  ],
};

const Pedidos = () => {
  const [mesa, setMesa] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [selecionados, setSelecionados] = useState({});
  const [etapa, setEtapa] = useState("selecionarMesa");

  const handleQuantidadeChange = (id, quantidade) => {
    setSelecionados(prev => {
      const clone = { ...prev };
      if (quantidade < 1) {
        delete clone[id];
      } else {
        clone[id] = quantidade;
      }
      return clone;
    });
  };

  const totalPedido = () => {
    return Object.entries(selecionados).reduce((acc, [id, qtd]) => {
      const item =
        cardapio.pratos.find(p => p.id === +id) ||
        cardapio.bebidas.find(b => b.id === +id);
      return acc + item.preco * qtd;
    }, 0);
  };

  const enviarPedido = () => {
    if (!mesa.trim()) {
      toast.error("Por favor, selecione o número da mesa.");
      setEtapa("selecionarMesa");
      return;
    }
    if (!nomeCliente.trim()) {
      toast.error("Por favor, informe o nome do cliente.");
      setEtapa("selecionarMesa");
      return;
    }
    if (Object.keys(selecionados).length === 0) {
      toast.error("Selecione ao menos um item do cardápio.");
      return;
    }
    toast.success(Pedido para mesa ${mesa} enviado com sucesso!);
    setMesa("");
    setNomeCliente("");
    setTelefoneCliente("");
    setSelecionados({});
    setEtapa("selecionarMesa");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-6xl bg-neutral-900 rounded-xl shadow-lg p-8 flex flex-col gap-8">
        {/* Logo */}
        <div className="flex justify-center items-center h-20">
          <span className="text-6xl">🍔</span>
        </div>

        <h1 className="text-4xl font-bold text-white text-center mb-6">Fazer Pedido</h1>

        {etapa === "selecionarMesa" && (
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            <label className="text-white font-semibold text-lg">Número da Mesa *</label>
            <input
              type="number"
              min="1"
              placeholder="Número da mesa"
              value={mesa}
              onChange={e => setMesa(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-orange-500 bg-black text-orange-400 focus:ring-2 focus:ring-orange-600 outline-none"
            />
            <label className="text-white font-semibold text-lg">Nome do Cliente *</label>
            <input
              type="text"
              placeholder="Nome do cliente"
              value={nomeCliente}
              onChange={e => setNomeCliente(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-orange-500 bg-black text-orange-400 focus:ring-2 focus:ring-orange-600 outline-none"
            />
            <label className="text-white font-semibold text-lg">Telefone do Cliente (opcional)</label>
            <input
              type="tel"
              placeholder="Telefone do cliente"
              value={telefoneCliente}
              onChange={e => setTelefoneCliente(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-orange-500 bg-black text-orange-400 focus:ring-2 focus:ring-orange-600 outline-none"
            />
            <button
              onClick={() => {
                if (!mesa.trim()) {
                  toast.error("Por favor, informe o número da mesa");
                } else if (!nomeCliente.trim()) {
                  toast.error("Por favor, informe o nome do cliente");
                } else {
                  setEtapa("cardapio");
                }
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold py-3 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
            >
              Próximo: Cardápio
            </button>
          </div>
        )}

        {etapa === "cardapio" && (
          <div className="flex flex-col gap-8">
            {/* Informações da mesa e cliente no topo */}
            <div className="max-w-2xl mx-auto bg-neutral-800 rounded-lg p-6 text-center text-orange-400 mb-8">
              <p className="text-white text-lg mb-2"><b>Mesa {mesa} - {nomeCliente}</b></p>
              {telefoneCliente && <p className="text-orange-300 text-sm">📞 {telefoneCliente}</p>}
            </div>

            {/* Pratos */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">🍽️ Pratos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardapio.pratos.map(prato => (
                  <div key={prato.id} className="border border-orange-600 rounded-lg p-6 bg-neutral-800 hover:bg-neutral-700 transition-all">
                    <h3 className="text-orange-400 font-bold text-xl mb-2">{prato.nome}</h3>
                    <p className="text-neutral-300 text-sm mb-3">{prato.descricao}</p>
                    <p className="text-orange-300 font-semibold text-lg mb-4">R$ {prato.preco.toFixed(2)}</p>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={selecionados[prato.id] || ""}
                      onChange={e => handleQuantidadeChange(prato.id, Number(e.target.value))}
                      placeholder="0"
                      className="w-full px-3 py-2 text-white rounded-md bg-black border-2 border-orange-500 focus:ring-2 focus:ring-orange-600 outline-none text-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bebidas */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">🥤 Bebidas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardapio.bebidas.map(bebida => (
                  <div key={bebida.id} className="border border-orange-600 rounded-lg p-6 bg-neutral-800 hover:bg-neutral-700 transition-all">
                    <h3 className="text-orange-400 font-bold text-xl mb-2">{bebida.nome}</h3>
                    <p className="text-neutral-300 text-sm mb-3">{bebida.descricao}</p>
                    <p className="text-orange-300 font-semibold text-lg mb-4">R$ {bebida.preco.toFixed(2)}</p>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={selecionados[bebida.id] || ""}
                      onChange={e => handleQuantidadeChange(bebida.id, Number(e.target.value))}
                      placeholder="0"
                      className="w-full px-3 py-2 text-white rounded-md bg-black border-2 border-orange-500 focus:ring-2 focus:ring-orange-600 outline-none text-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Revisão do Pedido - SEMPRE VISÍVEL e SEM TRUNCAMENTO */}
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 mt-12">
              <h2 className="text-3xl font-bold text-white mb-4 text-center">📋 Revisar Pedido</h2>
              
              <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-2 border-orange-600 rounded-2xl p-8 shadow-2xl">
                {/* Informações do cliente */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-neutral-700/50 backdrop-blur-sm rounded-xl">
                  <div>
                    <p className="text-neutral-400 mb-1"><b>🪑 Mesa:</b></p>
                    <p className="text-3xl font-bold text-orange-400">{mesa}</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-1"><b>👤 Cliente:</b></p>
                    <p className="text-2xl font-bold text-orange-400">{nomeCliente}</p>
                  </div>
                  {telefoneCliente && (
                    <div>
                      <p className="text-neutral-400 mb-1"><b>📞 Telefone:</b></p>
                      <p className="text-lg text-orange-300">{telefoneCliente}</p>
                    </div>
                  )}
                </div>

                {/* Itens do pedido */}
                {Object.keys(selecionados).length > 0 ? (
                  <>
                    <hr className="border-orange-500 my-6" />
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-4">
                      {Object.entries(selecionados).map(([id, qtd]) => {
                        const item =
                          cardapio.pratos.find(p => p.id === +id) ||
                          cardapio.bebidas.find(b => b.id === +id);
                        return (
                          <div key={id} className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-neutral-700/50 backdrop-blur-sm rounded-xl gap-4 hover:bg-neutral-600/50 transition-all">
                            <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto">
                              <div className="flex-1 min-w-0">
                                <span className="text-white text-xl font-bold block lg:inline mb-1 lg:mb-0">
                                  {item.nome}
                                </span>
                                <span className="text-orange-300 text-lg block lg:inline ml-0 lg:ml-3">
                                  × {qtd}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-3xl font-bold text-orange-400">
                                R$ {(item.preco * qtd).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <hr className="border-orange-500 my-6" />
                  </>
                ) : (
                  <div className="text-center py-12 text-neutral-500">
                    <p className="text-2xl mb-2">🛒</p>
                    <p>Nenhum item selecionado ainda</p>
                  </div>
                )}

                {/* Total */}
                <div className="flex flex-col sm:flex-row justify-between items-end p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-black font-bold shadow-lg">
                  <span className="text-2xl mb-2 sm:mb-0">Total do Pedido:</span>
                  <span className="text-4xl sm:text-5xl">R$ {totalPedido().toFixed(2)}</span>
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                <button
                  onClick={() => setEtapa("selecionarMesa")}
                  className="flex-1 bg-neutral-700 text-orange-500 font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-neutral-600 transition-all text-lg border-2 border-orange-500"
                >
                  ← Novo Pedido
                </button>
                <button
                  onClick={enviarPedido}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold py-4 px-8 rounded-2xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all text-lg border-2 border-orange-400"
                  disabled={Object.keys(selecionados).length === 0}
                >
                  ✅ Enviar Pedido
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedidos;
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const cardapio = {
  pratos: [
    { id: 1, nome: "Hambúrguer Clássico", descricao: "Pão, carne, queijo, alface e tomate", preco: 25.0 },
    { id: 2, nome: "Batata Frita", descricao: "Porção média, crocante", preco: 12.0 },
    { id: 3, nome: "Salada Caesar", descricao: "Alface, parmesão, croutons", preco: 18.0 },
  ],
  bebidas: [
    { id: 101, nome: "Refrigerante", descricao: "Lata 350ml", preco: 7.0 },
    { id: 102, nome: "Suco Natural", descricao: "Copão 500ml", preco: 10.0 },
    { id: 103, nome: "Água Mineral", descricao: "500ml", preco: 5.0 },
  ],
};

const Pedidos = () => {
  const [mesa, setMesa] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [selecionados, setSelecionados] = useState({});
  const [etapa, setEtapa] = useState("selecionarMesa");

  const handleQuantidadeChange = (id, quantidade) => {
    setSelecionados(prev => {
      const clone = { ...prev };
      if (quantidade < 1) {
        delete clone[id];
      } else {
        clone[id] = quantidade;
      }
      return clone;
    });
  };

  const totalPedido = () => {
    return Object.entries(selecionados).reduce((acc, [id, qtd]) => {
      const item =
        cardapio.pratos.find(p => p.id === +id) ||
        cardapio.bebidas.find(b => b.id === +id);
      return acc + item.preco * qtd;
    }, 0);
  };

  const enviarPedido = () => {
    if (!mesa.trim()) {
      toast.error("Por favor, selecione o número da mesa.");
      setEtapa("selecionarMesa");
      return;
    }
    if (!nomeCliente.trim()) {
      toast.error("Por favor, informe o nome do cliente.");
      setEtapa("selecionarMesa");
      return;
    }
    if (Object.keys(selecionados).length === 0) {
      toast.error("Selecione ao menos um item do cardápio.");
      return;
    }
    toast.success(Pedido para mesa ${mesa} enviado com sucesso!);
    setMesa("");
    setNomeCliente("");
    setTelefoneCliente("");
    setSelecionados({});
    setEtapa("selecionarMesa");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-6xl bg-neutral-900 rounded-xl shadow-lg p-8 flex flex-col gap-8">
        {/* Logo */}
        <div className="flex justify-center items-center h-20">
          <span className="text-6xl">🍔</span>
        </div>

        <h1 className="text-4xl font-bold text-white text-center mb-6">Fazer Pedido</h1>

        {etapa === "selecionarMesa" && (
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            <label className="text-white font-semibold text-lg">Número da Mesa *</label>
            <input
              type="number"
              min="1"
              placeholder="Número da mesa"
              value={mesa}
              onChange={e => setMesa(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-orange-500 bg-black text-orange-400 focus:ring-2 focus:ring-orange-600 outline-none"
            />
            <label className="text-white font-semibold text-lg">Nome do Cliente *</label>
            <input
              type="text"
              placeholder="Nome do cliente"
              value={nomeCliente}
              onChange={e => setNomeCliente(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-orange-500 bg-black text-orange-400 focus:ring-2 focus:ring-orange-600 outline-none"
            />
            <label className="text-white font-semibold text-lg">Telefone do Cliente (opcional)</label>
            <input
              type="tel"
              placeholder="Telefone do cliente"
              value={telefoneCliente}
              onChange={e => setTelefoneCliente(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-orange-500 bg-black text-orange-400 focus:ring-2 focus:ring-orange-600 outline-none"
            />
            <button
              onClick={() => {
                if (!mesa.trim()) {
                  toast.error("Por favor, informe o número da mesa");
                } else if (!nomeCliente.trim()) {
                  toast.error("Por favor, informe o nome do cliente");
                } else {
                  setEtapa("cardapio");
                }
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold py-3 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
            >
              Próximo: Cardápio
            </button>
          </div>
        )}

        {etapa === "cardapio" && (
          <div className="flex flex-col gap-8">
            {/* Informações da mesa e cliente no topo */}
            <div className="max-w-2xl mx-auto bg-neutral-800 rounded-lg p-6 text-center text-orange-400 mb-8">
              <p className="text-white text-lg mb-2"><b>Mesa {mesa} - {nomeCliente}</b></p>
              {telefoneCliente && <p className="text-orange-300 text-sm">📞 {telefoneCliente}</p>}
            </div>

            {/* Pratos */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">🍽️ Pratos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardapio.pratos.map(prato => (
                  <div key={prato.id} className="border border-orange-600 rounded-lg p-6 bg-neutral-800 hover:bg-neutral-700 transition-all">
                    <h3 className="text-orange-400 font-bold text-xl mb-2">{prato.nome}</h3>
                    <p className="text-neutral-300 text-sm mb-3">{prato.descricao}</p>
                    <p className="text-orange-300 font-semibold text-lg mb-4">R$ {prato.preco.toFixed(2)}</p>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={selecionados[prato.id] || ""}
                      onChange={e => handleQuantidadeChange(prato.id, Number(e.target.value))}
                      placeholder="0"
                      className="w-full px-3 py-2 text-white rounded-md bg-black border-2 border-orange-500 focus:ring-2 focus:ring-orange-600 outline-none text-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bebidas */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">🥤 Bebidas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardapio.bebidas.map(bebida => (
                  <div key={bebida.id} className="border border-orange-600 rounded-lg p-6 bg-neutral-800 hover:bg-neutral-700 transition-all">
                    <h3 className="text-orange-400 font-bold text-xl mb-2">{bebida.nome}</h3>
                    <p className="text-neutral-300 text-sm mb-3">{bebida.descricao}</p>
                    <p className="text-orange-300 font-semibold text-lg mb-4">R$ {bebida.preco.toFixed(2)}</p>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={selecionados[bebida.id] || ""}
                      onChange={e => handleQuantidadeChange(bebida.id, Number(e.target.value))}
                      placeholder="0"
                      className="w-full px-3 py-2 text-white rounded-md bg-black border-2 border-orange-500 focus:ring-2 focus:ring-orange-600 outline-none text-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Revisão do Pedido - SEMPRE VISÍVEL e SEM TRUNCAMENTO */}
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 mt-12">
              <h2 className="text-3xl font-bold text-white mb-4 text-center">📋 Revisar Pedido</h2>
              
              <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-2 border-orange-600 rounded-2xl p-8 shadow-2xl">
                {/* Informações do cliente */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-neutral-700/50 backdrop-blur-sm rounded-xl">
                  <div>
                    <p className="text-neutral-400 mb-1"><b>🪑 Mesa:</b></p>
                    <p className="text-3xl font-bold text-orange-400">{mesa}</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-1"><b>👤 Cliente:</b></p>
                    <p className="text-2xl font-bold text-orange-400">{nomeCliente}</p>
                  </div>
                  {telefoneCliente && (
                    <div>
                      <p className="text-neutral-400 mb-1"><b>📞 Telefone:</b></p>
                      <p className="text-lg text-orange-300">{telefoneCliente}</p>
                    </div>
                  )}
                </div>

                {/* Itens do pedido */}
                {Object.keys(selecionados).length > 0 ? (
                  <>
                    <hr className="border-orange-500 my-6" />
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-4">
                      {Object.entries(selecionados).map(([id, qtd]) => {
                        const item =
                          cardapio.pratos.find(p => p.id === +id) ||
                          cardapio.bebidas.find(b => b.id === +id);
                        return (
                          <div key={id} className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-neutral-700/50 backdrop-blur-sm rounded-xl gap-4 hover:bg-neutral-600/50 transition-all">
                            <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto">
                              <div className="flex-1 min-w-0">
                                <span className="text-white text-xl font-bold block lg:inline mb-1 lg:mb-0">
                                  {item.nome}
                                </span>
                                <span className="text-orange-300 text-lg block lg:inline ml-0 lg:ml-3">
                                  × {qtd}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-3xl font-bold text-orange-400">
                                R$ {(item.preco * qtd).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <hr className="border-orange-500 my-6" />
                  </>
                ) : (
                  <div className="text-center py-12 text-neutral-500">
                    <p className="text-2xl mb-2">🛒</p>
                    <p>Nenhum item selecionado ainda</p>
                  </div>
                )}

                {/* Total */}
                <div className="flex flex-col sm:flex-row justify-between items-end p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-black font-bold shadow-lg">
                  <span className="text-2xl mb-2 sm:mb-0">Total do Pedido:</span>
                  <span className="text-4xl sm:text-5xl">R$ {totalPedido().toFixed(2)}</span>
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                <button
                  onClick={() => setEtapa("selecionarMesa")}
                  className="flex-1 bg-neutral-700 text-orange-500 font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-neutral-600 transition-all text-lg border-2 border-orange-500"
                >
                  ← Novo Pedido
                </button>
                <button
                  onClick={enviarPedido}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold py-4 px-8 rounded-2xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all text-lg border-2 border-orange-400"
                  disabled={Object.keys(selecionados).length === 0}
                >
                  ✅ Enviar Pedido
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedidos;