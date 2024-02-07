// import '../../styles/pages/auth.css';
import '../../styles/components/form.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StateDropdown, trimFormData } from '../../../scripts/forms.jsx';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    password: '',
    confirmPassword: '',
  });
  console.log(signup);

  const handleChange = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value,
    });
  };

  const submitSignup = (e) => {
    e.preventDefault();

    // TODO - form validation
    // - remove white space
    // - undercase everything
    // - check that both passwords match

    const signupData = {
      firstName: signup.firstName,
      lastName: signup.lastName,
      email: signup.email,
      phone: signup.phone,
      role: signup.role,
      street: signup.street,
      city: signup.city,
      state: signup.state,
      zipcode: signup.zipcode,
      password: signup.password,
      confirmPassword: signup.confirmPassword,
    };

    trimFormData(signupData);

    console.log(signupData);

    axios
      .post('/signup', signupData)
      .then((res) => {
        console.log(res);
        console.log(window);
        dispatch({ type: 'SET_LOGGED_IN', payload: res.data.user });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
        navigate(res.data.redirectUri);
        // TODO - display success toast
      })
      .catch((err) => {
        console.log(err);
        // TODO - display failed toast
      });
  };

  return (
    <container className='page__container'>
      <container className='page__section'>
        <form className='form form--signup glass-1' onSubmit={(e) => submitSignup(e)}>
          <h1 className='form__header'>Signup</h1>

          <container className='form__row'>
            <container className='form__column glass-2'>
              <h2 className='form__subheader'>Personal Info</h2>
              {/* FIRST NAME */}
              <container className='form__row'>
                <label className='form__label' htmlFor='firstName'>
                  First Name:&emsp;
                </label>
                <input
                  className='form__input'
                  id='firstName'
                  name='firstName'
                  required
                  type='text'
                  autoFocus
                  defaultValue={signup.firstName}
                  onChange={(e) => handleChange(e)}
                ></input>
              </container>

              {/* LAST NAME */}
              <container className='form__row'>
                <label className='form__label' htmlFor='lastName'>
                  Last Name:&emsp;
                </label>
                <input
                  className='form__input'
                  id='lastName'
                  name='lastName'
                  required
                  type='text'
                  defaultValue={signup.lastName}
                  onChange={(e) => handleChange(e)}
                ></input>
              </container>

              {/* EMAIL */}
              <container className='form__row'>
                <label className='form__label' htmlFor='email'>
                  Email:&emsp;
                </label>
                <input
                  className='form__input'
                  id='email'
                  name='email'
                  required
                  type='email'
                  defaultValue={signup.email}
                  onChange={(e) => handleChange(e)}
                ></input>
              </container>

              {/* PHONE */}
              <container className='form__row'>
                <label className='form__label' htmlFor='phone'>
                  Phone:&emsp;
                </label>
                <input
                  className='form__input'
                  id='phone'
                  name='phone'
                  required
                  type='tel'
                  minLength='10'
                  maxLength='10'
                  defaultValue={signup.phone}
                  onChange={(e) => handleChange(e)}
                ></input>
              </container>

              {/* ROLE */}
              <container className='form__row'>
                <label className='form__label' htmlFor='account-type'>
                  Choose Your Role:&emsp;
                </label>
                <select
                  className='form__input'
                  id='role'
                  name='role'
                  required
                  defaultValue={signup.role}
                  onChange={(e) => handleChange(e)}
                >
                  <option value='' disabled>
                    - Role -
                  </option>
                  <option value='customer'>Customer</option>
                  <option value='worker'>Worker</option>
                </select>
              </container>
            </container>

            <container className='form__column glass-2'>
              <h2 className='form__subheader'>Address</h2>
              {/* Street */}
              <container className='form__row'>
                <label className='form__label' htmlFor='street'>
                  Street:&emsp;
                </label>
                <input
                  className='form__input'
                  id='street'
                  name='street'
                  required
                  defaultValue={signup.street}
                  onChange={(e) => handleChange(e)}
                ></input>
              </container>

              {/* City */}
              <container className='form__row'>
                <label className='form__label' htmlFor='city'>
                  City:&emsp;
                </label>
                <input
                  className='form__input'
                  id='city'
                  name='city'
                  required
                  defaultValue={signup.city}
                  onChange={(e) => handleChange(e)}
                ></input>
              </container>

              {/* State */}
              <container className='form__row'>
                <label className='form__label' htmlFor='state'>
                  State:&emsp;
                </label>
                <select
                  className='form__input'
                  id='state'
                  name='state'
                  required
                  defaultValue={signup.state}
                  onChange={(e) => handleChange(e)}
                >
                  <StateDropdown />
                </select>
              </container>

              {/* ZIPCODE */}
              <container className='form__row'>
                <label className='form__label' htmlFor='zipcode'>
                  Zipcode:&emsp;
                </label>
                <input
                  className='form__input'
                  id='zipcode'
                  name='zipcode'
                  required
                  defaultValue={signup.zipcode}
                  onChange={(e) => handleChange(e)}
                ></input>
              </container>
            </container>

            <container className='form__column glass-2'>
              <h2 className='form__subheader'>Password</h2>
              {/* PASSWORD */}
              <container className='form__row'>
                <label className='form__label' htmlFor='password'>
                  Password:&emsp;
                </label>
                <input
                  className='form__input'
                  id='password'
                  name='password'
                  type='password'
                  required
                  defaultValue={signup.password}
                  onChange={(e) => handleChange(e)}
                ></input>
              </container>

              {/* CONFIRM PASSWORD */}
              <container className='form__row'>
                <label className='form__label' htmlFor='confirm-password'>
                  Confirm Password:&emsp;
                </label>
                <input
                  className='form__input'
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  required
                  defaultValue={signup.confirmPassword}
                  onChange={(e) => handleChange(e)}
                ></input>
              </container>
            </container>
          </container>

          <button className='btn btn--lg btn__success' type='submit'>
            Signup
          </button>
        </form>
      </container>
    </container>
  );
}

export default Signup;
