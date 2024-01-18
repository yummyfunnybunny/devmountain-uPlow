import '../../styles/components/property-job.css';

function PropertyJob() {
  return (
    <div className='property-job'>
      <div className='property-job__slider'>
        <img className='property-job__pic' src='https://picsum.photos/200'></img>
      </div>
      <div className='property-job__details'>
        <h2 className='property-job__type'>Job Type</h2>
        <div className='property-job__size'>Job Size</div>
      </div>
      <div className='property-job__instructions'>
        <h2 className='property-job__header'>Instructions</h2>
        <p className='property-job__instruction'>- Instructions 1</p>
        <p className='property-job__instruction'>- Instructions 2</p>
        <p className='property-job__instruction'>- Instructions 3</p>
      </div>
      <div className='property-job__worker'>
        <h2 className='property-job__header'>Plower</h2>
        <p className='property-job__name'>Name: [name]</p>
      </div>
      <div className='property-job__options'>
        <h2 className='property-job__header'>Options</h2>
        <button className='btn'>Edit Job</button>
        <button className='btn'>Delete Job</button>
      </div>
    </div>
  );
}

export default PropertyJob;
