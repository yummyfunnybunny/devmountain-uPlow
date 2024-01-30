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
  availableJobs: async (req, res) => {
    console.log(' == Available Jobs Route ==');

    try {
      const availableJobs = await Job.findAll({
        where: {
          subscribed: null,
        },
      });
      res.status(200).send({
        success: true,
        message: 'available jobs successfully retrieved',
        availableJobs: availableJobs,
      });
    } catch (err) {
      console.log(err);
    }
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
    editJob.jobSize = +editJob.jobSize;
    console.log('after changing data type');
    console.log(editJob);

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
  getSubscriptions: async (req, res) => {
    console.log('== get subscriptions route ==');
    console.log(req.params.user_id);
    const userId = req.params.user_id;
    try {
      const subscriptions = await Job.findAll({
        where: {
          subscribed: userId,
        },
      });
      console.log(subscriptions);
      res.status(200).send({
        success: true,
        message: 'subscriptions successfully retrieved',
        subscriptions: subscriptions,
      });
    } catch (err) {
      console.log(err);
    }
  },
  unsubscribeWorker: async (req, res) => {
    console.log('== unsubscribe worker route ==');
    console.log(req.params.job_id);
    try {
      const job = await Job.findByPk(req.params.job_id);
      job.subscribed = null;
      await job.save();
      res.status(200).send({
        success: true,
        message: "you've successfully unsubscribed the worker from this job",
      });
    } catch (err) {
      console.log(err);
    }
  },
};
