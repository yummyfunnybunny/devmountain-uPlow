import '../../styles/layouts/dashMyJobs.css';

function MyJob() {
  return (
    <div className='my-job'>
      <div className='my-job__slides'>
        <img className='my-job__pic' src='https://picsum.photos/200'></img>
      </div>
      <div className='my-job__details'>
        <h2 className='my-job__type'>Job Type</h2>
        <p className='my-job__size'>Job Size</p>
        <p className='my-job__status'>Status</p>
      </div>
      <div className='my-job__instructions'>
        <h2 className='my-job__header'>Instructions</h2>
        <p className='my-job__instruction'>- Instructions 1</p>
        <p className='my-job__instruction'>- Instructions 2</p>
        <p className='my-job__instruction'>- Instructions 3</p>
      </div>
      <div className='my-job__address'>
        <h2 className='my-job__header'>Address</h2>
        <p className='my-job__street'>1234 some ave</p>
        <p className='my-job__city'>some city</p>
        <p className='my-job__state'>NH</p>
        <p className='my-job__zip'>12345</p>
      </div>
      <div className='my-job__options'>
        <h2 className='my-job__header'>Options</h2>
        <button className='btn'>Message Owner</button>
        <button className='btn'>Request Service</button>
        <button className='btn'>Cancel Job</button>
      </div>
    </div>
  );
}

export default MyJob;
