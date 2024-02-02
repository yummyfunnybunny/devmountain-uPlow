import Subscription from '../components/Subscription.jsx';
import '../../styles/components/subscription.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function DashMySubscriptions() {
  const reduxJobs = useSelector((state) => state.jobReducer);
  const reduxUser = useSelector((state) => state.loggedInReducer);
  const [subscriptions, setSubscriptions] = useState([]);
  console.log(reduxUser.user_id);

  useEffect(() => {
    axios
      .get(`/mySubscriptions/${reduxUser.user_id}`)
      .then((res) => {
        console.log(res.data);
        setSubscriptions(res.data.subscriptions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='subscriptions'>
      {/* <div className='my-subscriptions__list'> */}
      {subscriptions.length > 0 ? (
        subscriptions.map((sub) => {
          return <Subscription key={sub.job_id} subscription={sub} />;
        })
      ) : (
        <></>
      )}
      {/* </div> */}
    </div>
  );
}

export default DashMySubscriptions;
