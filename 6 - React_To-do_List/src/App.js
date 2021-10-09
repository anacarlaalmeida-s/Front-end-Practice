import { useState } from "react";
import btnFechar from "./assets/delete.svg";
import imgLinha from "./assets/rectangle.svg";

function Tarefa(props) {
  return (
    <li className={props.className}>
      <span
        onClick={() => props.completarTarefa(props.id)}
        style={{
          textDecoration: props.completa ? "line-through" : "",
          color: props.completa ? "#D1D2DA" : "",
        }}
      >
        {props.children}
      </span>
      <img
        onClick={() => props.deletarTarefa(props.id)}
        className="fechar"
        src={btnFechar}
        alt="fechar"
      />
    </li>
  );
}

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tamanho, setTamanho] = useState(0);

  function digitarTarefa(event) {
    const valorInput = event.target.value;

    if (event.key !== "Enter" || valorInput === "") return;

    const tarefasAtualizadas = [
      ...tarefas,
      { id: Math.random(), texto: valorInput, completa: false },
    ];

    setTarefas(tarefasAtualizadas);
    setTamanho(tarefasAtualizadas.length);
    event.target.value = "";
  }

  function deletarTarefa(id) {
    const tarefasAtualizadas = tarefas.filter(function (tarefa) {
      return tarefa.id !== id;
    });
    const tarefasPendentes = tarefasAtualizadas.filter(function (tarefa) {
      return !tarefa.completa;
    });

    setTarefas(tarefasAtualizadas);
    setTamanho(tarefasPendentes.length);
  }

  function completarTarefa(id) {
    const tarefasAtualizadas = [...tarefas];

    const tarefaCompletada = tarefasAtualizadas.find(function (tarefa) {
      return tarefa.id === id;
    });
    tarefaCompletada.completa = !tarefaCompletada.completa;

    const tarefasPendentes = tarefasAtualizadas.filter(function (tarefa) {
      return !tarefa.completa;
    });

    setTarefas(tarefasAtualizadas);
    setTamanho(tarefasPendentes.length);
  }

  function exibirTarefas() {
    const tarefasAtualizadas = [...tarefas];

    tarefasAtualizadas.forEach((tarefa) => {
      tarefa.className = "";
    });
    setTarefas(tarefasAtualizadas);
  }

  function deletarTarefaCompletada() {
    const tarefasAtualizadas = [...tarefas];

    const tarefasPendentes = tarefasAtualizadas.filter(function (tarefa) {
      return !tarefa.completa;
    });

    setTarefas(tarefasPendentes);
  }

  function exibirTarefasAtivas() {
    const tarefasAtualizadas = [...tarefas];

    tarefasAtualizadas.forEach((tarefa) => {
      !tarefa.completa
        ? (tarefa.className = "")
        : (tarefa.className = "hidden");
    });

    const tarefasPendentes = tarefasAtualizadas.filter(function (tarefa) {
      return !tarefa.completa;
    });

    setTarefas(tarefasAtualizadas);
    setTamanho(tarefasPendentes.length);
  }

  function exibirTarefasCompletadas() {
    const tarefasAtualizadas = [...tarefas];

    tarefasAtualizadas.forEach((tarefa) => {
      !tarefa.completa
        ? (tarefa.className = "hidden")
        : (tarefa.className = "");
    });

    setTarefas(tarefasAtualizadas);
    setTamanho(0);
  }

  return (
    <div className="App">
      <h1>TAREFAS</h1>
      <input
        type="text"
        placeholder="Criar uma nova tarefa"
        onKeyDown={digitarTarefa}
      ></input>
      <div className="quadroDeTarefas">
        <ul className="listaDeTarefas">
          {tarefas.map(function (tarefa) {
            return (
              <Tarefa
                className={tarefa.className}
                key={tarefa.id}
                id={tarefa.id}
                deletarTarefa={deletarTarefa}
                completarTarefa={completarTarefa}
                completa={tarefa.completa}
              >
                {tarefa.texto}
                <img className="linha" src={imgLinha} alt="linha" />
              </Tarefa>
            );
          })}
        </ul>
        <div className="rodapeListaDeTarefas">
          <div className="atividadesRestantes">
            <span> {`${tamanho}`} itens restantes</span>
          </div>
          <div className="situacaoTarefas">
            <span className="todas" onClick={exibirTarefas}>
              Todas
            </span>
            <span onClick={exibirTarefasAtivas}>Ativas</span>
            <span onClick={exibirTarefasCompletadas}>Completada</span>
            <span className="limparTarefas" onClick={deletarTarefaCompletada}>
              Limpar Completadas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
