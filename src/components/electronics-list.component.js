import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.address}</td>
    <td>{props.exercise.phoneno}</td>
    <td>{props.exercise.birthday}</td>
    <td>{ props.exercise.store && <div>{props.exercise.store}</div>}</td>
    <td>
      <Link class="btn btn-success" to={"/edit/"+props.exercise._id}>edit</Link> | <a class = 'btn btn-danger' href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
  )

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/usersdata/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/usersdata/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      if(currentexercise.store=='electronics')
      {
        return (<Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>);
      }
    })
  }

  render() {
    return (
      <div>
        <h3>Customers Data</h3>
        <br></br>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Address</th>
              <th>Phone No</th>
              <th>Birthday</th>
              <th>Store</th>
            </tr>
          </thead>
          <br/>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}