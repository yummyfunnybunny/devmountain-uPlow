import '../../styles/layouts/account.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

function DashAccount() {
  const user = useSelector((state) => state.loggedInReducer);
  const dispatch = useDispatch();
  // const [user, setUser] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   role: '',
  // });
  console.log('Redux User:');
  console.log(user);

  // useEffect(() => {
  //   axios
  //     .get('/me')
  //     .then((res) => {
  //       setUser(res.data.user);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className='account'>
      <div className='account__container'>
        <h1 className='section__header'>Account Info</h1>

        <container className='account__row'>
          <container className='account__column glass-2'>
            <h2 className='account__subheader'>Personal Info</h2>
            {/* FIRST NAME */}
            <div className='account__row'>
              <h3 className='account__label'>First Name:&emsp; </h3>
              <p className='account__detail'>{user.firstName}</p>
            </div>

            {/* LAST NAME */}
            <div className='account__row'>
              <h3 className='account__label'>Last Name:&emsp; </h3>
              <p className='account__detail'>{user.lastName}</p>
            </div>

            {/* EMAIL */}
            <div className='account__row'>
              <h3 className='account__label'>Email:&emsp; </h3>
              <p className='account__detail'>{user.email}</p>
            </div>

            {/* PHONE */}
            <div className='account__row'>
              <h3 className='account__label'>Phone:&emsp; </h3>
              <p className='account__detail'>{user.phone}</p>
            </div>

            {/* ROLE */}
            <div className='account__row'>
              <h3 className='account__label'>Role:&emsp; </h3>
              <p className='account__detail'>{user.role}</p>
            </div>
          </container>

          <container className='account__column glass-2'>
            <h2 className='account__subheader'>Address Info</h2>
            {/* STREET */}
            <div className='account__row'>
              <h3 className='account__label'>Street:&emsp; </h3>
              <p className='account__detail'>{user.street}</p>
            </div>

            {/* CITY */}
            <div className='account__row'>
              <h3 className='account__label'>City:&emsp; </h3>
              <p className='account__detail'>{user.city}</p>
            </div>

            {/* STATE */}
            <div className='account__row'>
              <h3 className='account__label'>State:&emsp; </h3>
              <p className='account__detail'>{user.state}</p>
            </div>

            {/* ZIPCODE */}
            <div className='account__row'>
              <h3 className='account__label'>Zipcode:&emsp; </h3>
              <p className='account__detail'>{user.zipcode}</p>
            </div>
          </container>
        </container>

        {/* BUTTONS */}
        <div className='account__row account__btns'>
          <button className='btn btn__success btn--md' onClick={() => dispatch({ type: 'EDIT_ACCOUNT' })}>
            Edit Info
          </button>

          <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'CHANGE_PASSWORD' })}>
            Change Password
          </button>

          <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'LOGOUT' })}>
            Logout
          </button>
          <button className='btn btn__warning btn--md' onClick={() => dispatch({ type: 'DELETE_ACCOUNT' })}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashAccount;
