import '../../styles/pages/dashboard.css';
import DashNav from '../components/Dashnav.jsx';
import Dash from '../layouts/Dash.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const root = import.meta.env.VITE_REACT_APP_ROOT;

function Dashboard() {
  const navigate = useNavigate();

  // if user no user is logged in, take them back to the home page
  useEffect(() => {
    axios
      .get(`${root}/isLoggedIn`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate(`${root}/`);
      });
  }, []);

  return (
    <container className='page__container'>
      <container className='page__section'>
        <div className='dashboard'>
          <DashNav />
          <Dash />
        </div>
      </container>
    </container>
  );
}

export default Dashboard;
