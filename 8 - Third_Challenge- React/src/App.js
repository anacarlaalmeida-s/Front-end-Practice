import "./App.css";
import logo from "./assets/logo.svg";
import filterButton from "./assets/filter.svg";
import Filter from "./components/Filter";
import Table from "./components/Table";
import Resume from "./components/Resume";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import { useState, useEffect } from "react";

function App() {
  const [showFilter, setShowFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [date, setDate] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState();
  const [category, setCategory] = useState("");
  const [type, setType] = useState("debit");
  const [transactionsData, setTransactionsData] = useState([]);
  const [transactionInEditing, setTransactionInEditing] = useState([]);
  const [resumeCredit, setResumeCredit] = useState([0]);
  const [resumeDebit, setResumeDebit] = useState([0]);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    try {
      const response = await fetch("http://localhost:3333/transactions", {
        method: "GET",
      });
      const data = await response.json();
      setTransactionsData(data);
    } catch (error) {
      console.log(error);
    }
  }

  function editingTransaction(transaction) {
    setTransactionInEditing(transaction);
    setValue((transaction.value / 100).toFixed(2));
    setCategory(transaction.category);
    setDate(transaction.date.substr(0, 10).split("-").reverse().join("/"));
    setDescription(transaction.description);
    setType(transaction.type);
    setShowEditModal(true);
  }

  function toggleFilter() {
    showFilter ? setShowFilter(false) : setShowFilter(true);
  }

  return (
    <div className="App">
      <header className="container-header">
        <img className="logo" src={logo} alt="logo" />
        <h1>Dindin</h1>
      </header>
      <main className="container-main">
        <button onClick={() => toggleFilter()} className="open-filters-button">
          <img src={filterButton} alt="filter-logo" />
          Filtrar
        </button>
        {showFilter && (
          <Filter
            transactionsData={transactionsData}
            setTransactionsData={setTransactionsData}
            loadTransactions={loadTransactions}
          />
        )}
        <Table
          transactionsData={transactionsData}
          setTransactionsData={setTransactionsData}
          editingTransaction={editingTransaction}
          setResumeCredit={setResumeCredit}
          setResumeDebit={setResumeDebit}
          loadTransactions={loadTransactions}
        />
        <Resume
          setShowAddModal={setShowAddModal}
          resumeCredit={resumeCredit}
          resumeDebit={resumeDebit}
        />
        {showAddModal && (
          <AddModal
            setShowAddModal={setShowAddModal}
            value={value}
            setValue={setValue}
            category={category}
            setCategory={setCategory}
            date={date}
            setDate={setDate}
            setWeekDay={setWeekDay}
            description={description}
            setDescription={setDescription}
            type={type}
            setType={setType}
            loadTransactions={loadTransactions}
          />
        )}
        {showEditModal && (
          <EditModal
            setShowEditModal={setShowEditModal}
            transactionInEditing={transactionInEditing}
            value={value}
            setValue={setValue}
            category={category}
            setCategory={setCategory}
            date={date}
            setDate={setDate}
            setWeekDay={setWeekDay}
            description={description}
            setDescription={setDescription}
            type={type}
            setType={setType}
            loadTransactions={loadTransactions}
          />
        )}
      </main>
    </div>
  );
}

export default App;
