import React, { Component } from 'react';
import './App.css';

// EXAMPLE CLASS
class AutoRedirectExample extends React.Component {
  constructor(props) {
    super(props);
    this.clickGoogle = React.createRef();
  }

  componentDidMount() {
    this.clickGoogle.current.click();
  }

  render() {
    return (
      <div>
        <a ref={this.clickGoogle} href="https://www.google.com">Google</a>
      </div>
    );
  }
}




// APP MIMIC CLASS
class ExpressAuthCheck extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    status: false
  }

  componentDidMount() {
    this.fetchAuthStatus()
      .then(response => this.setState({ status: response.isLoggedIn }))
      .catch(err => console.log(err));
  }

  fetchAuthStatus = async() => {
    const response = await fetch('/authcheck', {credentials : 'same-origin'});
    const body = await response.json();

    // THIS MAY HELP, Remove .then from this.fetchAuthStatus method
    //await this.setState({status: body.isLoggedIn});

    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    if (this.state.status) {
      return  <form action='http://localhost:3001/saml/logout'>
              <input type="submit" value="Logout"/>
              </form>
    }else {
      return <a href = 'http://localhost:3001/saml/login'>Login</a>
    }
  }
}

class App extends Component {
  render() {
    // Toggle AutoRedirectExample and ExpressAuthCheck
    if (false) {
      return <ExpressAuthCheck/>
    }else {
      return <AutoRedirectExample/>
    }
  }
}

export default App;
