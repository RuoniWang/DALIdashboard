import React, { Component } from 'react';
import axios from 'axios';

const ROOT_URL = 'localhost:9090';

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
  ComponentDidMount() {
    const id = this.props.params.id;
    axios.get(`${ROOT_URL}/project/:${id}`)
    .then((response) => {
      this.setState({ name: response.name,
        description: response.description,
        cover_url: response.cover_url });
      axios.get(`${ROOT_URL}/project_member`, { team: response.team })
      .then((people) => {
        this.setState({ team: response.data });
      });
    });
  }
  render() {
    return (
      <div>
        <h1> {this.state.name}</h1>
        <img alt="cover" src={this.state.cover_url} />
        <p> {this.state.description}</p>
        <ul>
          {this.state.team.map((person) => {
          // console.log(post.tags);
            return <div>{person.name}</div>;
          })}
        </ul>
      </div>
    );
  }
}
export default Project;
