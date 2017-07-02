import React, { Component } from 'react';
import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: {},
    };
  }
  componentDidMount() {
    const _id = this.props.match.params.id;
    console.log(_id);
    axios.get(`${ROOT_URL}/member`, { params: { _id } }).then((response) => {
      console.log(response);
      this.setState({ member: response.data });
    },
  ).catch((err) => {
    console.log(err);
  });
  }


  render() {
    return (
      <div>
        <p>{this.state.member.name}</p>
      </div>
    );
  }
}

export default Profile;
