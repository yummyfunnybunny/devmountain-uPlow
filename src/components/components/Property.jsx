import '../../styles/layouts/properties.css';
// import PropertyJob from './___Job2.jsx';
import { useSelector, useDispatch } from 'react-redux';

function Property(props) {
  const { id, name, picture, street, city, state, zipcode, coordinates } = props;
  const property = useSelector((state) => state.propertyReducer);
  const user = useSelector((state) => state.loggedInReducer);
  const reduxJobs = useSelector((state) => state.jobReducer);
  const dispatch = useDispatch();

  return (
    <div className='property glass-2'>
      {/* <div className='property__meta'> */}
      <div className='property__image'>
        {/* IMAGE */}
        <img className='property__pic' src='property_placeholder.jpg'></img>
      </div>

      {/* <div className='property__divider'></div> */}

      <div className='property__content'>
        {/* NAME */}
        <h1 className='property__name'>{name}</h1>

        <div className='property__divider'></div>

        {/* ADDRESS */}
        <div className='property__address'>
          <h2 className='property__header'>Address</h2>
          <p className='property__street'>{street},</p>
          <p className='property__street'>
            {city}, {state}, {zipcode}
          </p>
        </div>

        <div className='property__divider'></div>

        {/* BuTTONS */}
        <div className='property__buttons'>
          <h2 className='property__header'>Options</h2>
          <button
            className='btn btn__success btn--md btn--property'
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
            className='btn btn__caution btn--md btn--property'
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
            className='btn btn__warning btn--md btn--property'
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
      {/* </div> */}
    </div>
  );
}

export default Property;
``;

{
  /* CITY */
}
{
  /* <div className='property__city'>
          <h2 className='property__header'>City:</h2>
          <p className='property__state'>{city}</p>
        </div> */
}

{
  /* STATE */
}
{
  /* <div className='property__state'>
          <h2 className='property__header'>State:</h2>
          <p className='property__state'>{state}</p>
        </div> */
}

{
  /* ZIPCODE */
}
{
  /* <div className='property__zip'>
          <h2 className='property__header'>Zipcode:</h2>
          <p className='property__zip'>{zipcode}</p>
        </div> */
}
