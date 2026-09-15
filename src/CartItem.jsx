import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

export default function CartItem({ cartItems, onContinueShopping }) {
  const dispatch = useDispatch();

  // 计算单个商品小计
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return price * item.quantity;
  }

  // 购物车全部总金额
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      const price = parseFloat(item.cost.substring(1));
      total += price * item.quantity;
    })
    return total;
  }

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))
  }

  const handleDecrement = (item) => {
    if(item.quantity > 1){
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity -1 }))
    }else{
      dispatch(removeItem(item.name))
    }
  }

  const handleRemove = (item) => {
    dispatch(removeItem(item.name))
  }

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  }

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  }

  return (
    <div>
      {cartItems.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          {cartItems.map((item, idx) => (
            <div className="cart-card" key={idx}>
              <img src={item.image} alt={item.name} width="80"/>
              <div>{item.name}</div>
              <div>Unit: {item.cost}</div>
              <div>Subtotal: ${calculateTotalCost(item).toFixed(2)}</div>
              <button onClick={()=>handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={()=>handleIncrement(item)}>+</button>
              <button onClick={()=>handleRemove(item)}>Delete</button>
            </div>
          ))}
          <h3>Total Amount: ${calculateTotalAmount().toFixed(2)}</h3>
        </>
      )}
      <button onClick={handleContinueShopping}>Continue Shopping</button>
      <button onClick={handleCheckoutShopping}>Checkout</button>
    </div>
  )
}
