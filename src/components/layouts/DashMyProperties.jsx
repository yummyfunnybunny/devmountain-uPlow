import '../../styles/layouts/dashMyProperties.css';
import Property from '../components/Property.jsx';
// import PropertyJob from '../components/___Job2.jsx';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function DashMyProperties() {
  const dispatch = useDispatch();
  const reduxProperties = useSelector((state) => state.propertyReducer);
  const reduxJobs = useSelector((state) => state.jobReducer);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get('/properties')
      .then((res) => {
        console.log(res.data);
        setProperties(res.data.properties);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reduxProperties]);

  return (
    <>
      <div className='dashMyProperties'>
        <div className='property__list'>
          {properties.length > 0 ? (
            properties.map((prop) => {
              return (
                <Property
                  key={prop.property_id}
                  id={prop.property_id}
                  name={prop.name}
                  picture={prop.picture}
                  street={prop.street}
                  city={prop.city}
                  state={prop.state}
                  zipcode={prop.zipcode}
                  coordinates={prop.coordinates}
                />
              );
            })
          ) : (
            <></>
          )}
          <button
            className='btn'
            onClick={() => {
              dispatch({ type: 'CREATE_PROPERTY' }), dispatch({ type: 'RESET_JOBS' });
            }}
          >
            Create New Property
          </button>
        </div>
      </div>
    </>
  );
}

export default DashMyProperties;
