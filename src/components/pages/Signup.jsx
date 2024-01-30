import '../../styles/pages/auth.css';
import '../../styles/components/form.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const submitSignup = (e) => {
    e.preventDefault();

    // TODO - form validation
    // - remove white space
    // - undercase everything
    // - check that both passwords match

    const signupData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword,
      role: role,
    };
    console.log(signupData);

    axios
      .post('/signup', signupData)
      .then((res) => {
        console.log(res);
        console.log(window);
        dispatch({ type: 'SET_LOGGED_IN', payload: res.data.user });
        navigate(res.data.redirectUri);
        // TODO - display success toast
      })
      .catch((err) => {
        console.log(err);
        // TODO - display failed toast
      });
  };

  return (
    <div className='container auth'>
      <form className='form form--auth' onSubmit={(e) => submitSignup(e)}>
        <h1 className='form__header'>Signup</h1>

        {/* FIRST NAME */}
        <div className='form__row'>
          <label className='form__label' htmlFor='firstName'>
            First Name:&emsp;
          </label>
          <input
            className='form__input'
            id='firstName'
            name='firstName'
            required
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>

        {/* LAST NAME */}
        <div className='form__row'>
          <label className='form__label' htmlFor='lastName'>
            Last Name:&emsp;
          </label>
          <input
            className='form__input'
            id='lastName'
            name='lastName'
            required
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>

        {/* EMAIL */}
        <div className='form__row'>
          <label className='form__label' htmlFor='email'>
            Email:&emsp;
          </label>
          <input
            className='form__input'
            id='email'
            name='email'
            required
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        {/* PHONE */}
        <div className='form__row'>
          <label className='form__label' htmlFor='phone'>
            Phone:&emsp;
          </label>
          <input
            className='form__input'
            id='phone'
            name='phone'
            required
            defaultValue={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>

        {/* Street */}
        <div className='form__row'>
          <label className='form__label' htmlFor='street'>
            Street:&emsp;
          </label>
          <input
            className='form__input'
            id='street'
            name='street'
            required
            defaultValue={street}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>

        {/* City */}
        <div className='form__row'>
          <label className='form__label' htmlFor='city'>
            City:&emsp;
          </label>
          <input
            className='form__input'
            id='city'
            name='city'
            required
            defaultValue={city}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>

        {/* State */}
        <div className='form__row'>
          <label className='form__label' htmlFor='state'>
            State:&emsp;
          </label>
          <input
            className='form__input'
            id='state'
            name='state'
            required
            defaultValue={state}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>

        {/* ZIPCODE */}
        <div className='form__row'>
          <label className='form__label' htmlFor='zipcode'>
            Zipcode:&emsp;
          </label>
          <input
            className='form__input'
            id='zipcode'
            name='zipcode'
            required
            defaultValue={zipcode}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>

        {/* PASSWORD */}
        <div className='form__row'>
          <label className='form__label' htmlFor='password'>
            Password:&emsp;
          </label>
          <input
            className='form__input'
            id='password'
            name='password'
            required
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className='form__row'>
          <label className='form__label' htmlFor='confirm-password'>
            Confirm Password:&emsp;
          </label>
          <input
            className='form__input'
            id='confirmPassword'
            name='confirmPassword'
            required
            defaultValue={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>

        {/* ROLE */}
        <div className='form__row'>
          <label className='form__label' htmlFor='account-type'>
            Choose Your Role:&emsp;
          </label>
          <select
            className='form__input'
            id='accountType'
            name='accountType'
            required
            defaultValue={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value='' disabled>
              - Role -
            </option>
            <option value='customer'>Customer</option>
            <option value='worker'>Worker</option>
          </select>
        </div>
        <button className='btn btn--md' type='submit'>
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
