import '../../styles/layouts/dashMyJobs.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MyJob(props) {
  // console.log(props);
  const { job_id, jobType, jobSize, picture, subscribed, instructions } = props.job;
  console.log(props.job);

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
    <div className='job glass-2'>
      <div className='job_image'>
        <img className='job__pic' src='https://picsum.photos/200'></img>
      </div>

      <div className='job__content'>
        {/* DETAILS */}
        <container className='job__details'>
          <h2 className='job__header'>Details</h2>
          <p className='job__type'>Job Type: {jobType}</p>
          <p className='job__size'>Job Size: {jobSize}</p>
        </container>

        <div className='job__divider'></div>

        {/* INSTRUCTIONS */}
        <div className='job__instructions'>
          <h2 className='job__header'>Instructions</h2>
          {instructions.map((inst, idx) => {
            return <p key={idx}>&#x2022; {inst}</p>;
          })}
        </div>

        <div className='job__divider'></div>

        {/* SUBSCRIBER INFO */}
        <div className='job__subscribed'>
          <h2 className='job__header'>Worker</h2>
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

        <div className='job__divider'></div>

        {/* OPTIONS */}
        <div className='job__options'>
          <h2 className='job__header'>Options</h2>

          {/* Edit Job */}
          <button
            className='btn btn__success btn--md btn--property'
            onClick={() => (dispatch({ type: 'EDIT_JOB' }), dispatch({ type: 'SET_JOB', payload: props.job }))}
          >
            Edit Job
          </button>

          {/* Unsubscribe Worker */}
          {worker ? (
            <>
              <button
                className='btn btn__caution btn--md btn--property'
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

          {/* Delete Job */}
          <button
            className='btn btn__warning btn--md btn--property'
            onClick={() => (
              dispatch({ type: 'DELETE_JOB' }),
              dispatch({
                type: 'SET_JOB',
                payload: {
                  job_id: job_id,
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
    </div>
  );
}

export default MyJob;
