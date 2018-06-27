import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    loggedIn: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ loggedIn: res.authStatus }))
      .catch(err => console.log(err));
  }

  callApi = async ()=> {
    const loggedIn = await fetch('/authcheck', {credentials : 'same-origin'});
    const body = await loggedIn.json();

    if (loggedIn.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.loggedIn}
        </p>
      </div>
    );
  }
}

export default App;
