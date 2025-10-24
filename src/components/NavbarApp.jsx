import React from 'react';
import { Link } from 'react-router-dom';

const NavbarApp = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/logo.svg" alt="Logo EZ Market" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorías
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/smartphones">Celulares</Link></li>
                <li><Link className="dropdown-item" to="/PlacasDeVideo">Placas de video</Link></li>
                <li><Link className="dropdown-item" to="/Procesadores">Procesadores</Link></li>
                <li><Link className="dropdown-item" to="/Mothers">Mothers</Link></li>
                <li><Link className="dropdown-item" to="/Notebooks">Notebooks</Link></li>
                <li><Link className="dropdown-item" to="/MemoriasRam">Memorias ram</Link></li>
                <li><Link className="dropdown-item" to="/FuentesDeAlimentacion">Fuentes de alimentacion</Link></li>
                <li><Link className="dropdown-item" to="/Perifericos">Perifericos</Link></li>
                <li><Link className="dropdown-item" to="/Gabinetes">Gabinetes</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarApp;
