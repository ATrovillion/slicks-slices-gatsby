import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';
import attachNamesAndPrices from './attachNamesAndPrices';

export default function usePizza({ pizzas, values }) {
  // 1. create state to hold order
  // Following line was removed b/c usestate moved up to provider
  // with context
  // const [order, setOrder] = useState([]);
  // Now we access both state and updater via context api
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  // this is the function that runs when form is submitted
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      laBrea: values.laBrea,
    };
    // 4. Send data to serverless function on checkout
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());

    // check if everything works
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage('Success! Come on down for your pizza!');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
