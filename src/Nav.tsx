function Nav() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/#">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className="nav-link active" href="/#">
                Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#/login">
                Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#/logout">
                Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;