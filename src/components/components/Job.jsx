import '../../styles/layouts/dashMyJobs.css';
import { useDispatch } from 'react-redux';

function MyJob(props) {
  const { id, jobType, jobSize, picture, subscribed, instructions } = props;
  const dispatch = useDispatch();
  // TODO - dynamically change the appearance of job components based on the user role (Customer or Worker)
  return (
    <div className='my-job'>
      <div className='my-job__slides'>
        <img className='my-job__pic' src='https://picsum.photos/200'></img>
      </div>
      <div className='my-job__details'>
        <h2 className='my-job__type'>Job Type</h2>
        <p className='my-job__size'>{jobType}</p>
        <p className='my-job__status'>{jobSize}</p>
      </div>
      <div className='my-job__instructions'>
        <h2 className='my-job__header'>Instructions</h2>
        {instructions.map((inst, idx) => {
          return <p key={idx}>{inst}</p>;
        })}
      </div>
      {/* <div className='my-job__address'>
        <h2 className='my-job__header'>Address</h2>
        <p className='my-job__street'>1234 some ave</p>
        <p className='my-job__city'>some city</p>
        <p className='my-job__state'>NH</p>
        <p className='my-job__zip'>12345</p>
      </div> */}
      <div className='my-job__subscribed'>
        <h2 className='my-job__header'>Status</h2>
        {/* TODO - dynamically add content based on the status of subscribed */}
        <p>{subscribed}</p>
      </div>
      <div className='my-job__options'>
        <h2 className='my-job__header'>Options</h2>
        <button className='btn'>Request Service</button>
        <button
          className='btn'
          onClick={() => (
            dispatch({ type: 'EDIT_JOB' }),
            dispatch({
              type: true,
              payload: {
                job_id: id,
                jobType: jobType,
                jobSize: jobSize,
                picture: picture,
                instructions: instructions,
              },
            })
          )}
        >
          Edit Job
        </button>
        <button
          className='btn'
          onClick={() => (
            dispatch({ type: 'DELETE_JOB' }),
            dispatch({
              type: true,
              payload: {
                job_id: id,
                jobType: jobType,
                jobSize: jobSize,
                picture: picture,
                instructions: instructions,
              },
            })
          )}
        >
          Delete Job
        </button>
        <button className='btn'>Message Owner</button>
        <button className='btn'>Request Service</button>
        <button className='btn'>Unsibscribe</button>
      </div>
    </div>
  );
}

export default MyJob;
