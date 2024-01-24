import { User, Property, Job } from '../database/model.js';

export default {
  myJobs: async (req, res) => {
    console.log('== My Jobs Route ==');

    let user;
    let properties;
    let jobs = [];
    try {
      user = await User.findByPk(req.session.user_id);
      properties = await user.getProperties();
      await Promise.all(
        properties.map(async (prop) => {
          const propJob = await prop.getJobs();
          jobs = [...jobs, ...propJob];
        })
      );
    } catch (err) {
      console.log(err);
    }
    res.status(200).send({
      success: true,
      message: 'jobs retrieved successfully',
      jobs: jobs,
    });
  },
  createJob: async (req, res) => {
    console.log('== Create Job Route ==');
    const createJob = req.body;
    console.log(createJob);

    try {
      await Job.create({
        ...createJob,
      });
      res.status(200).send({
        success: true,
        message: 'Job successfully created',
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateJob: async (req, res) => {
    console.log('== Update Job Route ==');
    console.log(req.body);
    const editJob = req.body;

    try {
      await Job.update(
        { ...editJob },
        {
          where: {
            job_id: editJob.job_id,
          },
        }
      );
      res.status(200).send({
        success: true,
        message: 'job successfully updated',
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteJob: async (req, res) => {
    console.log('== Delete Job Route ==');
    console.log(req.params);
    const { job_id } = req.params;
    console.log(job_id);
    try {
      await Job.destroy({
        where: {
          job_id: job_id,
        },
      });
      res.status(200).send({
        success: true,
        message: 'Job was successfully deleted',
      });
    } catch (err) {
      console.log(err);
    }
  },
};
