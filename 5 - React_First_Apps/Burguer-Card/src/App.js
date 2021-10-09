import { useState } from 'react';
import imagemLanche from './assets/hamburguer.png';


function App() {
  const [quantidade, setQuantidade] = useState(0);

  function adicionar (){  
    setQuantidade (quantidade + 1);  
  }

  function remover (){  
    if (quantidade === 0){
      return 0;
    }
    setQuantidade (quantidade - 1);  
  }

  return (
    <div className="App">
      <div className="container-card">
        <div className="fotoLanche">
          <img src={imagemLanche} alt='imagemLanche' />
        </div>
        <div className="lanche-descricao">
          <h1 className="nomeLanche">Hamburguer</h1>
          <span className="descricao">
            Arcu, sagittis, ut lectus congue dapibus semper odio a, lobortis.           
          </span>
        </div>
        <div className="selecao-quantidade">
          <button onClick = {remover} className = "remover">-</button>
          <span className="quantidade">{quantidade}</span>
          <button onClick = {adicionar} className = "adicionar">+</button>
        </div>
      </div>
    </div>
  );
}

export default App;
