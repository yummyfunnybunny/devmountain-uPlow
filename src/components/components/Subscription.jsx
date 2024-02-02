// import '../../styles/components/subscription.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Subscription(props) {
  const { subscription } = props;
  console.log(subscription);
  const [property, setProperty] = useState();

  let jobSizeMetric = '';
  switch (subscription.jobType) {
    case 'driveway':
    case 'roof':
    case 'pond':
      jobSizeMetric = 'sq ft';
      break;
    case 'sidewalk':
    case 'walkway':
      jobSizeMetric = 'ft';
      break;
    case 'parking lot':
      jobSizeMetric = 'spaces';
      break;
  }

  useEffect(() => {
    axios
      .get(`/propertyBySubscription/${subscription.job_id}`)
      .then((res) => {
        console.log(res.data);
        setProperty(res.data.property);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='subscription glass-2'>
      {/* SLIDES */}
      <div className='subscription__image'>
        <img className='subscription__pic' src='https://picsum.photos/200'></img>
      </div>

      <container className='subscription__content'>
        {/* DETAILS */}
        <container className='subscription__details'>
          <h2 className='subscription__header'>Details</h2>
          <p className='subscription__size'>Job Type: {subscription.jobType}</p>
          {/* TODO - add dynamic rendering of metric type */}
          <p className='subscription__size'>
            Size: {subscription.jobSize} {jobSizeMetric}
          </p>
        </container>

        <div className='subscription__divider'></div>

        {/* ADDRESS */}
        <container className='subscription__address'>
          <h2 className='subscription__header'>Address</h2>
          <p className='subscription__size'>{property ? property.street : null}</p>
          <p className='subscription__size'>
            {property ? property.city : null}, {property ? property.state : null} {property ? property.zipcode : null}
          </p>
        </container>

        <div className='subscription__divider'></div>

        {/* INSTRUCTiONS */}
        <div className='subscription__instructions'>
          <h2 className='subscription__header'>Instructions</h2>
          {subscription.instructions.map((inst, idx) => {
            return <p key={idx}>&#x2022; {inst}</p>;
          })}
        </div>

        <div className='subscription__divider'></div>

        {/* OPTIONS */}
        <div className='subscription__options'>
          <h2 className='subscription__header'>Options</h2>
          {/* <button className='btn'>Message Owner</button> */}
          {/* <button className='btn'>Request Service</button> */}
          <button className='btn btn__warning btn--md '>Unsubscribe</button>
        </div>
      </container>
    </div>
  );
}

export default Subscription;
