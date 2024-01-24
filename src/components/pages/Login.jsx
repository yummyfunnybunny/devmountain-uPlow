import '../../styles/pages/auth.css';
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
        dispatch({ type: true, payload: res.data.user });
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
      <form className='form form--auth' onSubmit={(e) => submitLogin(e)}>
        <h1 className='form__header'>Login</h1>

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
        <button className='btn btn--md' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
