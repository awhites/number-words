import React, { Component } from "react";
import NumberSentenceGenerator from "./containers/NumberSentenceGenerator";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <NumberSentenceGenerator />
      </div>
    );
  }
}

export default App;
