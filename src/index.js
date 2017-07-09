import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './style.scss';
import Menu from './components/sidebar';
import Project from './components/project';
import People from './components/people';
import Profile from './components/profile';

const ROOT_URL = 'https://dali-dashboard.herokuapp.com/api';

const Welcome = (props) => {
  return (
    <div className="welcome">
      <img alt="logo" src="https://static1.squarespace.com/static/551cbdc5e4b0cd11d2597487/t/563e8959e4b0dc853ed2db49/1446938972012/" />
      <h3> Welcome to DALI dashboard!</h3>
    </div>
  );
};
const NavBar = (props) => {
  return (
    <div className="nav" >
      <div className="nav-header" onClick={() => props.toggle()}>Project</div>
      <img className="logo" alt="logo" src="../images/dali-logo.png" />
      <Link to="/people"><div className="nav-header">People</div></Link>
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
      member: {},
      displayMenu: false,
    };
    this.setProfile = this.setProfile.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
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

  setProfile(person) {
    this.setState({ member: person });
    console.log(this.state.member);
  }
  toggleMenu() {
    console.log('toggle');
    this.setState({ displayMenu: !this.state.displayMenu });
  }
  renderMenu() {
    if (this.state.displayMenu) {
      return (
        <Menu projects={this.state.projects} />
      );
    } else {
      return (
        <div className="no-display" />
      );
    }
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar toggle={this.toggleMenu} />
          {this.renderMenu()}
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/project/:id" component={Project} />
            <Route path="/people" component={People} />
            <Route path="/member/:id" component={Profile} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>


    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
