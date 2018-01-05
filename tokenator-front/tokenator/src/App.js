import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import GetOnePrimary from "./components/GetOnePrimary";
import CreateOneToken from "./components/CreateOneToken";
import GetManyPrimary from "./components/GetManyPrimary";
import CreateManyToken from "./components/CreateManyToken";
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <GetOnePrimary />
        <br />
        <CreateOneToken />
        <br />
        <GetManyPrimary />
        <br />
        <CreateManyToken />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Credit Card Service</h1>
        </header>
      </div>
    );
  }
}

export default App;
