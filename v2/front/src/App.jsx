import React, { Component } from 'react';
import './App.css';

var axios = require('axios');

class App extends Component {
  callRestart() {
    axios.get('http://localhost:8080/');
  }
  render() {
    return (
      <div>
        <h1>Remotely restart your linux servers!</h1>
        <button onClick={this.callRestart}>Restart</button>
      </div>
    );
  }
}

export default App;
