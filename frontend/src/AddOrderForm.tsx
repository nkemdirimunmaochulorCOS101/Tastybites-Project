import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOrderForm: React.FC = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: '',
    order_date: '',
    menu_item: '',
    special_instructions: '',
    payment_method: '',
    next_reservation_date: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/orders', formData);
      alert('Order submitted!');
      // Clear form after submission
      setFormData({
        customer_id: '',
        order_date: '',
        menu_item: '',
        special_instructions: '',
        payment_method: '',
        next_reservation_date: '',
      });
    } catch (error) {
      alert('Failed to submit order');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl shadow-md max-w-xl mx-auto bg-white">
      <h2 className="text-xl font-semibold text-orange-600">Place Order</h2>

      <label className="block">
        Customer:
        <select
          name="customer_id"
          value={formData.customer_id}
          onChange={handleChange}
          required
          className="block w-full mt-1 p-2 border rounded"
        >
          <option value="">Select Customer</option>
          {customers.map((cust: any) => (
            <option key={cust.id} value={cust.id}>
              {cust.first_name} {cust.surname}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        Order Date:
        <input
          type="date"
          name="order_date"
          value={formData.order_date}
          onChange={handleChange}
          required
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block">
        Menu Item:
        <input
          type="text"
          name="menu_item"
          value={formData.menu_item}
          onChange={handleChange}
          required
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block">
        Special Instructions:
        <textarea
          name="special_instructions"
          value={formData.special_instructions}
          onChange={handleChange}
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block">
        Payment Method:
        <select
          name="payment_method"
          value={formData.payment_method}
          onChange={handleChange}
          required
          className="block w-full mt-1 p-2 border rounded"
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Transfer">Transfer</option>
        </select>
      </label>

      <label className="block">
        Next Reservation Date:
        <input
          type="date"
          name="next_reservation_date"
          value={formData.next_reservation_date}
          onChange={handleChange}
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      <button
        type="submit"
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Submit Order
      </button>
    </form>
  );
};

export default AddOrderForm;
