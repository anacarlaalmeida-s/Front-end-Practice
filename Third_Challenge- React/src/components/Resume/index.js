import "./style.css";
import lineResume from "../../assets/lineResume.svg";

function Resume({ setShowAddModal, resumeDebit, resumeCredit }) {
  return (
    <div className="container-resume">
      <h1 className="title-resume">Resumo</h1>
      <div className="in-resume">
        <span>Entrada</span>
        <span className="in">
          {resumeCredit.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <div className="out-resume">
        <span>Saída</span>
        <span className="out">
          {resumeDebit.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <img className="line-resume" src={lineResume} alt="line-resume" />
      <div className="balance-resume">
        <span>Saldo</span>
        <span className="balance">
          {(resumeCredit - resumeDebit).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <button className="btn-add" onClick={() => setShowAddModal(true)}>
        Adicionar Registro
      </button>
    </div>
  );
}

export default Resume;
