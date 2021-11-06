import "./LoginDisplay.css";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../Context/AuthContext";

// "email": "tksalmeida@teste.com", "senha": "1234"
// "email": "tksalmeida@hotmail.com", "senha": "1234"
// "email": "testeteste@teste.com", "senha": "1234"

function LoginDisplay(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { baseURL, setUserSession } = useContext(Context);  

  async function handleLogin() {

    try {
      const body = {
        email: email,
        senha: senha,
      };

      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const {data, token} = await response.json();
      console.log(data)

      if (!data.token) {
        setError(data);
        return console.log(`state error  = ${error}`);
      }
      setUserSession(data.token);
      props.history.push("/home");
    } catch (error) {
      setError("Algo deu errado, tente novamente mais tarde!");
    }
    setError("");
    setEmail("");
    setSenha("");
  }

  return (
    <div className="container-login">
      <div className="containerLogin-image"></div>
      <div className="container-box-login">
        <h5 className="h5-login">Bem-vindo</h5>
        <h1 className="h1-login">Faça o login com a sua conta</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="containser-inputs-login">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="input-login"
              placeholder="E-mail"
              value={email}
            />
            <input
              onChange={(e) => setSenha(e.target.value)}
              type="password"
              className="input-login"
              placeholder="Senha"
              value={senha}
            />
          </div>
          <button onClick={() => handleLogin()} className="btn-login">
            LOGIN
          </button>
        </form>
        <span>
          Não tem cadastro?{" "}
          <Link to="/sign-up" className="href-login" href="">
            Clique aqui!
          </Link>
        </span>
      </div>
    </div>
  );
}

export default LoginDisplay;
