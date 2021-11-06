import "./RegisterDisplay.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../Context/AuthContext";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function RegisterDisplay(props) {
  const classes = useStyles();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(0);
  const { baseURL, erro, setErro } = useContext(Context);

  async function handleRegister() {
    try {
      const body = {
        nome,
        email,
        senha,
      };      

      const response = await fetch(`${baseURL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.status === 200) {
        setError(2);
        const timeout = setTimeout(() => {
          props.history.push("/");
        }, 3000);

        return () => {
          clearTimeout(timeout);
        };
      }

      setErro(data);
      setError(1);

      const timeout = setTimeout(() => {
        setError(0);
        setErro("");
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    } catch (error) {
      console.log(error.message);
    }
    setNome("");
    setEmail("");
    setSenha("");
    setErro("");
  }

  return (
    <div className="container-register">
      <div className="container-box-register">
        {error === 1 && (
          <Alert variant="filled" severity="error">
            {erro}
          </Alert>
        )}
        <h3 className="h3-register">Cadastre-se</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="container-inputs-register">
            <input
              onChange={(e) => setNome(e.target.value)}
              className="input-login"
              placeholder="Nome"
              value={nome}
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="input-login"
              placeholder="E-mail"
              value={email}
            />
            <input
              onChange={(e) => setSenha(e.target.value)}
              className="input-login"
              placeholder="Senha"
              value={senha}
            />
          </div>
          <div className="container-btns">
            <button onClick={() => handleRegister()} className="btn btn-login">
              CADASTRAR
            </button>
            <button
              onClick={() => {
                props.history.push("/");
              }}
              className="btn btn-cancel"
            >
              CANCELAR
            </button>
          </div>
          <span>
            Já tem cadastro?
            <Link to="/" className="href-login" href="">
              Clique aqui!
            </Link>
          </span>
        </form>
        {error === 2 && (
          <Alert variant="filled" severity="success">
            Cadastro efetuado com sucesso! Entre com seu e-mail e senha
            cadastrados!
          </Alert>
        )}
      </div>
      <div className="containerRegister-image"></div>
    </div>
  );
}

export default RegisterDisplay;
