import React, { Component } from 'react';
import axios from 'axios';
//const url = 'http://localhost:8080';
//const host = location.hostname;
 // axios.defaults.baseURL = 'http://hastore.local';
 //axios.defaults.baseURL = host;
 axios.defaults.port = 8080;

 const User = props => (
  <tr>
    <td>{props.user.username}</td>
  </tr>
)

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
      this.state = {users: []};

    this.state = {
      username: '',
      users:[]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
    .then(response => {
      this.setState({ users: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  usersList() {
    return this.state.users.map(cuser => {
      return <User user={cuser}  key={cuser._id}/>;
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);
    axios.post('users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
    this.componentDidMount()
    this.usersList()

  }

  render() {

    const { username } = this.state
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
        <table>
          <tbody>
            { this.usersList() }
          </tbody>
        </table>
      </div>
    )
    }}
