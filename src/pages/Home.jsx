import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { useEffect } from "react";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const slug = `vicente`


		useEffect(() => {
		getContacts()
	}, []);


	const getContacts = () => {
		fetch(`https://playground.4geeks.com/contact/agendas/${slug}`)
			.then((resp) => {
				if (!resp.ok) createAgenda()
				else console.log(`Contactos traidos correctamente`, resp.status)
				return resp.json()
				
			})
			.then((data) => {
				dispatch({
					type: `add_contact`,
					payload: data
				})
			})
			.catch((error) => console.error(`Error al taer contactss`,error))
	}



	const createAgenda = () => {
		fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
			method: `POST`,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((resp) => {
			if(resp.ok) console.log(`Agenda creada correctamente`, resp.status)
		})
		.catch((error) => console.error(`Error al crear agenda`, error))
	}

	const deleteAgenda = () = {
		fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
			method: `DELETE`,
		}
	}

console.log(store)
	return (
		<div className="mt-5 container">
			<div className="border d-flex">
				<img src="https://placehold.co/200x200" alt="imagen" className="rounded-circle  m-2" />
				<div className=" m-2">
					<h3>Nombre y Apellido</h3>
					<div className="d-flex align-items-center mt-4">
						<i className="fa-solid fa-location-dot fa-lg me-2"></i>
						<p className="mb-0">Ubicacion</p>
					</div>
					<div className="d-flex align-items-center mt-4">
						<i className="fa-solid fa-phone-flip fa-lg me-2"></i>
						<p className="mb-0">Telefono</p>
					</div>
					<div className="d-flex align-items-center mt-4">
						<i className="fa-solid fa-envelope fa-lg me-2"></i>
						<p className="mb-0">Correo</p>
					</div>
				</div>
				<div className="d-flex ms-auto gap-5 me-5 mt-4">
					<i className="fa-solid fa-pencil fa-lg"></i>
					<i className="fa-solid fa-trash-can fa-lg"></i>
				</div>
			</div>
		</div>
	);
}; 