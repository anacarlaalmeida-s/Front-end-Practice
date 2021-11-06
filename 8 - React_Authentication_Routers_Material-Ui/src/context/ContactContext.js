import { createContext, useState } from "react";

const ContactContext = createContext();

function ContactProvider({ children }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [contatos, setContatos] = useState([]);
  const [editingContato, setEditingContato] = useState([]);
  const [deletingContato, setDeletingContato] = useState([]);

  function openModalDelete(contato) {
    setOpenDeleteModal(true);
    setDeletingContato(contato);
  }

  function openModalEdit(contato) {
    setOpenEditModal(true);
    setEditingContato(contato);
  }

  return (
    <ContactContext.Provider
      value={{
        openAddModal,
        setOpenAddModal,
        openEditModal,
        setOpenEditModal,
        openDeleteModal,
        setOpenDeleteModal,
        contatos,
        setContatos,
        openModalDelete,
        openModalEdit,
        editingContato,
        setEditingContato,
        deletingContato,
        setDeletingContato    
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}
export { ContactContext, ContactProvider };
