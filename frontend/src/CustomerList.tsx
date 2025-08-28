import { useState, useEffect } from "react";
import axios from "axios";

interface Customer {
  id: number;
  first_name: string;
  surname: string;
  // Add any other fields like middle_name, dob, etc.
}

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map((c) => (
          <li key={c.id}>{c.first_name} {c.surname}</li>
        ))}
      </ul>
    </div>
  );
}

