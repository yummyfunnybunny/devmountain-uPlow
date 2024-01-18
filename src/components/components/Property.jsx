import '../../styles/components/property.css';
import PropertyJob from './propertyJob.jsx';

function Property() {
  return (
    <div className='property'>
      <div className='property__meta'>
        <div className='property__image'>
          <img className='property__pic' src='https://picsum.photos/200'></img>
        </div>
        <div className='property__details'>
          <h1 className='property__name'>Property Name</h1>
          <p className='property__street'>Strees Address: [address]</p>
          <p className='property__state'>State: [state]</p>
          <p className='property__zip'>Zipcode: [zipcode]</p>
          <div className='property__buttons'>
            <button className='btn'>Create New Job</button>
            <button className='btn'>Edit Property</button>
            <button className='btn'>Delete Property</button>
          </div>
        </div>
      </div>
      {/* <div className='property__jobs'>
        <h1 className='property__header'>Jobs</h1>
        <PropertyJob />
      </div> */}
    </div>
  );
}

export default Property;
``;
