import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom";



export const CreateContact = () => {

    const { store, dispatch } = useGlobalReducer();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

const saveContact = () => {
    const newContact = {
        id: Date.now(),
        name,
        email,
        phone,
        address
    };

    dispatch({
        type: "add_contact",
        payload: newContact
    });
};

    console.log(store);
    return (
        <div className="container px-5">
            <h1 className="text-center mt-5 mb-4">Add a new contact</h1>
            <div className="d-flex flex-column">
                <p className="mb-3">Full Name</p>
                <input type="text" name="" id="name" placeholder="  Enter Name" onChange={(e) => setName(e.target.value)} />
                <p className="mb-3 mt-4">Email</p>
                <input type="email" name="" id="email" placeholder="  Enter email" onChange={(e) => setEmail(e.target.value)} />
                <p className="mb-3 mt-4">Phone</p>
                <input type="number" name="" id="number" placeholder="  Enter phone" onChange={(e) => setPhone(e.target.value)} />
                <p className="mb-3 mt-4">Address</p>
                <input type="text" name="" id="address" placeholder="  Enter address" onChange={(e) => setAddress(e.target.value)} />
                <input className="btn btn-primary mt-4" type="submit" value="Save" onClick={() => {
                    saveContact();
                    navigate("/");
                }} />
                <Link to="/" className="mt-2"><p>Or get back to contacts</p></Link>
            </div>
        </div >
    )
}