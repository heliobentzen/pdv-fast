//Componente de cartão.

function ProductCard({ name, ingredients = [], price, image }) {
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

            {/* Botão */}
            <button className="
                w-full py-2 rounded-md 
                border border-orange-500 
                text-orange-400 
                bg-black
                hover:bg-neutral-900
                transition
                focus:ring-2 focus:ring-orange-600 outline-none
            ">
                Adicionar
            </button>
        </div>
    );
}

export default ProductCard;