import Card from "../ui/Card";

export default function ProductCard({ product, actions }) {
    if (!product) return null;

    const { name, quantity, price } = product;

    const unitPrice = Number(price) || 0;
    const subtotal = unitPrice * quantity;

    return (
        <Card className="space-y-2 text-white">
            <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-200">
                    {name}
                </h4>

                <span className="text-orange-400 text-sm">
                    Qtd: {quantity}
                </span>
            </div>

            <div className="flex justify-between text-sm text-gray-300">
                <span>Preço unitário</span>
                <span>R$ {unitPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold border-t border-orange-600 pt-2">
                <span>Subtotal</span>
                <span className="text-orange-400">
                    R$ {subtotal.toFixed(2)}
                </span>
            </div>

            {actions && (
                <div className="flex justify-end gap-2 pt-2">
                    {actions}
                </div>
            )}
        </Card>
    );
}
