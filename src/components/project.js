import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ROOT_URL = 'http://localhost:9090/api';

const Person = (props) => {
  console.log(props.person.iconUrl);
  return (
    <li>
      <Link to={`/member/${props.person._id}`}>{props.person.name}</Link>
      <img className="member-cover" alt="cover" src={`../${props.person.iconUrl}`} />
    </li>
  );
};

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ' ',
      cover_url: ' ',
      team: [],
    };
  }
  componentDidMount() {
    const _id = this.props.match.params.id;
    console.log(_id);
    axios.get(`${ROOT_URL}/project`, { params: { _id } })
    .then((response) => {
      this.setState({ name: response.data.name,
        description: response.data.description,
        cover_url: response.data.cover_url });
      axios.get(`${ROOT_URL}/project_member`, { params: { project: this.state.name } })
      .then((team) => {
        team.data.forEach((person) => {
          this.setState({ team: this.state.team.concat(person) });
        });
      });
    });
  }
  render() {
    return (
      <div>
        <h1> {this.state.name}</h1>
        <img className="project-cover" alt="cover" src={`../${this.state.cover_url}`} />
        <p> {this.state.description}</p>
        <ul>
          {this.state.team.map((person) => {
            return (<Person setProfile={this.props.setProfile} person={person} />);
          })}
        </ul>
      </div>
    );
  }
}
export default Project;
