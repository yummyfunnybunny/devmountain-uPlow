import '../../styles/pages/auth.css';
import '../../styles/components/form.css';

function Signup() {
  return (
    <div className='container auth'>
      <div className='form form--auth'>
        <h1 className='form__header'>Signup</h1>
        <div className='form__row'>
          <label className='form__label'>First Name:&emsp;</label>
          <input className='form__input'></input>
        </div>
        <div className='form__row'>
          <label className='form__label'>Last Name:&emsp;</label>
          <input className='form__input'></input>
        </div>
        <div className='form__row'>
          <label className='form__label'>Email:&emsp;</label>
          <input className='form__input'></input>
        </div>
        <div className='form__row'>
          <label className='form__label'>Password:&emsp;</label>
          <input className='form__input'></input>
        </div>
        <div className='form__row'>
          <label className='form__label'>Confirm Password:&emsp;</label>
          <input className='form__input'></input>
        </div>
        <div className='form__row'>
          <label className='form__label'>Choose Account Type:&emsp;</label>
          <select className='form__input'>
            <option value='' disabled>
              - Account Type -
            </option>
            <option value='property-owner'>Property Owner</option>
            <option value='service-provider'>Service Provider</option>
          </select>
        </div>
        <button className='btn btn--md'>Login</button>
      </div>
    </div>
  );
}

export default Signup;
