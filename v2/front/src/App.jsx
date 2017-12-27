import React, { Component } from 'react';
import './App.css';

var axios = require('axios');
const ipRegex = require('./ipregex');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ips: [], // {ip: <ip>, port: <port>}
      modalIsOpen: false,
      newip: "192.168.0.1",
      newport: "8080"
    }
  }
  componentDidMount() {
    if (!localStorage.getItem('ips')) return;
    this.setState({ips: JSON.parse(localStorage.getItem('ips'))})
  }
  checkServer(index) {
    axios.get(this.state.ips[index].ip + this.state.ips[index].port)
    .then(function(response) {
      alert(response.data);
    })
    .catch(function(error) {
      alert('Offline');
    });
  }
  callRestart(index) {
    axios.get(this.state.ips[index].ip + this.state.ips[index].port + '/restart')
    .then(function(response) {
      alert(response.data);
    })
    .catch(function(error) {
      alert('Offline');
    });
  }
  callShutdown(index) {
    axios.get(this.state.ips[index].ip + this.state.ips[index].port + '/shutdown')
    .then(function(response) {
      alert(response.data);
    })
    .catch(function(error) {
      alert('Offline');
    });
  }
  restartAll() {
    let numServers = this.state.ips.length;
    for (let i = 0; i < numServers; i++) {
      this.callRestart(i);
    }
  }
  shutdownAll() {
    let numServers = this.state.ips.length;
    for (let i = 0; i < numServers; i++) {
      this.callShutdown(i);
    }
  }
  validateIP(ip) {
    return ipRegex({exact: true}).test(ip);
  }
  addServer = () => {
    let newip = this.state.newip;
    if (this.validateIP(newip) === false) {
      alert('Please enter a valid IP');
      return;
    }
    let newport = this.state.newport;
    let ips = this.state.ips;
    for (var ip of ips) {
      if (newip === ip.ip) {
        alert('IP is already added');
        return;
      }
    }
    ips.push({ip: newip, port: newport});
    this.setState({ips: ips});
    localStorage.setItem('ips', JSON.stringify(this.state.ips));
  }
  removeServer(index) {
    let tempState = this.state.ips;
    tempState.splice(index, 1);
    this.setState({ips: tempState});
    localStorage.setItem('ips', JSON.stringify(this.state.ips));
  }
  modalVisible = () => {
    this.setState({modalIsOpen: true});
  }
	handleChange = name => event => {
		this.setState({[name]: event.target.value});
  }
  displayServers() {
    return this.state.ips.map((info, index) => {
      return(
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{info.ip}</td>
          <td>{info.port}</td>
          <td><button className="btn btn-primary" onClick={() => {this.checkServer(index)}}>Check</button></td>
          <td><button className="btn btn-primary" onClick={() => {this.callRestart(index)}}>Restart</button></td>
          <td><button className="btn btn-primary" onClick={() => {this.callShutdown(index)}}>Shutdown</button></td>
          <td><button className="btn btn-primary" onClick={() => {this.removeServer(index)}}>Remove</button></td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div className="container">
        <div className="modal fade" id="newServerModal" tabIndex="-1" role="dialog" aria-labelledby="newServerModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="newServerModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="d-flex">
                  <input className="modal-input" type="text" onChange={this.handleChange('newip')} placeholder={this.state.newip}></input>
                  :
                  <input className="modal-input" type="text" onChange={this.handleChange('newport')} placeholder={this.state.newport}></input>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.addServer}>Add Server</button>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="row">
            <div className="col text-center">
              <h1>Remotely restart your linux servers!</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <button type="button" className="btn btn-primary h-button" data-toggle="modal" data-target="#newServerModal">Add Server</button>
            <button type="button" className="btn btn-primary h-button" onClick={this.restartAll}>Restart All</button>
            <button type="button" className="btn btn-primary h-button" onClick={this.shutdownAll}>Shutdown All</button>
          </div>
          <div className="row text-center justify-content-center">
            <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">IP</th>
                <th scope="col">Port</th>
                <th scope="col">Status</th>
                <th scope="col">Restart</th>
                <th scope="col">Shutdown</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.displayServers()}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
