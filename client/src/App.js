import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      erro: null,
      mensagem: null,
      dados: null,
      uf: null,
      localidade: null,
      logradouroDNEC: null,
      bairro: null,
      buscaCep: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  callAPI(cep) {
    if (cep !== null) {
      fetch("http://localhost:9000/testAPI/" + cep)
        .then(res => res.json())
        .then(res => this.setState({
          erro: res.erro,
          mensagem: res.mensagem,
          dados: res.dados[0] ? res.dados[0] : null,
          uf:  res.dados[0] ? res.dados[0].uf : null,
          localidade:  res.dados[0] ? res.dados[0].localidade : null,
          logradouroDNEC:  res.dados[0] ? res.dados[0].logradouroDNEC : null,
          bairro:  res.dados[0] ? res.dados[0].bairro : null,
        }))
        .catch(err => err);
    }
  }

  handleChange (e) {
    this.setState({ buscaCep: e.target.value });
  }

  handleClick () {
    this.callAPI(this.state.buscaCep);
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="d-flex justify-content-center">
          <div className="App-body form-group">
            <label htmlFor="cep">CEP:</label>
            <div className="row">
              <div className="col-sm-10">
                <input className="form-control" type="text" id="cep" onChange={this.handleChange} />
              </div>
              <div className="col-sm-2">
                <button className="btn btn-primary" onClick={this.handleClick}>Buscar</button>
              </div>
            </div>
            <div className="App-response">
              <div className={this.state.mensagem ? 'alert alert-info':'invisible'}>
                {this.state.mensagem}
              </div>
              <div className={this.state.dados ? 'alert alert-secondary':'invisible'}>
                rua: {this.state.logradouroDNEC} <br />
                bairro: {this.state.bairro} <br />
                cidade: {this.state.localidade} <br />
                estado: {this.state.uf}<br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
