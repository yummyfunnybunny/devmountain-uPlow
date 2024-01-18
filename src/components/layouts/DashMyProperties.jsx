import '../../styles/layouts/dashMyProperties.css';
import Property from '../components/Property.jsx';
import PropertyJob from '../components/propertyJob.jsx';

function DashMyProperties() {
  return (
    <>
      <div className='dashMyProperties'>
        <div className='property__list'>
          <Property />
          <Property />
          <button className='btn'>Create New Property</button>
        </div>
        <div className='job__list'>
          <PropertyJob />
        </div>
      </div>
    </>
  );
}

export default DashMyProperties;
