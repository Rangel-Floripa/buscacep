import { useState } from 'react';
//import { fetch } from 'react';

import './App.css';

function App() {

  const [endereco, setEndereco] = useState({});

  function manipularEndereco(evento) {

    const cep = evento.target.value;

    setEndereco({ cep });

    if (cep && cep.length === 8) {

      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
          setEndereco(enderecoAntigo => {
            return {
              ...enderecoAntigo,
              cep: dados.cep,
              logradouro: dados.logradouro,
              bairro: dados.bairro,
              localidade: dados.localidade,
              uf: dados.uf
            }
          })
        })
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Busca cep com React</h1>

        <input placeholder='Digite o cep' onChange={manipularEndereco} />
        <div className='item'>
        <ul >
          <li>CEP:  {endereco.cep}</li>
          <li>Rua:  {endereco.logradouro}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Cidade: {endereco.localidade}</li>
          <li>Estado: {endereco.uf}</li>
        </ul>
       </div>

      </header>
    </div>
  );
}

export default App;
