import '../../styles/layouts/dash.css';
import { useSelector, useDispatch } from 'react-redux';
import Home from './DashHome.jsx';
import Alerts from './DashAlerts.jsx';
import Messages from './DashMessages.jsx';
import MyProperties from './DashMyProperties.jsx';
import MyJobs from './DashMyJobs.jsx';
import FindJobs from './DashFindJobs.jsx';
import FindWorkers from './DashFindWorkers.jsx';
import ServiceHistory from './DashServiceHistory.jsx';
import Account from './DashAccount.jsx';

function Dash() {
  const dashMode = useSelector((state) => state.dashReducer.dashMode);

  return (
    <div className='dash'>
      {dashMode === 'HOME' ? <Home /> : <></>}
      {dashMode === 'ALERTS' ? <Alerts /> : <></>}
      {dashMode === 'MESSAGES' ? <Messages /> : <></>}
      {dashMode === 'MY_PROPERTIES' ? <MyProperties /> : <></>}
      {dashMode === 'MY_JOBS' ? <MyJobs /> : <></>}
      {dashMode === 'FIND_JOBS' ? <FindJobs /> : <></>}
      {dashMode === 'FIND_WORKERS' ? <FindWorkers /> : <></>}
      {dashMode === 'SERVICE_HISTORY' ? <ServiceHistory /> : <></>}
      {dashMode === 'ACCOUNT' ? <Account /> : <></>}
    </div>
  );
}

export default Dash;
