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
    this.followExpressRedirect = React.createRef();// redirect anchor ref
  }

  state = {
    authenticatedInState: false
  }

  componentDidMount() {
    this.fetchAuthStatus()
      .then(response => this.setState({ authenticatedInState: response.authenticatedInExpress }))
      .then(()=>{
        if (!this.state.authenticatedInState) { // perform redirect if not authenticated
          //console.log("cdm" + !this.state.authenticatedInState);
          this.followExpressRedirect.current.click();
        }
      })
      .catch(err => console.log(err));
  }

  fetchAuthStatus = async() => {
    const response = await fetch('/authcheck', {credentials : 'same-origin'});
    const body = await response.json();

    // THIS MAY HELP, Remove .then from this.fetchAuthStatus method
    //await this.setState({authenticatedInState: body.authenticatedInExpress});

    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    if (this.state.authenticatedInState) {
      return  <form action='http://localhost:3001/saml/logout'>
              <input type="submit" value="Logout"/>
              </form>
    }else {
      return <a ref={this.followExpressRedirect} href = 'http://localhost:3001/saml/login'>Login</a>
    }
  }
}

class App extends Component {
  render() {
    // Toggle AutoRedirectExample and ExpressAuthCheck
    if (true) {
      return <ExpressAuthCheck/>
    }else {
      return <AutoRedirectExample/>
    }
  }
}

export default App;
