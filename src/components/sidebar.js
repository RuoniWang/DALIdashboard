import React from 'react';
import { SideNav, SideNavItem } from 'react-materialize';

const SideBar = (props) => {
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
      {props.projects.entrySeq().map(([name, id]) => {
        const link = `project/${id}`;
        console.log('loading!');
        return (
          <SideNavItem href={link}>{name}</SideNavItem>
        );
      })}

    </SideNav>

  );
};

export default SideBar;
