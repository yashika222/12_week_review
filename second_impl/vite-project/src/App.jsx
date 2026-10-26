import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQuantity } from "./cartSlice";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 },
];

function App() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity, 0
  );

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  return (
    <div>
      
      <h2>My Shop | Cart Items: {totalItems}</h2>

      
      <h3>Products</h3>

      {products.map((product) => (
        <div key={product.id}>
          {product.name} - {product.price}

          <button onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      ))}

      
      <h3>Shopping Cart</h3>

      {items.map((item) => (
        <div key={item.id}>
          {item.name} - {item.price}

          <button
            onClick={() =>
              dispatch(
                updateQuantity({
                  id: item.id,
                  quantity: item.quantity - 1,
                })
              )
            }
            disabled={item.quantity <= 1}
          >
            -
          </button>

          {item.quantity}

          <button
            onClick={() =>
              dispatch(
                updateQuantity({
                  id: item.id,
                  quantity: item.quantity + 1,
                })
              )
            }
          >
            +
          </button>

          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total Price: {totalPrice}</h3>
    </div>
  );
}

export default App;