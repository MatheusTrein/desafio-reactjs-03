import React, { FormEvent } from "react";
import { MdDelete, MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import { Container, ProductTable, Total } from "./styles";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
  formattedPrice: string;
  total: number;
  formattedTotal: string;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted: Product[] = cart.map((product) => {
    const total = product.price * product.amount;
    return {
      ...product,
      formattedPrice: formatPrice(product.price),
      total,
      formattedTotal: formatPrice(total),
    };
  });

  const total = formatPrice(
    cartFormatted.reduce((acc, product) => {
      return acc + product.total;
    }, 0)
  );

  function handleProductIncrement(product: Product) {
    const amount = product.amount + 1;
    updateProductAmount({ productId: product.id, amount });
  }

  function handleProductDecrement(product: Product) {
    const amount = product.amount - 1;
    updateProductAmount({ productId: product.id, amount });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      {cartFormatted.map((product) => {
        return (
          <ProductTable key={product.id}>
            <thead>
              <tr>
                <th aria-label="product image" />
                <th>PRODUTO</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th aria-label="delete icon" />
              </tr>
            </thead>
            <tbody>
              <tr data-testid="product">
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.formattedPrice}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="decrement-product"
                      disabled={product.amount <= 1}
                      onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      data-testid="product-amount"
                      readOnly
                      value={product.amount}
                    />
                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.formattedTotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            </tbody>
          </ProductTable>
        );
      })}

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
