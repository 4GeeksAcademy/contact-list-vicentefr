export const initialStore = () => {
  return {
    message: null,
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case `add_contact`:
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    case `delete_contact`:
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload.id
        )
      }

    case `edit_contact`:
      return {
        ...store,
        contacts: store.contacts.map((contact) => {
          if (contact.id === action.payload.id) {
            return { ...contact, ...action.payload.updates };
          }
          return contact;
        })
      }

    case `load_contacts`:
      return{
        ...store,
        contacts: action.payload
      }


    default:
      throw Error("Unknown action.");
  }
}
