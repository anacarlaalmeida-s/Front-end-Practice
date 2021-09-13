import { useState } from "react";
import kelvinPerfil from "./assets/kelvin-costa.png";

function App() {
  const [perfil, setPerfil] = useState({
    nome: "Kelvin Costa",
    foto: kelvinPerfil,
    perfil: "@costa",
    seguidores: 140,
    seguindo: 207,
    botaoClasse: "",
    botaoTexto: "SEGUIR"
  });

  function seguir() {
    if(perfil.botaoTexto === "SEGUIR"){
      setPerfil({ ...perfil, seguidores: perfil.seguidores + 1, botaoClasse: "seguiu", botaoTexto: "SEGUINDO"});    
    }
    if(perfil.botaoTexto === "SEGUINDO"){
      setPerfil({ ...perfil, seguidores: perfil.seguidores - 1, botaoClasse: "", botaoTexto: "SEGUIR"});    
    }       
  }  

  return (
    <div className="App">
      <div className="card">
        <img src={perfil.foto} alt={perfil.nome} />
        <h1 className="nomePerfil">{perfil.nome}</h1>
        <span className="enderecoPerfil">{perfil.perfil}</span>
        <span className="seguidores">{perfil.seguidores} seguidores</span>
        <span className="seguindo">{perfil.seguindo} seguindo</span>
      </div>
      <button onClick={seguir} className={`${perfil.botaoClasse}`}>
        {perfil.botaoTexto}
      </button>
    </div>
  );
}

export default App;
