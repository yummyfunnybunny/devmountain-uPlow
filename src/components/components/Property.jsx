import '../../styles/components/property.css';
// import PropertyJob from './___Job2.jsx';
import { useSelector, useDispatch } from 'react-redux';

function Property(props) {
  const { id, name, picture, street, city, state, zipcode, coordinates } = props;
  const property = useSelector((state) => state.propertyReducer);
  const user = useSelector((state) => state.loggedInReducer);
  const reduxJobs = useSelector((state) => state.jobReducer);
  const dispatch = useDispatch();

  return (
    <div className='property'>
      <div className='property__meta'>
        <div className='property__image'>
          {/* IMAGE */}
          <img className='property__pic' src='https://picsum.photos/200'></img>
        </div>
        <div className='property__details'>
          {/* NAME */}
          <h1 className='property__name'>{name}</h1>

          {/* ADDRESS */}
          <div className='property__address'>
            <h2 className='property__header'>Street Address</h2>
            <p className='property__street'>{street}</p>
          </div>

          {/* CITY */}
          <div className='property__city'>
            <h2 className='property__header'>City:</h2>
            <p className='property__state'>{city}</p>
          </div>

          {/* STATE */}
          <div className='property__state'>
            <h2 className='property__header'>State:</h2>
            <p className='property__state'>{state}</p>
          </div>

          {/* ZIPCODE */}
          <div className='property__zip'>
            <h2 className='property__header'>Zipcode:</h2>
            <p className='property__zip'>{zipcode}</p>
          </div>

          {/* BuTTONS */}
          <div className='property__buttons'>
            <h2 className='property__header'>Options</h2>
            <button
              className='btn'
              onClick={() => (
                dispatch({ type: 'CREATE_JOB' }),
                dispatch({
                  type: 'SET_PROPERTY',
                  payload: {
                    property_id: id,
                    name: name,
                    picture: picture,
                    street: street,
                    city: city,
                    state: state,
                    zipcode: zipcode,
                    coordinates: coordinates,
                    subscribed: null,
                    user_id: user.user_id,
                  },
                })
              )}
            >
              Create New Job
            </button>
            <button
              className='btn'
              onClick={() => (
                dispatch({ type: 'RESET_JOB' }),
                dispatch({ type: 'EDIT_PROPERTY' }),
                dispatch({
                  type: 'SET_PROPERTY',
                  payload: {
                    property_id: id,
                    name: name,
                    picture: picture,
                    street: street,
                    city: city,
                    state: state,
                    zipcode: zipcode,
                    coordinates: coordinates,
                    subscribed: null,
                    user_id: user.user_id,
                  },
                })
              )}
            >
              Edit Property
            </button>
            <button
              className='btn'
              onClick={() => (
                dispatch({ type: 'DELETE_PROPERTY' }),
                dispatch({
                  type: 'SET_PROPERTY',
                  payload: {
                    property_id: id,
                    name: name,
                    picture: picture,
                    street: street,
                    city: city,
                    state: state,
                    zipcode: zipcode,
                    coordinates: coordinates,
                    subscribed: null,
                    user_id: user.user_id,
                  },
                })
              )}
            >
              Delete Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;
``;
