import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowplow, faUser } from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
      <NavLink to='/' className='navbar__logo'>
        <FontAwesomeIcon className='navbar__logo--icon' icon={faSnowplow} size='3x' />
        <h1 className='navbar__logo--title'>uPlow</h1>
      </NavLink>
      <div className='nav'>
        <NavLink className='nav__link' to='/Contact'>
          Contact
        </NavLink>
        <NavLink className='nav__link' to='/Help'>
          Help
        </NavLink>
        <NavLink className='nav__link' to='/Faq'>
          FAQ
        </NavLink>
        <NavLink className='nav__link' to='/Signup'>
          Signup
        </NavLink>
        <NavLink className='nav__link' to='/Login'>
          Login
        </NavLink>
        <NavLink className='nav__link' to='/dashboard'>
          <FontAwesomeIcon icon={faUser} size='2x' />
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
