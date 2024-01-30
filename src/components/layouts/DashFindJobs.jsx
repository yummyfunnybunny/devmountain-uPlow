import '../../styles/layouts/dashFindJobs.css';
import Mapbox from '../components/Mapbox.jsx';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function DashFindJobs() {
  // const reduxAvailableJobs = useSelector((state) => state.findJobsReducer);
  const [availableJobs, setAvailableJobs] = useState([]);

  useEffect(() => {
    axios
      .get('/availableJobs')
      .then((res) => {
        console.log(res.data);
        setAvailableJobs(res.data.availableJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log('dashFindJobs availableJobs:');
  console.log(availableJobs);

  return (
    <div className='dashFindJobs'>
      {availableJobs.length > 0 && <Mapbox dataType='jobs' locationData={availableJobs} />}
    </div>
  );
}

export default DashFindJobs;
