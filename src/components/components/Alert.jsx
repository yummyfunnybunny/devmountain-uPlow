import '../../styles/components/alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshakeSimple } from '@fortawesome/free-solid-svg-icons';

function Alert() {
  return (
    <div className='alert'>
      <div className='alert__icon'>
        <FontAwesomeIcon icon={faHandshakeSimple} size='4x' />
      </div>
      <div className='alert__meta'>
        <h1 className='alert__type'>New Offer</h1>
        <p className='alert__message'>You have a new job offer from [customer]</p>
      </div>
      <div className='alert__customer'>
        <h2 className='alert__header'>Customer</h2>
        <p className='alert__name'>Customer Name: [name]</p>
        <p className='alert__email'>Email: [email]</p>
        <p className='alert__phone'>Phone: [phone]</p>
      </div>
      <div className='alert__property'>
        <h2 className='alert__header'>Property</h2>
        <p className='alert_property-name'>Property Name: [name]</p>
        <p className='alert_property-address'>Property Address: [address]</p>
      </div>
      <div className='alert__job'>
        <h2 className='alert__header'>Job</h2>
        <p className='alert_job-type'>Job Type: [type]</p>
        <p className='alert_job-size'>Job size: [size]</p>
        <p className='alert_job-rate'>Rate: [rate]</p>
      </div>
      <div className='alert__instructions'>
        <h2 className='alert__header'>Instructions</h2>
        <p className='alert_job-instructions'> - [instructions 1]</p>
        <p className='alert_job-instructions'> - [instructions 2]</p>
        <p className='alert_job-instructions'> - [instructions 3]</p>
      </div>
      <div className='alert__buttons'>
        <h2 className='alert__header'>Actions</h2>
        <button className='btn'>Accept Offer</button>
        <button className='btn'>Counter Offer</button>
        <button className='btn'>Reject Offer</button>
      </div>
    </div>
  );
}

export default Alert;
