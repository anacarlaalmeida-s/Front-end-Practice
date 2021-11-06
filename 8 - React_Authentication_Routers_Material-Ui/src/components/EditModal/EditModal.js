import "./EditModal.css";
import deleteIcon from "../../assets/delete.svg";
import { useContext, useState, useEffect } from "react";
import { ContactContext } from "../../Context/ContactContext";
import { Context } from "../../Context/AuthContext";

function EditModal({getContacts}) {
  const { baseURL, token, setErro} = useContext(Context);
  const { setOpenEditModal, editingContato} =
    useContext(ContactContext);
  const [nome, setNome] = useState(editingContato.nome);
  const [email, setEmail] = useState(editingContato.email);
  const [telefone, setTelefone] = useState(editingContato.telefone);  

  useEffect(() => {
    getContacts();
  }, [handleEditContact]);

    async function handleEditContact() {  
      try {
        const body = {
          nome: nome,
          telefone: telefone,
          email:email
        };        
        const response = await fetch(`${baseURL}/contatos/${editingContato.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });  
        const data = await response.json();
        setOpenEditModal(false);
      } catch (error) {
        setErro("Algo deu errado, tente novamente mais tarde!");
      }
    }

  return (
    <div className="EditModal">
      <div className="container-add">
        <div className="container-title-icon">
          <h3 className="h3-editModal">Editar Contato</h3>
          <img
            onClick={() => setOpenEditModal(false)}
            className="close-editModal"
            src={deleteIcon}
            alt="delete"
          />
        </div>
        <form className="form-edit" onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={(e) => setNome(e.target.value)}
            className="input-edit"
            name="nome"
            value={nome}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input-edit"
            name="email"
            value={email}
          />
          <input
            onChange={(e) => setTelefone(e.target.value)}
            className="input-edit"
            name="telefone"
            value={telefone}
          />

          <button  onClick={handleEditContact}className="btn-editModal save">SALVAR</button>
          <button
            onClick={() => setOpenEditModal(false)}
            className="btn-editModal cancel-edit"
          >
            CANCELAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
