import '../../styles/components/dashNav.css';
import { useDispatch } from 'react-redux';

function Dashnav() {
  // const dashMode = useSelector((state) => state.dashReducer.dashMode);
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
      <button className='dashnav__btn' onClick={() => dispatch({ type: 'MY_PROPERTIES' })}>
        My Properties
      </button>
      <button className='dashnav__btn' onClick={() => dispatch({ type: 'MY_JOBS' })}>
        My Jobs
      </button>
      <button className='dashnav__btn' onClick={() => dispatch({ type: 'FIND_JOBS' })}>
        Find Jobs
      </button>
      <button className='dashnav__btn' onClick={() => dispatch({ type: 'FIND_WORKERS' })}>
        Find Workers
      </button>
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
