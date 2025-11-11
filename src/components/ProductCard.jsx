import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const { name, quantity, price } = product;
  const subtotal = quantity * price;

  return (
    <div className="product-card">
      <div className="product-info">
        <h4 className="product-name">{name}</h4>
        <div className="product-details">
          <span className="product-quantity">Qtd: {quantity}</span>
          <span className="product-price">R$ {price.toFixed(2)}</span>
        </div>
      </div>
      <div className="product-subtotal">
        <span>Subtotal:</span>
        <strong>R$ {subtotal.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default ProductCard;
