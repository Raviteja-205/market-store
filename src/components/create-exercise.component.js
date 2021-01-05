import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const mystyles={
  "display": "flex",
  "align-items": "center",
  "justify-content": "space-between"
}

const Field = props => (
//<form onSubmit={props.changenotes}> 
  <div style={mystyles}> 
          <input type="text"
              required
              className="form-control"
              placeholder="enter field"
              />
          <input type="text"
              required
              className="form-control"
              placeholder="enter data"
              />
          {/* <button onClick={() => props.changenotes("Everything")} placeholder="POST">POST</button> */}
  </div>
 // </form>
  
)
export default class CreateExercise extends Component {
  constructor(props) {
    
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeStore = this.onChangeStore.bind(this);
    this.onChangefield = this.onChangefield.bind(this);
    this.onField = this.onField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      address: '',
      phoneno: 0,
      birthday: new Date(),
      users: [],
      notes: 'empty',
      field : [],
      store: null,
      stores:['toys','electronics']
    }
  }

 /* componentDidMount() {
    axios.get('http://localhost:5000/usersdata/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }*/

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeAddress(e) {
    this.setState({
      address : e.target.value
    })
  }

  onChangeNumber(e) {
    this.setState({
      phoneno : e.target.value
    })
  }

  onChangeBirthday(date) {
    this.setState({
      birthday: date
    })
  }

  onChangeStore(e) {
    this.setState({
      store: e.target.value
    })
  }
  onChangeNotes(item) {
    this.setState({
      notes: item
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      address: this.state.address,
      phoneno: this.state.phoneno,
      birthday: this.state.birthday,
      store : this.state.store,
      notes:this.state.notes
    }

    console.log(exercise);

    axios.post('usersdata/add', exercise)
      .then(res => console.log(res.data));

   // window.location = '/all';
  }

  onField(){
    return(
      this.state.field && this.state.field.map(field => {
      return(
        <Field key={field}>ADDED</Field>
        );
    })
    );
  }
  onChangefield(e){
    console.log(this.state.field)
    var joined = this.state.field.concat(e);
    this.setState({ field: joined,})
    console.log(this.state.field)
  }

  render() {
    const mystyles={
      "display": "flex",
      "justify-content" : "space-between"
    }
    return (
    <div>
      <div style={mystyles}>
      <h3>Create New User Data</h3>
      <button class='btn btn-success' onClick={this.onChangefield}>NEW FIELD +</button>
      </div>
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
          <label>Address: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
              />
        </div>
        <div className="form-group">
          <label>Phone No : </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.phoneno}
              onChange={this.onChangeNumber}
              />
        </div>
        <div className="form-group">
          <label>Birthday </label>
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
        <div>
        {this.state.field && this.state.field.map(field => {
          return(
          <div><Field key={field}>ADDED</Field><br/></div>)
        })}
        <br/>
        </div>
        <div className="form-group">
          <input type="submit" value="Create User Data" className="btn btn-primary" />
        </div>
        
      </form>
    </div>
    )
  }
}