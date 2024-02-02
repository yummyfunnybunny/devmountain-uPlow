import '../../styles/layouts/dashAlerts.css';
import Alert from '../components/Alert.jsx';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function DashAlerts() {
  const [myAlerts, setMyAlerts] = useState([]);
  const reduxAlert = useSelector((state) => state.alertReducer);

  useEffect(() => {
    axios
      .get('/myAlerts')
      .then((res) => {
        console.log(res.data);
        setMyAlerts(res.data.alerts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reduxAlert]);

  return (
    <div className='alerts'>
      {myAlerts.length > 0
        ? myAlerts.map((alert) => {
            return <Alert key={alert.alert_id} alert={alert} />;
          })
        : null}
    </div>
  );
}

export default DashAlerts;
