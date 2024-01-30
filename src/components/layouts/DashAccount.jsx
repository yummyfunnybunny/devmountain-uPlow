import '../../styles/layouts/dashAccount.css';
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
    <div className='dashAccount'>
      <div className='dashAccount__container'>
        <h1 className='dashAccount__header'>Personal Info</h1>

        {/* FIRST NAME */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>First Name:&emsp; </h2>
          <p className='dashAccount__detail'>{user.firstName}</p>
        </div>

        {/* LAST NAME */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>Last Name:&emsp; </h2>
          <p className='dashAccount__detail'>{user.lastName}</p>
        </div>

        {/* EMAIL */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>Email:&emsp; </h2>
          <p className='dashAccount__detail'>{user.email}</p>
        </div>

        {/* PHONE */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>Phone:&emsp; </h2>
          <p className='dashAccount__detail'>{user.phone}</p>
        </div>

        {/* STREET */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>Street:&emsp; </h2>
          <p className='dashAccount__detail'>{user.street}</p>
        </div>

        {/* CITY */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>City:&emsp; </h2>
          <p className='dashAccount__detail'>{user.city}</p>
        </div>

        {/* STATE */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>State:&emsp; </h2>
          <p className='dashAccount__detail'>{user.state}</p>
        </div>

        {/* ZIPCODE */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>Zipcode:&emsp; </h2>
          <p className='dashAccount__detail'>{user.zipcode}</p>
        </div>

        {/* ROLE */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>Role:&emsp; </h2>
          <p className='dashAccount__detail'>{user.role}</p>
        </div>

        {/* BUTTONS */}
        <div className='dashAccount__row dashAccount__btns'>
          <button className='btn' onClick={() => dispatch({ type: 'EDIT_ACCOUNT' })}>
            Edit Account Info
          </button>

          <button className='btn' onClick={() => dispatch({ type: 'CHANGE_PASSWORD' })}>
            Change Password
          </button>

          <button className='btn' onClick={() => dispatch({ type: 'LOGOUT' })}>
            Logout
          </button>
          <button className='btn' onClick={() => dispatch({ type: 'DELETE_ACCOUNT' })}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashAccount;
