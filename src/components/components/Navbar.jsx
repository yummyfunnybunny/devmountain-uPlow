import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowplow, faUser } from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Navbar() {
  const loggedIn = useSelector((state) => state.loggedInReducer);
  const dispatch = useDispatch();
  console.log('==loggedInReducer==');
  console.log(loggedIn);

  useEffect(() => {
    axios
      .get('/isLoggedIn')
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'SET_LOGGED_IN', payload: { ...res.data.user } });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='navbar glass-1'>
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
        {loggedIn.loggedIn ? (
          <>
            <button className='nav__link' onClick={() => dispatch({ type: 'LOGOUT' })}>
              Logout
            </button>
            <NavLink className='nav__link' to='/dashboard'>
              <FontAwesomeIcon icon={faUser} size='2x' />
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className='nav__link glass-2' to='/Signup'>
              Signup
            </NavLink>
            <NavLink className='nav__link glass-2' to='/Login'>
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
