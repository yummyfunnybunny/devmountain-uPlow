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
    <div className='subscription'>
      <div className='subscription__slides'>
        <img className='subscription__pic' src='https://picsum.photos/200'></img>
      </div>
      <div className='subscription__details'>
        <h2 className='subscription__type'>Details</h2>
        <p className='subscription__size'>Job Type: {subscription.jobType}</p>
        {/* TODO - add dynamic rendering of metric type */}
        <p className='subscription__size'>
          Size: {subscription.jobSize} {jobSizeMetric}
        </p>
      </div>
      <div className='subscription__address'>
        <h2 className='subscription__type'>Address</h2>
        <p className='subscription__size'>{property ? property.street : null}</p>
        <p className='subscription__size'>
          {property ? property.city : null}, {property ? property.state : null} {property ? property.zipcode : null}
        </p>
      </div>
      <div className='subscription__instructions'>
        <h2 className='subscription__header'>Instructions</h2>
        <p className='subscription__instruction'>{subscription.instructions[0]}</p>
        <p className='subscription__instruction'>{subscription.instructions[1]}</p>
        <p className='subscription__instruction'>{subscription.instructions[2]}</p>
      </div>
      <div className='subscription__options'>
        <h2 className='subscription__header'>Options</h2>
        <button className='btn'>Message Owner</button>
        <button className='btn'>Request Service</button>
        <button className='btn'>Unsubscribe</button>
      </div>
    </div>
  );
}

export default Subscription;
