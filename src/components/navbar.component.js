import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">MUX</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/all" className="nav-link">ALL DETAILS</Link>
          </li>
          <li className="navbar-item">
          <Link to="/toys" className="nav-link">TOYS DETAILS</Link>
          </li>
          <li className="navbar-item">
          <Link to="/electronics" className="nav-link">ELECTRONICS DETAILS</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">NEW DATA</Link>
          </li>
          {/* <li className="navbar-item"> */}
          {/* <Link to="/user" className="nav-link">Create User</Link> */}
          {/* </li> */}
        </ul>
        </div>
      </nav>
    );
  }
}