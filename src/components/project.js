import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ROOT_URL = 'https://dali-dashboard.herokuapp.com/api';

const Person = (props) => {
  if (!props.showMsg) {
    return (
      <div className="member">
        <img className="member-cover" alt="cover" src={`../${props.person.iconUrl}`} onMouseOver={props.onHover} />
        <Link className="name" to={`/member/${props.person._id}`}>{props.person.name}</Link>

      </div>
    );
  } else {
    return (
      <div className="member">
        <img className="member-cover" alt="cover" src={`../${props.person.iconUrl}`} onMouseLeave={props.onLeave} />
        <Link className="name" to={`/member/${props.person._id}`}>{props.person.name}</Link>
        <div className="hover-message">{props.person.message}</div>
      </div>
    );
  }
};


class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      description: ' ',
      cover_url: ' ',
      team: [],
      showMsg: false,
    };
    this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }
  componentDidMount() {
    const _id = this.props.match.params.id;
    axios.get(`${ROOT_URL}/project`, { params: { _id } })
    .then((response) => {
      this.setState({ _id,
        name: response.data.name,
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
  componentDidUpdate() {
    if (this.props.match.params.id !== this.state._id) {
      this.state.team = [];
      const _id = this.props.match.params.id;
      axios.get(`${ROOT_URL}/project`, { params: { _id } })
      .then((response) => {
        this.setState({ _id,
          name: response.data.name,
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
  }
  onHover() {
    this.setState({ showMsg: true });
  }
  onLeave() {
    this.setState({ showMsg: false });
  }
  render() {
    return (
      <div className="project-page">
        <div className="project-info">
          <h2> {this.state.name}</h2>
          <div className="parent">
            <img alt="cover" src={`../${this.state.cover_url}`} />
          </div>
          <p> {this.state.description}</p>
        </div>
        <h3>Project Team</h3>
        <ul>
          {this.state.team.map((person) => {
            return (<Person setProfile={this.props.setProfile} person={person} showMsg={this.state.showMsg} onHover={this.onHover} onLeave={this.onLeave} />);
          })}
        </ul>
      </div>

    );
  }
}
export default Project;
