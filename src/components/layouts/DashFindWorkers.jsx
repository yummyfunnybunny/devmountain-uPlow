// import '../../styles/layouts/dashFindWorkers.css';
import Mapbox from '../components/Mapbox.jsx';
import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import axios from 'axios';

function DashFindWorkers() {
  const [workers, setWorkers] = useState([]);
  // const reduxShowPopup = useSelector((state) => state.mapboxPopupReducer.show);
  // console.log('redux show popup');
  // console.log(reduxShowPopup);

  useEffect(() => {
    axios
      .get('/workers')
      .then((res) => {
        console.log(res.data);
        setWorkers(res.data.workers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log('dashFindWorkers workers:');
  console.log(workers);

  return (
    <div className='map-container'>
      {/* <Mapbox /> */}
      {workers.length > 0 && <Mapbox dataType='workers' locationData={workers} />}
      {/* {reduxShowPopup ? <MapboxWorkerPopup /> : null} */}
    </div>
  );
}

export default DashFindWorkers;
