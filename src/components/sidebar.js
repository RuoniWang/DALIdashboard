import React from 'react';
import { Link } from 'react-router-dom';


const Menu = (props) => {
  return (
    <div className="menu-container">
      <div className="scrollmenu">
        {props.projects.entrySeq().map(([name, id]) => {
          const link = `/project/${id}`;
          return (
            <Link to={link} className="project-link" >{name}</Link>

          );
        })}

      </div>
    </div>

  );
};

export default Menu;
