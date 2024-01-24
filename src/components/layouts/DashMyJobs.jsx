import Job from '../components/Job.jsx';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function DashMyJobs() {
  const reduxJobs = useSelector((state) => state.jobReducer);
  const [jobs, setJobs] = useState([]);

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
          jobs.map((prop) => {
            return (
              <Job
                key={prop.job_id}
                id={prop.job_id}
                jobType={prop.jobType}
                jobSize={prop.jobSize}
                picture={prop.picture}
                subscribed={prop.subscribed}
                instructions={prop.instructions}
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
