import '../../styles/layouts/dashMyJobs.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MyJob(props) {
  // console.log(props);
  const { job_id, jobType, jobSize, picture, subscribed, instructions } = props.job;

  const [worker, setWorker] = useState(null);
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.loggedInReducer);

  // console.log('job_id');
  // console.log(job_id);

  // console.log('redux user');
  // console.log(reduxUser.role);

  // console.log('worker:');
  // console.log(worker);

  useEffect(() => {
    axios
      .get(`/workerByJob/${job_id}`)
      .then((res) => {
        console.log(res.data);
        setWorker(res.data.worker);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      <div className='my-job__subscribed'>
        <h2 className='my-job__header'>Worker</h2>
        {/* TODO - dynamically add content based on the status of subscribed */}
        {worker ? (
          <>
            {/* Worker is subscribed */}
            <p>
              Name: {worker?.firstName} {worker?.lastName}
            </p>
            <p>Phone: {worker?.phone}</p>
          </>
        ) : (
          <>
            {/* No Worker Subscribed  */}
            <p>No Worker Subscribed</p>
          </>
        )}
      </div>

      {/* BUTTONS */}
      <div className='my-job__options'>
        <h2 className='my-job__header'>Options</h2>

        {worker ? (
          <>
            {/* Unsubscribe Worker */}
            <button
              className='btn'
              onClick={() => (
                dispatch({ type: 'SET_WORKER', payload: worker }),
                dispatch({ type: 'SET_JOB', payload: props.job }),
                dispatch({ type: 'UNSUBSCRIBE_WORKER' })
              )}
            >
              Cancel Worker
            </button>
          </>
        ) : null}

        {/* Edit Job */}
        <button
          className='btn'
          onClick={() => (
            dispatch({ type: 'EDIT_JOB' }), dispatch({ type: 'SET_JOB', payload: props.job })
            // dispatch({
            //   type: 'SET_JOB',
            //   payload: {
            //     job_id: id,
            //     jobType: jobType,
            //     jobSize: jobSize,
            //     picture: picture,
            //     instructions: instructions,
            //   },
            // })
          )}
        >
          Edit Job
        </button>

        {/* Delete Job */}
        <button
          className='btn'
          onClick={() => (
            dispatch({ type: 'DELETE_JOB' }),
            dispatch({
              type: 'SET_JOB',
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
      </div>
    </div>
  );
}

export default MyJob;

// TODO - dynamically change the appearance of job components based on the user role (Customer or Worker)
/*
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
      <div className='my-job__subscribed'>
        <h2 className='my-job__header'>Status</h2>
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
              type: 'SET_JOB',
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
              type: 'SET_JOB',
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
*/
