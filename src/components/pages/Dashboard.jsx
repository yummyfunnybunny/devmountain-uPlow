import '../../styles/pages/dashboard.css';
import DashNav from '../components/Dashnav.jsx';
import Dash from '../layouts/Dash.jsx';

function Dashboard() {
  return (
    <div className='dashboard'>
      <DashNav />
      <Dash />
    </div>
  );
}

export default Dashboard;
