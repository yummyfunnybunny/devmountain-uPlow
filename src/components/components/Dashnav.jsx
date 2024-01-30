import '../../styles/components/dashNav.css';
import { useDispatch, useSelector } from 'react-redux';

function Dashnav() {
  const reduxUser = useSelector((state) => state.loggedInReducer);

  const dispatch = useDispatch();

  return (
    <div className='dashnav'>
      <button className='dashnav__btn' onClick={() => dispatch({ type: 'HOME' })}>
        Home
      </button>
      <button className='dashnav__btn' onClick={() => dispatch({ type: 'ALERTS' })}>
        Alerts
      </button>
      <button className='dashnav__btn' onClick={() => dispatch({ type: 'MESSAGES' })}>
        Messages
      </button>
      {reduxUser.role === 'customer' ? (
        <>
          <button className='dashnav__btn' onClick={() => dispatch({ type: 'MY_PROPERTIES' })}>
            My Properties
          </button>

          <button className='dashnav__btn' onClick={() => dispatch({ type: 'MY_JOBS' })}>
            My Jobs
          </button>
          <button className='dashnav__btn' onClick={() => dispatch({ type: 'FIND_WORKERS' })}>
            Find Workers
          </button>
        </>
      ) : (
        <></>
      )}
      {reduxUser.role === 'worker' ? (
        <>
          <button className='dashnav__btn' onClick={() => dispatch({ type: 'MY_SUBSCRIPTIONS' })}>
            My Subscriptions
          </button>
          <button className='dashnav__btn' onClick={() => dispatch({ type: 'FIND_JOBS' })}>
            Find Jobs
          </button>
        </>
      ) : (
        <></>
      )}
      <button className='dashnav__btn' onClick={() => dispatch({ type: 'SERVICE_HISTORY' })}>
        Service History
      </button>
      <button className='dashnav__btn' onClick={() => dispatch({ type: 'ACCOUNT' })}>
        Account
      </button>
    </div>
  );
}

export default Dashnav;
