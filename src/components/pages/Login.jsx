// import '../../styles/pages/auth.css';
import '../../styles/components/form.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };
    console.log(loginData);

    axios
      .post('/login', loginData)
      .then((res) => {
        console.log(res.data);
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
    <container className='page__container'>
      <container className='page__section'>
        <form className='form form--login glass-1' onSubmit={(e) => submitLogin(e)}>
          <h1 className='form__header'>Login</h1>

          <container className='form__column glass-2'>
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
                autoFocus
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </container>

            {/* PASSWORD */}
            <container className='form__row'>
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
            </container>
          </container>

          {/* BUTTON */}
          <container className='form__row form__row--btn'>
            <button className='btn btn--lg btn__success' type='submit'>
              Login
            </button>
          </container>
        </form>
      </container>
    </container>
  );
}

export default Login;
