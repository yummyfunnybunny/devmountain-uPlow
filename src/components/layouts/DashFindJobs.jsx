// import '../../styles/layouts/dashFindJobs.css';
import Mapbox from '../components/Mapbox.jsx';
import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
const root = import.meta.env.VITE_REACT_APP_ROOT;

function DashFindJobs() {
  // const reduxAvailableJobs = useSelector((state) => state.findJobsReducer);
  const [availableJobs, setAvailableJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`${root}/availableJobs`)
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
    <div className='map-container'>
      {availableJobs.length > 0 && <Mapbox dataType='jobs' locationData={availableJobs} />}
    </div>
  );
}

export default DashFindJobs;
