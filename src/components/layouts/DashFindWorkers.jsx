// import '../../styles/layouts/dashFindWorkers.css';
import Mapbox from '../components/Mapbox.jsx';
import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import axios from 'axios';
const root = import.meta.env.VITE_REACT_APP_ROOT;

function DashFindWorkers() {
  const [workers, setWorkers] = useState([]);
  // const reduxShowPopup = useSelector((state) => state.mapboxPopupReducer.show);
  // console.log('redux show popup');
  // console.log(reduxShowPopup);

  useEffect(() => {
    axios
      .get(`${root}/workers`)
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
