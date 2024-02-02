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
    <div className='jobs'>
      {jobs.length > 0 ? (
        jobs.map((job) => {
          return <Job key={job.job_id} job={job} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default DashMyJobs;
