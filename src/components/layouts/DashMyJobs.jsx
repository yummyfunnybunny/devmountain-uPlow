import Job from '../components/Job.jsx';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function DashMyJobs() {
  const reduxJobs = useSelector((state) => state.jobReducer);
  const [jobs, setJobs] = useState([]);

  console.log('dash my jobs:');
  console.log(reduxJobs);

  useEffect(() => {
    axios
      .get('/myJobs')
      .then((res) => {
        console.log(res.data);
        setJobs(res.data.jobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reduxJobs]);

  return (
    <div className='dashMyJobs'>
      <div className='my-job__list'>
        {jobs.length > 0 ? (
          jobs.map((job) => {
            return (
              <Job
                key={job.job_id}
                job={job}
                // id={job.job_id}
                // jobType={job.jobType}
                // jobSize={job.jobSize}
                // picture={job.picture}
                // subscribed={job.subscribed}
                // instructions={job.instructions}
              />
            );
          })
        ) : (
          <></>
        )}
        {/* <Job /> */}
      </div>
    </div>
  );
}

export default DashMyJobs;
