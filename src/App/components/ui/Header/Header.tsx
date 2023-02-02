import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <NavLink to="/">Homepage</NavLink>
          <NavLink to="test">TestPage</NavLink>
        </ul>
      </nav>
      {/* <div className="header_btns">
      </div> */}
      <NavLink to="login">Login</NavLink>
      <NavLink to="register">Register</NavLink>
    </header>
  );
}

export default Header;
