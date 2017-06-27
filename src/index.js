import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style.scss';
import SideBar from './components/sidebar';
import Project from './components/project';
import People from './components/people';
import Profile from './components/profile';

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
const App = (props) => {
  return (

    <Router>
      <div>
        <SideBar />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/project/:id" component={Project} />
        <Route path="/people" component={People} />
        <Route path="/member" component={Profile} />
        <Route component={FallBack} />
      </div>
    </Router>


  );
};


ReactDOM.render(<App />, document.getElementById('main'));
