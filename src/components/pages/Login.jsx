import '../../styles/pages/auth.css';
import '../../styles/components/form.css';

function Login() {
  return (
    <div className='container auth'>
      <div className='form form--auth'>
        <h1 className='form__header'>Login</h1>
        <div className='form__row'>
          <label className='form__label'>Email:&emsp;</label>
          <input className='form__input'></input>
        </div>
        <div className='form__row'>
          <label className='form__label'>Password:&emsp;</label>
          <input className='form__input'></input>
        </div>
        <button className='btn btn--md'>Login</button>
      </div>
    </div>
  );
}

export default Login;
