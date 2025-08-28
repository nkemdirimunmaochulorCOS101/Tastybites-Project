import React, { useState } from 'react';
import axios from 'axios';

const AddCustomerForm = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfRegistration, setDateOfRegistration] = useState("");
  const [matricNumber, setMatricNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCustomer = {
      first_name: firstName,
      middle_name: middleName,
      surname: surname,
      home_address: homeAddress,
      date_of_birth: dateOfBirth,
      date_of_registration: dateOfRegistration,
      matric_number: "_" + matricNumber, // Add underscore prefix
    };

    fetch("http://localhost:8000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Error saving customer!");
        } else {
          alert("Customer added successfully!");
          // Optionally reset the form
          setFirstName("");
          setMiddleName("");
          setSurname("");
          setHomeAddress("");
          setDateOfBirth("");
          setDateOfRegistration("");
          setMatricNumber("");
        }
      })
      .catch((err) => {
        alert("Network error!");
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Middle Name"
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Home Address"
        value={homeAddress}
        onChange={(e) => setHomeAddress(e.target.value)}
        required
      />
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />
      <input
        type="date"
        value={dateOfRegistration}
        onChange={(e) => setDateOfRegistration(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Matric Number"
        value={matricNumber}
        onChange={(e) => setMatricNumber(e.target.value)} // Underscore added in submit
        required
      />
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default AddCustomerForm;