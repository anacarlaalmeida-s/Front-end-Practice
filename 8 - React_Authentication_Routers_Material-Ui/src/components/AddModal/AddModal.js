import "./AddModal.css";
import deleteIcon from "../../assets/delete.svg";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../Context/AuthContext";
import { ContactContext } from "../../Context/ContactContext";

function AddModal({ getContacts }) {
  const { baseURL, token, setErro } = useContext(Context);
  const { setOpenAddModal } = useContext(ContactContext);
  const [nome, setNome] = useState([]);
  const [email, setEmail] = useState([]);
  const [telefone, setTelefone] = useState([]);

  useEffect(() => {
    getContacts();
  }, [handleAddContact]);

  async function handleAddContact() {
    try {
      const body = {
        nome: nome,
        email: email,
        telefone: telefone,
      };

      const response = await fetch(`${baseURL}/contatos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setOpenAddModal(false);
    } catch (error) {
      setErro("Algo deu errado, tente novamente mais tarde!");
    }
    setNome("");
    setTelefone("");
    setEmail("");
  }

  return (
    <div className="AddModal">
      <div className="container-add">
        <div className="container-title-icon">
          <h3 className="h3-addModal">Novo Contato</h3>
          <img
            onClick={() => setOpenAddModal(false)}
            className="close-addModal"
            src={deleteIcon}
            alt="delete"
          />
        </div>
        <form className="form-add" onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={(e) => setNome(e.target.value)}
            className="input-add"
            placeholder="Nome"
            value={nome}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input-add"
            placeholder="E-mail"
            value={email}
          />
          <input
            onChange={(e) => setTelefone(e.target.value)}
            className="input-add"
            placeholder="Telefone"
            value={telefone}
          />

          <button onClick={handleAddContact} className="btn-addModal add">
            ADICIONAR
          </button>
          <button className="btn-addModal clear">LIMPAR</button>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
