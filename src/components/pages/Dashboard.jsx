import '../../styles/pages/dashboard.css';
import DashNav from '../components/Dashnav.jsx';
import Dash from '../layouts/Dash.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
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
