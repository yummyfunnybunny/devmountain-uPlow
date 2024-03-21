import '../../styles/layouts/dashHome.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function DashHome() {
  const weatherApiKey = import.meta.env.VITE_REACT_APP_WEATHERAPI_KEY;
  // const reduxUser = useSelector((state) => state.isLoggedInReducer);
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.loggedInReducer);
  const reduxForecast = useSelector((state) => state.forecastReducer.data);
  // const [forecast, setForecast] = useState(null);
  // console.log(reduxForecast);
  // const longitude = reduxUser.coordinates[0].toString();
  // const latitude = reduxUser.coordinates[1].toString();

  useEffect(() => {
    console.log('RUNNING GET WEATHER AXIOS CALL');
    if (reduxForecast.length === 0) {
      axios
        .get(`http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${reduxUser.zipcode}&days=5&aqi=no`)
        .then((res) => {
          // console.log(res);
          // setForecast(res.data.forecast.forecastday);
          dispatch({ type: 'SET_FORECAST', payload: res.data.forecast.forecastday });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className='dash__home'>
      <container className='weather'>
        <h1 className='section__header'>Weather Forecast</h1>

        <container className='forecasts'>
          {reduxForecast ? (
            reduxForecast.map((day, idx) => {
              let className = 'forecast glass-2';
              day.day.condition.text.split(' ').includes('snow')
                ? (className = 'forecast glass-2 snowing')
                : (className = 'forecast glass-2');
              return (
                <container key={idx} className={className}>
                  <h2 className='weather__day'>{new Date(day.date).toDateString()}</h2>
                  <img className='weather__icon' src={day.day.condition.icon} />
                  <h4 className='weather__condition'>{day.day.condition.text}</h4>
                  <container className='weather__row'>
                    <p className='weather__detail'>Max Temp: </p>
                    <p className='weather__detail'>{day.day.maxtemp_f} ℉</p>
                  </container>
                  <container className='weather__row'>
                    <p className='weather__detail'>Min Temp: </p>
                    <p className='weather__detail'>{day.day.mintemp_f} ℉</p>
                  </container>
                  <container className='weather__row'>
                    <p className='weather__detail'>Precipitation: </p>
                    <p className='weather__detail'>{day.day.totalprecip_in}"</p>
                  </container>
                  <container className='weather__row'>
                    <p className='weather__detail'>Snowfall: </p>
                    <p className='weather__detail'>{day.day.totalsnow_cm} cm</p>
                  </container>
                </container>
              );
            })
          ) : (
            <h1>Weather data could not be retrieved...</h1>
          )}
        </container>
      </container>
    </div>
  );
}

export default DashHome;
