import React, { Component } from 'react';
import axios from 'axios';


const ROOT_URL = 'http://localhost:9090/api';

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    };
  }

  componentDidMount() {
    console.log('mounting!');
    axios.get(`${ROOT_URL}/members`).then((responses) => {
      responses.data.forEach((person) => {
        this.setState({ people: this.state.people.concat(person) });
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        {this.state.people.map((person) => {
          return <div >{person.name}</div>;
        })}
      </div>
    );
  }
}
export default People;
