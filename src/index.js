import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.scss';
import SideBar from './components/sidebar';
import Project from './components/project';
import People from './components/people';
import Profile from './components/profile';

const ROOT_URL = 'http://localhost:9090/api';

const Welcome = (props) => {
  return (
    <div>
    Welcome to DALI lab!
    </div>
  );
};

const FallBack = (props) => {
  return (
    <div>
      URL not found!
    </div>
  );
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: Immutable.Map(),
    };
  }
  componentDidMount() {
    console.log('mounting!');
    axios.get(`${ROOT_URL}/projects`).then((responses) => {
      responses.data.forEach((response) => {
        this.setState({ projects: this.state.projects.set(response.name, response._id) });
      });
    }).catch((err) => {
      console.log(err);
    });
  }
  render() {
    return (
      <Router>
        <div>
          <SideBar projects={this.state.projects} />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/project/:id" component={Project} />
            <Route path="/people" component={People} />
            <Route path="/member" component={Profile} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>


    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
