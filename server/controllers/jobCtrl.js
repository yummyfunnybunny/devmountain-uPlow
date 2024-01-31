import { User, Property, Job, Alert } from '../database/model.js';

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
        include: [
          {
            model: Property,
          },
        ],
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
  myJobsWithProperties: async (req, res) => {
    console.log('==my jobs with properties route');
    try {
      const user = await User.findByPk(req.session.user_id);
      const properties = await user.getProperties();
      const propertyIds = properties.map((prop) => {
        return prop.property_id;
      });
      console.log(propertyIds);
      const jobsWithProperties = await Job.findAll({
        where: {
          property_id: [...propertyIds],
          subscribed: null,
        },
        include: [
          {
            model: Property,
            attributes: ['name', 'street', 'city', 'state', 'zipcode'],
          },
        ],
      });
      res.status(200).send({
        success: true,
        message: 'jobs with properties successfully retrieved',
        jobsWithProperties: jobsWithProperties,
      });
    } catch (err) {
      console.log(err);
    }
  },
  acceptJobOffer: async (req, res) => {
    console.log('== accept job offer route ==');
    console.log(req.body);
    try {
      // TODO - workers should not be able to accept a job if someone else accepted it
      const job = await Job.findByPk(req.body.job_id);
      if (job.subscribed != null) {
        return res.status(200).send({
          success: false,
          message: 'This job is no longer available. Someone else may have already accepted this job.',
        });
      }
      job.subscribed = req.session.user_id;
      await job.save();
      await Alert.destroy({
        where: {
          alert_id: req.body.alert_id,
        },
      });
      res.status(200).send({
        success: true,
        message: 'You have successfully subscribed to this job!',
      });
    } catch (err) {
      console.log(err);
    }
  },
};
