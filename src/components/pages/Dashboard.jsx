import '../../styles/pages/dashboard.css';
import DashNav from '../components/Dashnav.jsx';
import Dash from '../layouts/Dash.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/isLoggedIn')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  }, []);
  return (
    <div className='dashboard'>
      <DashNav />
      <Dash />
    </div>
  );
}

export default Dashboard;
