import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. create state to hold order
  // Following line was removed b/c usestate moved up to provider
  // with context
  // const [order, setOrder] = useState([]);
  // Now we access both state and updater via context api
  const [order, setOrder] = useContext(OrderContext);
  // 2. make function to add tings to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. make function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before item we want to remove
      ...order.slice(0, index),
      // everything after the order we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // TODO: 4. Send data to serverless function on checkout
  return { order, addToOrder, removeFromOrder };
}
