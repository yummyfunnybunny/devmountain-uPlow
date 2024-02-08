import '../../styles/components/dashNav.css';
import { useDispatch, useSelector } from 'react-redux';

function Dashnav() {
  const reduxUser = useSelector((state) => state.loggedInReducer);

  const dispatch = useDispatch();

  return (
    <div className='dash__nav glass-1'>
      <button className='btn--dash-nav' onClick={() => dispatch({ type: 'HOME' })}>
        Forecast
      </button>
      <button className='btn--dash-nav' onClick={() => dispatch({ type: 'ALERTS' })}>
        Alerts
      </button>
      {/* <button className='btn--dash-nav' onClick={() => dispatch({ type: 'MESSAGES' })}>
        Messages
      </button> */}
      {reduxUser.role === 'customer' ? (
        <>
          <button className='btn--dash-nav' onClick={() => dispatch({ type: 'MY_PROPERTIES' })}>
            My Properties
          </button>

          <button className='btn--dash-nav' onClick={() => dispatch({ type: 'MY_JOBS' })}>
            My Jobs
          </button>
          <button className='btn--dash-nav' onClick={() => dispatch({ type: 'FIND_WORKERS' })}>
            Find Workers
          </button>
        </>
      ) : (
        <></>
      )}
      {reduxUser.role === 'worker' ? (
        <>
          <button className='btn--dash-nav' onClick={() => dispatch({ type: 'MY_SUBSCRIPTIONS' })}>
            My Subscriptions
          </button>
          <button className='btn--dash-nav' onClick={() => dispatch({ type: 'FIND_JOBS' })}>
            Find Jobs
          </button>
        </>
      ) : (
        <></>
      )}
      {/* <button className='btn--dash-nav' onClick={() => dispatch({ type: 'SERVICE_HISTORY' })}>
        Service History
      </button> */}
      <button className='btn--dash-nav' onClick={() => dispatch({ type: 'ACCOUNT' })}>
        Account
      </button>
    </div>
  );
}

export default Dashnav;
