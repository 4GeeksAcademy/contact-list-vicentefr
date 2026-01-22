import { Link, useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";
import React from "react";

export const Single = () => {
  const { theId } = useParams(); 
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (store.contacts?.length > 0) {
      const contactToEdit = store.contacts.find(c => c.id === parseInt(theId));
      if (contactToEdit) {
        setName(contactToEdit.name);
        setEmail(contactToEdit.email);
        setPhone(contactToEdit.phone);
        setAddress(contactToEdit.address);
      }
    }
  }, [theId, store.contacts]);

  const editContact = () => {
    const editContact = {
      name,
      email,
      phone,
      address
    };

    fetch(`https://playground.4geeks.com/contact/agendas/vicente/contacts/${theId}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editContact)
    })
      .then(response => {
        if (!response.ok) throw new Error("Error al actualizar");
        return response.json();
      })
      .then(data => {
        dispatch({
          type: "edit_contact",
          payload: { id: parseInt(theId), updates: editContact }
        });
        navigate("/");
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container px-5">
      <h1 className="text-center mt-5 mb-4">Edit Contact</h1>
      <div className="d-flex flex-column">
        <p className="mb-1">Full Name</p>
        <input 
            type="text" 
            value={name}
            placeholder="Enter Name" 
            onChange={(e) => setName(e.target.value)} 
        />

        <p className="mb-1 mt-3">Email</p>
        <input 
            type="email" 
            value={email} 
            placeholder="Enter email" 
            onChange={(e) => setEmail(e.target.value)} 
        />

        <p className="mb-1 mt-3">Phone</p>
        <input 
            type="text" 
            value={phone} 
            placeholder="Enter phone" 
            onChange={(e) => setPhone(e.target.value)} 
        />

        <p className="mb-1 mt-3">Address</p>
        <input 
            type="text" 
            value={address} 
            placeholder="Enter address" 
            onChange={(e) => setAddress(e.target.value)} 
        />

        <button className="btn btn-primary mt-4" onClick={editContact}>
          Save Changes
        </button>
        
        <Link to="/" className="mt-2"><p>Or get back to contacts</p></Link>
      </div>
    </div>
  );
};