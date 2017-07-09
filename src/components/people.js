import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ROOT_URL = 'https://dali-dashboard.herokuapp.com/api';

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
      <div className="member-background">
        <div className="member-page">
          {this.state.people.map((person) => {
            return (<div>
              <Link className="member" to={`/member/${person._id}`}>
                <img className="member-cover" alt="cover" src={`../${person.iconUrl}`} />
                {person.name}
              </Link>

            </div>);
          })}
        </div>
      </div>
    );
  }
}
export default People;
