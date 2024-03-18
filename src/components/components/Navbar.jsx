import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowplow, faUser } from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';

const root = import.meta.env.VITE_REACT_APP_ROOT;

function Navbar() {
  const reduxUser = useSelector((state) => state.loggedInReducer);
  const dispatch = useDispatch();
  console.log('==loggedInReducer==');
  console.log(reduxUser);

  // useEffect(() => {
  //   axios
  //     .get('/isLoggedIn')
  //     .then((res) => {
  //       console.log(res.data);
  //       dispatch({ type: 'SET_LOGGED_IN', payload: { ...res.data.user } });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className='navbar glass-1'>
      <NavLink to={`${root}/`} className='navbar__logo'>
        <FontAwesomeIcon className='navbar__logo--icon' icon={faSnowplow} size='3x' />
        <h1 className='navbar__logo--title'>uPlow</h1>
      </NavLink>
      <div className='nav'>
        <NavLink className='nav__link' to={`${root}/Contact`}>
          Contact
        </NavLink>
        <NavLink className='nav__link' to={`${root}/Faq`}>
          FAQ
        </NavLink>
        {reduxUser.loggedIn ? (
          <>
            <button className='nav__link' onClick={() => dispatch({ type: 'LOGOUT' })}>
              Logout
            </button>
            <NavLink className='nav__link' to={`${root}/dashboard`}>
              <FontAwesomeIcon icon={faUser} size='2x' />
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className='nav__link' to={`${root}/Signup`}>
              Signup
            </NavLink>
            <NavLink className='nav__link' to={`${root}/Login`}>
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
