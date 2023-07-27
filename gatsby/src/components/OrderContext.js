import React, { useState } from 'react';

// create an order context
const OrderContext = React.createContext();

// create a provider
export const OrderProvider = function ({ children }) {
  // we need to stick state in here so it can be accessed
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
