import "./Table.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { Context } from "../../Context/AuthContext";
import { ContactContext } from "../../Context/ContactContext";
import { useContext, useEffect} from "react";
import AddModal from "../AddModal/AddModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#F4F0F0",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#1C1414",
  },
  body: {
    fontFamily: "Roboto",
    fontWeight: "normal",
    fontSize: "14px",
    color: "rgba(28, 20, 20, 0.79)",
    marginTop: "5px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 900,
    backgroundColor: "#fff",
  },
});

function Home() {
  const classes = useStyles();
  const { baseURL, token, setErro } = useContext(Context);
  const {
    openAddModal,
    setOpenAddModal,
    openEditModal,
    openDeleteModal,
    contatos,
    setContatos,
    openModalDelete,
    openModalEdit
  } = useContext(ContactContext);

  useEffect(() => {
    getContacts();
  }, []);

  async function getContacts() {
    try {
      const response = await fetch(`${baseURL}/contatos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response) {
        setErro(data);
      }
      setContatos(data);
    } catch (error) {
      setErro(error.message);
    }
    setErro("")
  }

  return (
    <div className="container-table">
      <button onClick={() => setOpenAddModal(true)} className="btn-add">
        Adicionar
      </button>
      <TableContainer component={Paper} className="table">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Telefone</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contatos.map((contato) => (
              <StyledTableRow key={contato.id}>
                <StyledTableCell component="th" scope="row">
                  {contato.nome}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {contato.email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {contato.telefone}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <EditIcon
                    onClick={() => openModalEdit(contato)}
                    className="icon-edit"
                  />
                  {openEditModal && <EditModal getContacts={getContacts}/>}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <DeleteForeverIcon
                    onClick={() => openModalDelete(contato)}
                    className="icon-delete"
                  />
                  {openDeleteModal && <DeleteModal getContacts={getContacts}/>}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {openAddModal && <AddModal getContacts={getContacts} />}
      </TableContainer>
    </div>
  );
}

export default Home;
