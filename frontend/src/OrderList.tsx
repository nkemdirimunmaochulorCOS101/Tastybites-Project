import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to fetch orders', err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">All Orders</h2>
      <ul className="space-y-2">
        {orders.map((order: any) => (
          <li key={order.id} className="border p-2 rounded">
            <p><strong>Customer:</strong> {order.customer_id}</p>
            <p><strong>Menu Item:</strong> {order.menu_item}</p>
            <p><strong>Date:</strong> {order.order_date}</p>
            {/* You can add Edit and Delete buttons here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;
