import "./style.css";
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/edit.svg";
import descendingOrder from "../../assets/descendingOrder.svg";
import ascendingOrder from "../../assets/ascendingOrder.svg";
import line from "../../assets/lineTable.svg";
import { useEffect, useState } from "react";

function Table({
  //faltou ordenação por dia da semana
  transactionsData,
  setTransactionsData,
  editingTransaction,
  setResumeCredit,
  setResumeDebit,
  loadTransactions,
}) {
  const [orderingDate, setOrderingDate] = useState(true);
  const [orderingValue, setOrderingValue] = useState(true);
  const [clickDate, setClickDate] = useState(false);
  const [clickValue, setClickValue] = useState(false);
  const [transactionDeleting, setTransactionDeleting] = useState([]);

  function updatingResume(displayedTransactions) {
    const newDisplayedTransactions = [...displayedTransactions];

    const creditTransactions = newDisplayedTransactions.filter(function (
      transacao
    ) {
      return transacao.type === "credit";
    });

    const debitTransactions = newDisplayedTransactions.filter(function (
      transacao
    ) {
      return transacao.type === "debit";
    });

    const totalCredit = creditTransactions.reduce(getTotalCredit, 0);
    function getTotalCredit(total, item) {
      return total + item.value / 100;
    }

    const totalDebit = debitTransactions.reduce(getTotalDebit, 0);
    function getTotalDebit(total, item) {
      return total + item.value / 100;
    }
    setResumeCredit(totalCredit);
    setResumeDebit(totalDebit);
  }

  useEffect(() => {
    updatingResume(transactionsData);
  });

  function orderbyAscendingDate(displayedTransactions) {
    const newDisplayedTransactions = [...displayedTransactions];

    newDisplayedTransactions.sort(function (a, b) {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    setTransactionsData(newDisplayedTransactions);
    setOrderingDate(false);
  }

  function orderbyDescendingDate(displayedTransactions) {
    const newDisplayedTransactions = [...displayedTransactions];

    newDisplayedTransactions.sort(function (a, b) {
      return a.date > b.date ? -1 : b.date > a.date ? 1 : 0;
    });
    setTransactionsData(newDisplayedTransactions);
    setOrderingDate(true);
  }

  function orderbyAscendingValue(displayedTransactions) {
    const newDisplayedTransactions = [...displayedTransactions];

    newDisplayedTransactions.sort(function (a, b) {
      return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
    });
    setTransactionsData(newDisplayedTransactions);
    setOrderingValue(false);
  }

  function orderbyDescendingValue(displayedTransactions) {
    const newDisplayedTransactions = [...displayedTransactions];

    newDisplayedTransactions.sort(function (a, b) {
      return a.value > b.value ? -1 : b.value > a.value ? 1 : 0;
    });
    setTransactionsData(newDisplayedTransactions);
    setOrderingValue(true);
  }

  function orderByDate() {
    setClickDate(true);
    setClickValue(false);
    orderingDate
      ? orderbyAscendingDate(transactionsData)
      : orderbyDescendingDate(transactionsData);
  }

  function orderByValue() {
    setClickValue(true);
    setClickDate(false);
    orderingValue
      ? orderbyAscendingValue(transactionsData)
      : orderbyDescendingValue(transactionsData);
  }

  function deletingTransaction(transaction) {
    const newTransactionDeleting = [...transactionDeleting];
    newTransactionDeleting.push(transaction);
    setTransactionDeleting(newTransactionDeleting);
  }

  async function deleteTransaction(transaction) {
    await fetch(`http://localhost:3333/transactions/${transaction.id}`, {
      method: "DELETE",
    });
    loadTransactions();
  }

  return (
    <div className="table">
      <div className="table-head">
        <div
          onClick={() => orderByDate()}
          className="column-title"
          align="center"
          id="date"
        >
          Data
          <img
            className={clickDate ? "order-by" : "order-by hidden"}
            src={orderingDate ? descendingOrder : ascendingOrder}
            alt="order-by"
          />
        </div>
        <div className="column-title" id="week-day">
          Dia da semana
        </div>
        <div className="column-title">Descrição</div>
        <div className="column-title">Categoria</div>
        <div onClick={() => orderByValue()} className="column-title" id="value">
          Valor
          <img
            className={clickValue ? "order-by" : "order-by hidden"}
            src={orderingValue ? descendingOrder : ascendingOrder}
            alt="order-by"
          />
        </div>
        <div className="column-title"></div>
      </div>

      <div className="table-body">
        {transactionsData.map((transaction) => (
          <div className="table-line" key={transaction.id}>
            <div className="line-items date">
              {transaction.date.substr(0, 10).split("-").reverse().join("/")}
            </div>
            <div className="line-items">
              {transaction.week_day[0].toUpperCase() +
                transaction.week_day.substr(1)}
            </div>
            <div className="line-items">{transaction.description}</div>
            <div className="line-items">{transaction.category}</div>
            <div className={`line-items value-${transaction.type}`}>
              {(transaction.value / 100).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <div className="line-items">
              <img
                className="edit-icon"
                src={editIcon}
                alt="edit-icon"
                onClick={() => editingTransaction(transaction)}
              />
              <img
                className="delete-icon"
                src={deleteIcon}
                alt="delete-icon"
                onClick={() => deletingTransaction(transaction)}
              />
              <div
                className={`modal-confirm-delete ${
                  transactionDeleting.includes(transaction) ? "" : "hidden"
                }`}
              >
                <div className="container-confirm-delete">
                  <span>Apagar item?</span>
                  <div className="buttons">
                    <button
                      onClick={() => deleteTransaction(transaction)}
                      className="btn-actions-confirm-delete sim"
                    >
                      Sim
                    </button>
                    <button
                      onClick={() => setTransactionDeleting("")}
                      className="btn-actions-confirm-delete nao"
                    >
                      Não
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <img className="line-table" src={line} alt="line-table" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
