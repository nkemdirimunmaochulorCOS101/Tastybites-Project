import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Customer {
  id: number;
  first_name: string;
  middle_name: string;
  surname: string;
  matric_number: string;
}

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    surname: '',
    home_address: '',
    date_of_birth: '',
    date_of_registration: '',
    matric_number: '',
  });

  const [orderForm, setOrderForm] = useState({
    customer_id: '',
    order_date: '',
    menu_item: '',
    special_instructions: '',
    payment_method: '',
    next_reservation_date: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/customers');
      setCustomers(res.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const createCustomer = async () => {
    const formattedForm = {
      ...form,
      matric_number: form.matric_number.startsWith('_') ? form.matric_number : `_${form.matric_number}`,
    };

    try {
      await axios.post('http://127.0.0.1:8000/customers', formattedForm);
      setForm({
        first_name: '',
        middle_name: '',
        surname: '',
        home_address: '',
        date_of_birth: '',
        date_of_registration: '',
        matric_number: '',
      });
      fetchCustomers();
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const createOrder = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/orders', {
      customer_id: parseInt(orderForm.customer_id),
      order_date: orderForm.order_date,
      menu_item: orderForm.menu_item,
      special_instructions: orderForm.special_instructions,
      payment_method: orderForm.payment_method,
      next_reservation_date: orderForm.next_reservation_date,
    });

    alert('Order submitted!');
    setOrderForm({
      customer_id: '',
      order_date: '',
      menu_item: '',
      special_instructions: '',
      payment_method: '',
      next_reservation_date: '',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    alert('Failed to submit order.');
  }
};

  return (
    <div className="App" style={{ padding: 20, fontFamily: 'sans-serif', backgroundColor: '#fff8f0' }}>
      <h1 style={{ color: 'orange' }}>TastyBites Customers</h1>

      {/* Customer Form */}
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: '0 auto' }}>
        <input
          placeholder="First Name"
          value={form.first_name}
          onChange={e => setForm({ ...form, first_name: e.target.value })}
        />
        <input
          placeholder="Middle Name"
          value={form.middle_name}
          onChange={e => setForm({ ...form, middle_name: e.target.value })}
        />
        <input
          placeholder="Surname"
          value={form.surname}
          onChange={e => setForm({ ...form, surname: e.target.value })}
        />
        <input
          placeholder="Home Address"
          value={form.home_address}
          onChange={e => setForm({ ...form, home_address: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={form.date_of_birth}
          onChange={e => setForm({ ...form, date_of_birth: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date of Registration"
          value={form.date_of_registration}
          onChange={e => setForm({ ...form, date_of_registration: e.target.value })}
        />
        <input
          placeholder="Matric Number"
          value={form.matric_number}
          onChange={e => setForm({ ...form, matric_number: e.target.value })}
        />

        <button
          onClick={createCustomer}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: 'orange',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
          }}
        >
          Add Customer
        </button>
      </div>

      {/* Display Customers */}
      <h2 style={{ color: 'orange', marginTop: 40 }}>Registered Customers</h2>
      <ul>
        {customers.map(c => (
          <li key={c.id}>
            {c.first_name} {c.middle_name} {c.surname} — {c.matric_number}
          </li>
        ))}
      </ul>

      {/* Order Form */}
      <h2 style={{ color: 'orange', marginTop: 50 }}>Place an Order</h2>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: '0 auto' }}>
        <select
          value={orderForm.customer_id}
          onChange={e => setOrderForm({ ...orderForm, customer_id: e.target.value })}
        >
          <option value="">Select Customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>
              {c.first_name} {c.surname}
            </option>
          ))}
        </select>

        <input
          type="date"
          placeholder="Order Date"
          value={orderForm.order_date}
          onChange={e => setOrderForm({ ...orderForm, order_date: e.target.value })}
        />
        <input
          placeholder="Menu Item"
          value={orderForm.menu_item}
          onChange={e => setOrderForm({ ...orderForm, menu_item: e.target.value })}
        />
        <textarea
          placeholder="Special Instructions"
          value={orderForm.special_instructions}
          onChange={e => setOrderForm({ ...orderForm, special_instructions: e.target.value })}
        />
        <select
          value={orderForm.payment_method}
          onChange={e => setOrderForm({ ...orderForm, payment_method: e.target.value })}
        >
          <option value="">Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Transfer">Transfer</option>
        </select>
        <input
          type="date"
          placeholder="Next Reservation"
          value={orderForm.next_reservation_date}
          onChange={e => setOrderForm({ ...orderForm, next_reservation_date: e.target.value })}
        />

        <button
          onClick={createOrder}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: 'orange',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
          }}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}

export default App;
