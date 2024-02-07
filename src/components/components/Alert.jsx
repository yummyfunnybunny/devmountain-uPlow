import '../../styles/components/alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshakeSimple,
  faSkullCrossbones,
  faHouse,
  faHouseCircleXmark,
  faHouseCircleCheck,
  faSnowflake,
  faSnowplow,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

function Alert(props) {
  const dispatch = useDispatch();
  const { alertType, message, Job, Property, User } = props.alert;
  console.log(props.alert);

  // let alertToDisplay;
  switch (alertType) {
    case 'REQUEST_WORKER':
      // customer => requests => worker
      return (
        <div className='alert glass-2'>
          {/* ICON */}
          <div className='alert__icon'>
            <FontAwesomeIcon icon={faHouse} size='4x' />
          </div>

          <container className='alert__content'>
            {/* META */}
            <div className='alert__column'>
              <h2 className='alert__type'>New Job Offer</h2>
              <p className='alert__message'>You have a new job offer!</p>
            </div>

            <div className='alert__divider'></div>

            {/* CUSTOMER */}
            <div className='alert__column'>
              <h2 className='alert__header'>Customer</h2>
              <p className='alert__name'>
                Name: {User.firstName} {User.lastName}
              </p>
              <p className='alert__email'>Email: {User.email}</p>
              <p className='alert__phone'>Phone: {User.phone}</p>
              <p className='alert__rating'>Rating: * * * * *</p>
            </div>

            <div className='alert__divider'></div>

            {/* PROPERTY */}
            <div className='alert__column'>
              <h2 className='alert__header'>Property</h2>
              <p className='alert_property-name'>{Property.name}</p>
              <p className='alert_property-address'>{Property.street}</p>
              <p className='alert_property-address'>
                {Property.city}, {Property.state} {Property.zipcode}
              </p>
            </div>

            <div className='alert__divider'></div>

            {/* JOB */}
            <div className='alert__column'>
              <h2 className='alert__header'>Job Details</h2>
              <p className='alert_job-type'>Job Type: {Job.jobType}</p>
              <p className='alert_job-size'>Job size: {Job.jobSize}</p>
              {/* <p className='alert_job-rate'>Rate: [rate]</p> */}
            </div>

            <div className='alert__divider'></div>

            {/* INSTRUCTIONS */}
            <div className='alert__column'>
              <h2 className='alert__header'>Instructions</h2>
              <p className='alert_job-instructions'>{Job.instructions[0] ? `- ${Job.instructions[0]}` : null}</p>
              <p className='alert_job-instructions'>{Job.instructions[1] ? `- ${Job.instructions[1]}` : null}</p>
              <p className='alert_job-instructions'>{Job.instructions[2] ? `- ${Job.instructions[2]}` : null}</p>
            </div>

            <div className='alert__divider'></div>

            {/* BUTTONS */}
            <div className='alert__column'>
              <h2 className='alert__header'>Actions</h2>
              <button
                className='btn btn__success btn--md'
                onClick={() => (
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'ACCEPT_REQUEST_WORKER' })
                )}
              >
                Accept Offer
              </button>
              <button
                className='btn btn__caution btn--md'
                onClick={() => {
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'COUNTER_REQUEST_WORKER' });
                }}
              >
                Counter Offer
              </button>
              <button
                className='btn btn__warning btn--md'
                onClick={() => {
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'CUSTOMER_OFFER_REJECTED' });
                }}
              >
                Reject Offer
              </button>
            </div>
          </container>
        </div>
      );
    case 'REQUEST_JOB':
      // Worker => requests => customer
      return (
        <div className='alert glass-2'>
          {/* ICON */}
          <div className='alert__icon'>
            <FontAwesomeIcon icon={faSnowplow} size='4x' />
          </div>

          <container className='alert__content'>
            {/* META */}
            <div className='alert__column'>
              <h2 className='alert__type'>New Service Offer</h2>
              <p className='alert__message'>A worker has offered to service one of your jobs!</p>
            </div>

            <div className='alert__divider'></div>

            {/* WORKER */}
            <div className='alert__column'>
              <h2 className='alert__header'>Worker</h2>
              <p className='alert__name'>
                Name: {User.firstName} {User.lastName}
              </p>
              <p className='alert__email'>Email: {User.email}</p>
              <p className='alert__phone'>Phone: {User.phone}</p>
              <p className='alert__rating'>Rating: * * * * *</p>
            </div>

            <div className='alert__divider'></div>

            {/* PROPERTY */}
            <div className='alert__column'>
              <h2 className='alert__header'>Property</h2>
              <p className='alert_property-name'>{Property.name}</p>
              <p className='alert_property-address'>{Property.street}</p>
              <p className='alert_property-address'>
                {Property.city}, {Property.state} {Property.zipcode}
              </p>
            </div>

            <div className='alert__divider'></div>

            {/* JOB */}
            <div className='alert__column'>
              <h2 className='alert__header'>Job Details</h2>
              <p className='alert_job-type'>Job Type: {Job.jobType}</p>
              <p className='alert_job-size'>Job size: {Job.jobSize}</p>
              {/* <p className='alert_job-rate'>Rate: [rate]</p> */}
            </div>

            <div className='alert__divider'></div>

            {/* BUTTONS */}
            <div className='alert__column'>
              <h2 className='alert__header'>Actions</h2>
              <button
                className='btn btn__success btn--md'
                onClick={() => (
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'ACCEPT_REQUEST_JOB' })
                )}
              >
                Accept Offer
              </button>
              <button
                className='btn btn__caution btn--md'
                onClick={() => {
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'COUNTER_REQUEST_JOB' });
                }}
              >
                Counter Offer
              </button>
              <button
                className='btn btn__warning btn--md'
                onClick={() => {
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'REJECT_REQUEST_JOB' });
                }}
              >
                Reject Offer
              </button>
            </div>
          </container>
        </div>
      );
    case 'CUSTOMER_OFFER_REJECTED':
      // worker => rejected => customer Offer
      return (
        <div className='alert glass-2'>
          {/* ICONS */}
          <div className='alert__icon'>
            <FontAwesomeIcon icon={faHouseCircleXmark} size='4x' />
          </div>

          <container className='alert__content'>
            {/* META */}
            <div className='alert__column'>
              <h2 className='alert__type'>Job Offer Rejected</h2>
              <p className='alert__message'>A worker has rejected your offer to service your job.</p>
            </div>

            <div className='alert__divider'></div>

            {/* WORKER */}
            <div className='alert__column'>
              <h2 className='alert__header'>Worker</h2>
              <p className='alert__name'>
                Name: {User.firstName} {User.lastName}
              </p>
              <p className='alert__email'>Email: {User.email}</p>
              <p className='alert__phone'>Phone: {User.phone}</p>
              <p className='alert__rating'>Rating: * * * * *</p>
            </div>

            <div className='alert__divider'></div>

            {/* PROPERTY */}
            <div className='alert__column'>
              <h2 className='alert__header'>Property</h2>
              <p className='alert_property-name'>{Property.name}</p>
              <p className='alert_property-address'>{Property.street}</p>
              <p className='alert_property-address'>
                {Property.city}, {Property.state} {Property.zipcode}
              </p>
            </div>

            <div className='alert__divider'></div>

            {/* JOB */}
            <div className='alert__column'>
              <h2 className='alert__header'>Job Details</h2>
              <p className='alert_job-type'>Job Type: {Job.jobType}</p>
              <p className='alert_job-size'>Job size: {Job.jobSize}</p>
              {/* <p className='alert_job-rate'>Rate: [rate]</p> */}
            </div>

            <div className='alert__divider'></div>

            {/* BUTTONS */}
            <div className='alert__column'>
              <h2 className='alert__header'>Actions</h2>
              <button
                className='btn btn__warning btn--md'
                onClick={() => (
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'DISMISS_ALERT' })
                )}
              >
                Dismiss
              </button>
            </div>
          </container>
        </div>
      );
    case 'WORKER_OFFER_REJECTED':
      // Customer => Rejected => Worker Offer
      return (
        <div className='alert glass-2'>
          {/* ICON */}
          <div className='alert__icon'>
            <FontAwesomeIcon icon={faHouseCircleXmark} size='4x' />
          </div>

          <container className='alert__content'>
            {/* META */}
            <div className='alert__column'>
              <h2 className='alert__type'>Service Offer Rejected</h2>
              <p className='alert__message'>A customer has rejected your offer to service their job.</p>
            </div>

            <div className='alert__divider'></div>

            {/* CUSTOMER */}
            <div className='alert__column'>
              <h2 className='alert__header'>Customer</h2>
              <p className='alert__name'>
                Name: {User.firstName} {User.lastName}
              </p>
              <p className='alert__email'>Email: {User.email}</p>
              <p className='alert__phone'>Phone: {User.phone}</p>
              <p className='alert__rating'>Rating: * * * * *</p>
            </div>

            <div className='alert__divider'></div>

            {/* PROPERTY */}
            <div className='alert__column'>
              <h2 className='alert__header'>Property</h2>
              <p className='alert_property-name'>{Property.name}</p>
              <p className='alert_property-address'>{Property.street}</p>
              <p className='alert_property-address'>
                {Property.city}, {Property.state} {Property.zipcode}
              </p>
            </div>

            <div className='alert__divider'></div>

            {/* JOB */}
            <div className='alert__column'>
              <h2 className='alert__header'>Job Details</h2>
              <p className='alert_job-type'>Job Type: {Job.jobType}</p>
              <p className='alert_job-size'>Job size: {Job.jobSize}</p>
              {/* <p className='alert_job-rate'>Rate: [rate]</p> */}
            </div>

            <div className='alert__divider'></div>

            {/* BUTTONS */}
            <div className='alert__column'>
              <h2 className='alert__header'>Actions</h2>
              <button
                className='btn btn__warning btn--md'
                onClick={() => (
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'DISMISS_ALERT' })
                )}
              >
                Dismiss
              </button>
            </div>
          </container>
        </div>
      );
    case 'UNSUBSCRIBE_WORKER':
      // Customer => unsubscribed => Worker
      return (
        <div className='alert glass-2'>
          {/* ICON */}
          <div className='alert__icon'>
            <FontAwesomeIcon icon={faHouseCircleXmark} size='4x' />
          </div>

          <container className='alert__content'>
            {/* META */}
            <div className='alert__column'>
              <h2 className='alert__type'>Job Cancelled</h2>
              <p className='alert__message'>A customer has cancelled your subscription to their job.</p>
            </div>

            <div className='alert__divider'></div>

            {/* CUSTOMER */}
            <div className='alert__column'>
              <h2 className='alert__header'>Customer</h2>
              <p className='alert__name'>
                Name: {User.firstName} {User.lastName}
              </p>
              <p className='alert__email'>Email: {User.email}</p>
              <p className='alert__phone'>Phone: {User.phone}</p>
              <p className='alert__rating'>Rating: * * * * *</p>
            </div>

            <div className='alert__divider'></div>

            {/* PROPERTY */}
            <div className='alert__column'>
              <h2 className='alert__header'>Property</h2>
              <p className='alert_property-name'>{Property.name}</p>
              <p className='alert_property-address'>{Property.street}</p>
              <p className='alert_property-address'>
                {Property.city}, {Property.state} {Property.zipcode}
              </p>
            </div>

            <div className='alert__divider'></div>

            {/* JOB */}
            <div className='alert__column'>
              <h2 className='alert__header'>Job Details</h2>
              <p className='alert_job-type'>Job Type: {Job.jobType}</p>
              <p className='alert_job-size'>Job size: {Job.jobSize}</p>
              {/* <p className='alert_job-rate'>Rate: [rate]</p> */}
            </div>

            <div className='alert__divider'></div>

            {/* BUTTONS */}
            <div className='alert__column'>
              <h2 className='alert__header'>Actions</h2>
              <button
                className='btn btn__warning btn--md'
                onClick={() => (
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'DISMISS_ALERT' })
                )}
              >
                Dismiss
              </button>
            </div>
          </container>
        </div>
      );
    case 'ACCEPT_CUSTOMER_OFFER':
      // Worker => Accepts => Customer Offer
      return (
        <div className='alert glass-2'>
          {/* ICON */}
          <div className='alert__icon'>
            <FontAwesomeIcon icon={faHouseCircleCheck} size='4x' />
          </div>

          <container className='alert__content'>
            {/* META */}
            <div className='alert__column'>
              <h2 className='alert__type'>Job Accepted</h2>
              <p className='alert__message'>A worker has accepted your job offer!</p>
            </div>

            <div className='alert__divider'></div>

            {/* WORKER */}
            <div className='alert__column'>
              <h2 className='alert__header'>Worker</h2>
              <p className='alert__name'>
                Name: {User.firstName} {User.lastName}
              </p>
              <p className='alert__email'>Email: {User.email}</p>
              <p className='alert__phone'>Phone: {User.phone}</p>
              <p className='alert__rating'>Rating: * * * * *</p>
            </div>

            <div className='alert__divider'></div>

            {/* PROPERTY */}
            <div className='alert__column'>
              <h2 className='alert__header'>Property</h2>
              <p className='alert_property-name'>{Property.name}</p>
              <p className='alert_property-address'>{Property.street}</p>
              <p className='alert_property-address'>
                {Property.city}, {Property.state} {Property.zipcode}
              </p>
            </div>

            <div className='alert__divider'></div>

            {/* JOB */}
            <div className='alert__column'>
              <h2 className='alert__header'>Job Details</h2>
              <p className='alert_job-type'>Job Type: {Job.jobType}</p>
              <p className='alert_job-size'>Job size: {Job.jobSize}</p>
              {/* <p className='alert_job-rate'>Rate: [rate]</p> */}
            </div>

            <div className='alert__divider'></div>

            {/* BUTTONS */}
            <div className='alert__column'>
              <h2 className='alert__header'>Actions</h2>
              <button
                className='btn btn__warning btn--md'
                onClick={() => (
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'DISMISS_ALERT' })
                )}
              >
                Dismiss
              </button>
            </div>
          </container>
        </div>
      );
    case 'UNSUBSCRIBE_FROM_JOB':
      // Worker => Accepts => Customer Offer
      return (
        <div className='alert glass-2'>
          {/* ICON */}
          <div className='alert__icon'>
            <FontAwesomeIcon icon={faHouseCircleXmark} size='4x' />
          </div>

          <container className='alert__content'>
            {/* META */}
            <div className='alert__column'>
              <h2 className='alert__type'>Cancelled Service</h2>
              <p className='alert__message'>A worker has unsubscribed from one of your jobs.</p>
            </div>

            <div className='alert__divider'></div>

            {/* WORKER */}
            <div className='alert__column'>
              <h2 className='alert__header'>Worker</h2>
              <p className='alert__name'>
                Name: {User.firstName} {User.lastName}
              </p>
              <p className='alert__email'>Email: {User.email}</p>
              <p className='alert__phone'>Phone: {User.phone}</p>
              <p className='alert__rating'>Rating: * * * * *</p>
            </div>

            <div className='alert__divider'></div>

            {/* PROPERTY */}
            <div className='alert__column'>
              <h2 className='alert__header'>Property</h2>
              <p className='alert_property-name'>{Property.name}</p>
              <p className='alert_property-address'>{Property.street}</p>
              <p className='alert_property-address'>
                {Property.city}, {Property.state} {Property.zipcode}
              </p>
            </div>

            <div className='alert__divider'></div>

            {/* JOB */}
            <div className='alert__column'>
              <h2 className='alert__header'>Job Details</h2>
              <p className='alert_job-type'>Job Type: {Job.jobType}</p>
              <p className='alert_job-size'>Job size: {Job.jobSize}</p>
              {/* <p className='alert_job-rate'>Rate: [rate]</p> */}
            </div>

            <div className='alert__divider'></div>

            {/* BUTTONS */}
            <div className='alert__column'>
              <h2 className='alert__header'>Actions</h2>
              <button
                className='btn btn__warning btn--md'
                onClick={() => (
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'DISMISS_ALERT' })
                )}
              >
                Dismiss
              </button>
            </div>
          </container>
        </div>
      );
    case 'ACCEPT_WORKER_OFFER':
      // customer => accepts => worker offer
      return (
        <div className='alert glass-2'>
          {/* ICON */}
          <div className='alert__icon'>
            <FontAwesomeIcon icon={faHouseCircleCheck} size='4x' />
          </div>

          <container className='alert__content'>
            {/* META */}
            <div className='alert__column'>
              <h2 className='alert__type'>Service Offer Accepted</h2>
              <p className='alert__message'>A customer has accepted your offer to service their job.</p>
            </div>

            <div className='alert__divider'></div>

            {/* CUSTOMER */}
            <div className='alert__column'>
              <h2 className='alert__header'>Customer</h2>
              <p className='alert__name'>
                Name: {User.firstName} {User.lastName}
              </p>
              <p className='alert__email'>Email: {User.email}</p>
              <p className='alert__phone'>Phone: {User.phone}</p>
              <p className='alert__rating'>Rating: * * * * *</p>
            </div>

            <div className='alert__divider'></div>

            {/* PROPERTY */}
            <div className='alert__column'>
              <h2 className='alert__header'>Property</h2>
              <p className='alert_property-name'>{Property.name}</p>
              <p className='alert_property-address'>{Property.street}</p>
              <p className='alert_property-address'>
                {Property.city}, {Property.state} {Property.zipcode}
              </p>
            </div>

            <div className='alert__divider'></div>

            {/* JOB */}
            <div className='alert__column'>
              <h2 className='alert__header'>Job Details</h2>
              <p className='alert_job-type'>Job Type: {Job.jobType}</p>
              <p className='alert_job-size'>Job size: {Job.jobSize}</p>
              {/* <p className='alert_job-rate'>Rate: [rate]</p> */}
            </div>

            <div className='alert__divider'></div>

            {/* BUTTONS */}
            <div className='alert__column'>
              <h2 className='alert__header'>Actions</h2>
              <button
                className='btn btn__warning btn--md'
                onClick={() => (
                  dispatch({ type: 'SET_ALERT', payload: props.alert }), dispatch({ type: 'DISMISS_ALERT' })
                )}
              >
                Dismiss
              </button>
            </div>
          </container>
        </div>
      );
  }
}

export default Alert;
