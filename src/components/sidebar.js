import React, { Component } from 'react';
import { SideNav, SideNavItem } from 'react-materialize';
import axios from 'axios';

const ROOT_URL = 'localhost:9090/dali';
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: ['Pulse', 'Grafficity', 'Seabird'],
    };
  }
  // fill up the projects data
  ComponentDidMount() {
    axios.get(`${ROOT_URL}/projects`).then((response) => {
      this.setState({ projects: response });
    });
  }
  render() {
    return (
      <SideNav
        trigger={<i className="material-icons">toc</i>}
        options={{ closeOnClick: false }}
      >
        <SideNavItem userView
          user={{
            background: 'images/dali-logo.jpg',
            name: 'DALI',
          }}
        />

        <SideNavItem divider />
        <SideNavItem subheader>Projects</SideNavItem>
        {this.state.projects.entrySeq().map(([id, name]) => {
          const link = `project/${id}`;
          return (
            <SideNavItem href={link}>{name}</SideNavItem>
          );
        })}

      </SideNav>

    );
  }
}
export default SideBar;
