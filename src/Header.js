import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faBook} from '@fortawesome/fontawesome-free-solid';

class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="container-fluid">
          <div className="d-flex flex-row row">
            <div className="logo col-auto align-self-center">
              <Link
                to='/'
                className='home'
              ><h2><FontAwesomeIcon icon={faBook}/> My Reads</h2></Link>
            </div>

            <div className="nav col align-self-center d-flex flex-row justify-content-end">
              <Link
                to='/search'
                className='search'
              >Search</Link>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
