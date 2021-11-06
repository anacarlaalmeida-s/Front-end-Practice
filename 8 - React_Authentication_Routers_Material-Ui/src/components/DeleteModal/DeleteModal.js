import "./DeleteModal.css";
import deleteIcon from "../../assets/delete.svg";
import { useContext,useEffect } from "react";
import { Context } from "../../Context/AuthContext";
import { ContactContext } from "../../Context/ContactContext";

function DeleteModal({getContacts}) {
  const { setOpenDeleteModal, deletingContato } = useContext(ContactContext);
  const { baseURL, token, setErro } = useContext(Context);

  useEffect(() => {
    getContacts();
  }, [handleDeleteContact]);

  async function handleDeleteContact() {
    try {
      const response = await fetch(
        `${baseURL}/contatos/${deletingContato.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setOpenDeleteModal(false);
    } catch (error) {
      setErro("Algo deu errado, tente novamente mais tarde!");
    }
  }

  return (
    <div className="DeleteModal">
      <div className="container-delete">
        <>
          <h3 className="h3-deleteModal">Confirma a exclusão?</h3>

          <img
            onClick={() => setOpenDeleteModal(false)}
            className="close-deleteModal"
            src={deleteIcon}
            alt="delete"
          />
        </>
        <p className="p-deleteModal">
          Deseja excluir o contato, {deletingContato.nome}
        </p>
        <button onClick={handleDeleteContact}className="btn-deleteModal delete">EXCLUIR</button>
        <button  onClick={() => setOpenDeleteModal(false)}className="btn-deleteModal cancel">CANCELAR</button>
      </div>
    </div>
  );
}

export default DeleteModal;
