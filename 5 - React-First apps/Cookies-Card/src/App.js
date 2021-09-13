import { useState } from 'react';
import close from './assets/close.svg';
import cookie from './assets/cookie.svg';


function App() {
  const [card, setCard] = useState();

  function esconder() {
    setCard('hidden')
  };

  return (
    <div className={`App ${card}`}>
      <div className='card'>
        <img onClick={esconder} src={close} alt='Close' className='close-button' />
        <img src={cookie} alt='cookie' className='icon' />
        <p>
          Nós utilizamos cookies para melhorar nossa UX, analytics e marketing.
        </p>
        <button onClick={esconder}>Tudo bem! </button>
      </div>
    </div>
  );
}

export default App;


