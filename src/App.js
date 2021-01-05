import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ToysList from "./components/toys-list.component";
import ElectronicsList from "./components/electronics-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import AllList from "./components/all-list.component";
//import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/all" exact component={AllList} />
      <Route path="/toys" exact component={ToysList} />
      <Route path="/electronics" exact component={ElectronicsList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      {/* <Route path="/user" component={CreateUser} /> */}
      </div>
    </Router>
  );
}

export default App;
