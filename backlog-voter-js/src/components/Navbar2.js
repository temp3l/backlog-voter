import React from "react";
import { NavLink } from "react-router-dom";
import { reset } from "../services/auth2";


function MenuItems(props){
  return props.items.map( (item,idx) =>
    <li className="nav-item" key={idx}>
      <NavLink className="nav-link" to={item.href}>{item.label}</NavLink>
    </li>
  )
}

const HeaderNav = props => {
  const {isAdmin, session} = props;
  const routes = {
    authenticated: [
      { href: "/account", label: "Account" },
      { href: "/reports", label: "Reports" },
      { href: "/backlogs", label: "Backlogs" },
    ],
    admin: [
      { href: "/users", label: "Users" },
    ],
    anonymous: [
      { href: "/login", label: "Login" },
    ]
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

        {!session && <NavLink className="navbar-brand" to="/login">Login</NavLink> }
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            {session && session.email && <MenuItems items={routes.authenticated}/>}
            {isAdmin && <MenuItems items={routes.admin}/>}
          </ul>
        </div>
        
        <button className="btn btn-outline-danger" onClick={reset}>
          <i className="fas fa-bolt" />
        </button>
      </nav>
    </div>
  );
};
//<li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
//<li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
export default HeaderNav;
