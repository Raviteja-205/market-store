import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeStore = this.onChangeStore.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      address: '',
      phoneno: 0,
      birthday: new Date(),
      notes: 'empty',
      users: [],
      store:null,
      stores:['toys','electronics']
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/usersdata/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          address: response.data.address,
          phoneno: response.data.phoneno,
          store: response.data.store,
          notes: response.data.notes,
          birthday: new Date(response.data.birthday)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/usersdata/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeStore(e) {
    this.setState({
      store: e.target.value
    })
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  onChangeNumber(e) {
    this.setState({
      phoneno: e.target.value
    })
  }

  onChangeBirthday(date) {
    this.setState({
      birthday: date
    })
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    const exercise = {
      username: this.state.username,
      address: this.state.address,
      phoneno: this.state.phoneno,
      birthday: this.state.birthday,
      store: this.state.store,
      notes:this.state.notes
    }

    console.log(exercise);

    axios.post('http://localhost:5000/usersdata/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    //window.location = '/all';
  }

  render() {
    return (
    <div>
      <h3>Edit User data</h3>
      <br/>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}/>
        </div>
        <div className="form-group"> 
          <label>Address : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
              />
        </div>
        <div className="form-group">
          <label>Phone no: </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.phoneno}
              onChange={this.onChangeNumber}
              />
        </div>
        <div className="form-group">
          <label>Birthday : </label>
          <div>
            <DatePicker
              selected={this.state.birthday}
              onChange={this.onChangeBirthday}
            />
          </div>
        </div>

        <div className="form-group"> 
          <label>Store: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.store}
              onChange={
                (e) => {
                  this.setState({
                  store: e.target.value
              })}}
              >
              <option value={'select'}>SELECT</option>
              <option value={'electronics'}>ELECTS</option>
              <option value={'toys'}>TOYS</option>
          </select>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Data" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}