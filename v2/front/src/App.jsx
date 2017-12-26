import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './App.css';

var axios = require('axios');

ReactModal.setAppElement('#root');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ips: [{
        ip: "localhost",
        port: "8080"
      }],
      modalIsOpen: false,
      newip: "192.168.0.100",
      newport: "8080"
    }
  }
  checkServer() {
    axios.get('http://localhost:8080/')
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log('error: ' + error);
    });
  }
  callRestart() {
    axios.get('http://localhost:8080/restart');
  }
  addServer = () => {
    let newip = this.state.newip;
    let newport = this.state.newport;
    let ips = this.state.ips;
    for (var ip of ips) {
      if (newip === ip) {
        alert('IP is already added');
        return;
      }
    }
    ips.push({ip: newip, port: newport});
    this.setState({ips: ips});
  }
  modalVisible = () => {
    this.setState({modalIsOpen: true});
  }
	handleChange = name => event => {
		this.setState({[name]: event.target.value});
  }
  displayServers() {
    console.log('displaying servers');
    return this.state.ips.map((info, index) => {
      return(
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{info.ip}</td>
          <td>{info.port}</td>
          <td><button className="btn btn-primary" onClick={this.checkServer}>Check server</button></td>
          <td><button className="btn btn-primary" onClick={this.callRestart}>Restart</button></td>
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
                  <input type="text" onChange={this.handleChange('newip')} placeholder="192.168.0.1"></input>
                  :
                  <input type="text" onChange={this.handleChange('newport')} placeholder="8080"></input>
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
            <div className="col">
              Remotely restart your linux servers!
            </div>
          </div>
          <div className="row">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#newServerModal">Add Server</button>
          </div>
          <div className="row">
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">IP</th>
                <th scope="col">Port</th>
                <th scope="col">Status</th>
                <th scope="col">Restart</th>
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
