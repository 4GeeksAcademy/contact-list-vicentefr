import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const Home = () => {
	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer()
	const slug = `vicente`


	useEffect(() => {
		getContacts()
	}, []);

const getContacts = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/${slug}`)
        .then((resp) => {
            if (resp.status === 404) {
                createAgenda();
                return { contacts: [] }; 
            }
            if (!resp.ok) throw new Error("Error cargando contactos");
            return resp.json();
        })
        .then((data) => {
            dispatch({
                type: `load_contacts`,
                payload: data.contacts || [] 
            });
        })
        .catch((error) => console.error(`Error al traer contactos`, error));
}


	const createAgenda = () => {
		fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
			method: `POST`,
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((resp) => {
				if (resp.ok) console.log(`Agenda creada correctamente`, resp.status)
			})
			.catch((error) => console.error(`Error al crear agenda`, error))
	}

	function deleteContact(id) {
		fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (response.ok) {
					dispatch({
						type: `delete_contact`,
						payload: { id }
					})
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
	} 

	console.log(store)
	return (
		<div className="mt-2 container">
			{store.contacts?.length > 0 ? (
				store.contacts.map((contact) => (
					<div key={contact.id} className="border d-flex">
						<img src="https://placehold.co/200x200" alt="imagen" className="rounded-circle m-2" />
						<div className="m-2">
							<h3>{contact.name}</h3>
							<div className="d-flex align-items-center mt-4">
								<i className="fa-solid fa-location-dot fa-lg me-2"></i>
								<p className="mb-0">{contact.address}</p>
							</div>
							<div className="d-flex align-items-center mt-4">
								<i className="fa-solid fa-phone-flip fa-lg me-2"></i>
								<p className="mb-0">{contact.phone}</p>
							</div>
							<div className="d-flex align-items-center mt-4">
								<i className="fa-solid fa-envelope fa-lg me-2"></i>
								<p className="mb-0">{contact.email}</p>
							</div>
						</div>
						<div className="d-flex ms-auto gap-5 me-5 mt-4">
							<i className="fa-solid fa-pencil fa-lg" style={{ cursor: "pointer" }} onClick={() => navigate(`/single/${contact.id}`)}></i>
							<i
								className="fa-solid fa-trash-can fa-lg"
								onClick={() => deleteContact(contact.id)}
								style={{ cursor: "pointer" }}
							></i>
						</div>
					</div>
				))
			) : (
				<div className="border d-flex mb-3 text-center justify-content-center align-items-center" style={{ height: "200px" }}>
					<h2>Add new contact</h2>
				</div>
			)}
		</div>
	);
}; 