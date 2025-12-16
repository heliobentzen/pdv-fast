//Componente de cartão.
import { useState } from "react";

function ProductCard({ name, ingredients = [], price, image }) {
    const [observation, setObservation] = useState("");

    return (
        <div className="border border-orange-500 bg-black rounded-xl p-4 w-64 shadow-lg hover:shadow-orange-500/20 transition">
            
            {/* Imagem */}
            <img
                src={image}
                alt={name}
                className="w-full h-40 object-cover rounded-md mb-4 border border-orange-500"
            />

            {/* Título */}
            <h2 className="text-orange-400 font-bold text-xl mb-2">{name}</h2>

            {/* Ingredientes */}
            <p className="text-orange-300 text-sm mb-3">
                {ingredients.join(", ")}
            </p>

            {/* Preço */}
            <p className="text-orange-500 font-semibold text-lg mb-4">
                R$ {price}
            </p>

            {/* Observação */}
            <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Observações (ex: sem cebola)"
                className="w-full p-2 mb-4 rounded-md bg-black border border-orange-500 text-orange-300 text-sm focus:ring-2 focus:ring-orange-600 outline-none"
            />

            {/* Botão */}
            <button
                className="
                    w-full py-2 rounded-md 
                    border border-orange-500 
                    text-orange-400 
                    bg-black
                    hover:bg-neutral-900
                    transition
                    focus:ring-2 focus:ring-orange-600 outline-none
                "
                onClick={() => {
                    console.log("Produto:", name);
                    console.log("Observação:", observation);
                }}
            >
                Adicionar
            </button>
        </div>
    );
}

export default ProductCard;
