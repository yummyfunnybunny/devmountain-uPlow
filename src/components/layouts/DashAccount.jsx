import '../../styles/layouts/dashAccount.css';

function DashAccount() {
  return (
    <div className='dashAccount'>
      <div className='dashAccount__container'>
        <h1 className='dashAccount__header'>Personal Info</h1>

        {/* FIRST NAME */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>First Name:&emsp; </h2>
          <p className='dashAccount__detail'>[First Name] </p>
        </div>

        {/* LAST NAME */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>Last Name:&emsp; </h2>
          <p className='dashAccount__detail'>[Last Name] </p>
        </div>

        {/* EMAIL */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>Email:&emsp; </h2>
          <p className='dashAccount__detail'>[email] </p>
        </div>

        {/* PHONE */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>Phone:&emsp; </h2>
          <p className='dashAccount__detail'>[Phone] </p>
        </div>

        {/* Role */}
        <div className='dashAccount__row'>
          <h2 className='dashAccount__label'>Account Type:&emsp; </h2>
          <p className='dashAccount__detail'>[account type] </p>
        </div>

        <div className='dashAccount__row dashAccount__btns'>
          <button className='btn'>Edit Account Info</button>
          <button className='btn'>Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default DashAccount;
