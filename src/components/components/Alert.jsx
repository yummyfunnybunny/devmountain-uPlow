import '../../styles/components/alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshakeSimple } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

function Alert(props) {
  const dispatch = useDispatch();
  const { alertType, Job, Property, User } = props.alert;
  console.log(props.alert);

  // let alertToDisplay;
  switch (alertType) {
    case 'REQUEST_WORKER':
      return (
        <div className='alert'>
          <div className='alert__icon'>
            <FontAwesomeIcon icon={faHandshakeSimple} size='4x' />
          </div>
          <div className='alert__meta'>
            <h1 className='alert__type'>New Job Offer</h1>
            <p className='alert__message'>You have a new job offer!</p>
          </div>
          <div className='alert__customer'>
            <h2 className='alert__header'>Customer</h2>
            <p className='alert__name'>
              Name: {User.firstName} {User.lastName}
            </p>
            <p className='alert__email'>Email: {User.email}</p>
            <p className='alert__phone'>Phone: {User.phone}</p>
            <p className='alert__rating'>Rating: * * * * *</p>
          </div>
          <div className='alert__property'>
            <h2 className='alert__header'>Property</h2>
            <p className='alert_property-name'>{Property.name}</p>
            <p className='alert_property-address'>{Property.street}</p>
            <p className='alert_property-address'>
              {Property.city}, {Property.state} {Property.zipcode}
            </p>
          </div>
          <div className='alert__job'>
            <h2 className='alert__header'>Job Details</h2>
            <p className='alert_job-type'>Job Type: {Job.jobType}</p>
            <p className='alert_job-size'>Job size: {Job.jobSize}</p>
            {/* <p className='alert_job-rate'>Rate: [rate]</p> */}
          </div>
          <div className='alert__instructions'>
            <h2 className='alert__header'>Instructions</h2>
            <p className='alert_job-instructions'>{Job.instructions[0] ? `- ${Job.instructions[0]}` : null}</p>
            <p className='alert_job-instructions'>{Job.instructions[1] ? `- ${Job.instructions[1]}` : null}</p>
            <p className='alert_job-instructions'>{Job.instructions[2] ? `- ${Job.instructions[2]}` : null}</p>
          </div>
          <div className='alert__buttons'>
            <h2 className='alert__header'>Actions</h2>
            <button
              className='btn'
              onClick={() => (
                console.log(props.alert),
                // dispatch({ type: 'SET_WORKER', payload: worker }),
                dispatch({ type: 'SET_ALERT', payload: props.alert }),
                dispatch({ type: 'ACCEPT_REQUEST_WORKER' })
              )}
              // onClick={() => (
              //   dispatch({ type: 'ACCEPT_REQUEST_WORKER' }), dispatch({ type: 'SET_ALERT', payload: props.alert })
              // )}
            >
              Accept Offer
            </button>
            <button className='btn' onClick={() => dispatch({ type: 'COUNTER_REQUEST_WORKER' })}>
              Counter Offer
            </button>
            <button className='btn' onClick={() => dispatch({ type: 'REJECT_REQUEST_WORKER' })}>
              Reject Offer
            </button>
          </div>
        </div>
      );
  }

  // return (<div></div>)

  // return (
  //   <div className='alert'>
  //     <div className='alert__icon'>
  //       <FontAwesomeIcon icon={faHandshakeSimple} size='4x' />
  //     </div>
  //     <div className='alert__meta'>
  //       <h1 className='alert__type'>New Offer</h1>
  //       <p className='alert__message'>You have a new job offer from [customer]</p>
  //     </div>
  //     <div className='alert__customer'>
  //       <h2 className='alert__header'>Customer</h2>
  //       <p className='alert__name'>Customer Name: [name]</p>
  //       <p className='alert__email'>Email: [email]</p>
  //       <p className='alert__phone'>Phone: [phone]</p>
  //     </div>
  //     <div className='alert__property'>
  //       <h2 className='alert__header'>Property</h2>
  //       <p className='alert_property-name'>Property Name: [name]</p>
  //       <p className='alert_property-address'>Property Address: [address]</p>
  //     </div>
  //     <div className='alert__job'>
  //       <h2 className='alert__header'>Job</h2>
  //       <p className='alert_job-type'>Job Type: [type]</p>
  //       <p className='alert_job-size'>Job size: [size]</p>
  //       <p className='alert_job-rate'>Rate: [rate]</p>
  //     </div>
  //     <div className='alert__instructions'>
  //       <h2 className='alert__header'>Instructions</h2>
  //       <p className='alert_job-instructions'> - [instructions 1]</p>
  //       <p className='alert_job-instructions'> - [instructions 2]</p>
  //       <p className='alert_job-instructions'> - [instructions 3]</p>
  //     </div>
  //     <div className='alert__buttons'>
  //       <h2 className='alert__header'>Actions</h2>
  //       <button className='btn'>Accept Offer</button>
  //       <button className='btn'>Counter Offer</button>
  //       <button className='btn'>Reject Offer</button>
  //     </div>
  //   </div>
  // );
}

export default Alert;
