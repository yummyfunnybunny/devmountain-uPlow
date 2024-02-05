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
        toast: {
          color: 'green',
          message: 'Your job has been successfully created!',
        },
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
        toast: {
          color: 'green',
          message: 'Your job has been updated!',
        },
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
        toast: {
          color: 'green',
          message: 'Your job has been deleted!',
        },
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
        toast: {
          color: 'green',
          message: 'You have unsubscribed a worker from your job!',
        },
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
    // Worker => Accepts => Customer Offer
    console.log('== accept job offer route ==');
    console.log(req.body);
    try {
      // get the job to accept
      const job = await Job.findByPk(req.body.job_id);

      // make sure noone else already accepted the job
      if (job.subscribed != null) {
        return res.status(200).send({
          success: false,
          message: 'This job is no longer available. Someone else may have already accepted this job.',
          toast: {
            color: 'red',
            message: 'This job is no longer available.',
          },
        });
      }

      // subscribe to the job
      job.subscribed = req.session.user_id;
      await job.save();

      // create job acceptance alert
      const newAlert = {
        alertType: 'ACCEPT_CUSTOMER_OFFER',
        hasRead: false,
        recipient_id: req.body.sender_id,
        sender_id: req.session.user_id,
        job_id: req.body.job_id,
        property_id: req.body.property_id,
        message: `A worker has accepted your job offer!`,
      };
      await Alert.create({ ...newAlert });

      // destroy the job offer alert
      const destroyAlert = await Alert.findByPk(req.body.alert_id);
      await destroyAlert.destroy();

      // send response
      res.status(200).send({
        success: true,
        message: 'You have successfully subscribed to this job!',
        toast: {
          color: 'green',
          message: 'You have subscribed to this job! see it in your subscriptions tab!',
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
  acceptServiceOffer: async (req, res) => {
    // Customer => Accepts => Worker Offer
    console.log('== Accept Service Offer Route ==');
    console.log(req.body);
    try {
      // set job subscribed to worker id
      const job = await Job.findByPk(req.body.job_id);
      job.subscribed = req.body.sender_id;
      await job.save();

      // create service acceptance alert for worker
      const newAlert = {
        alertType: 'ACCEPT_WORKER_OFFER',
        hasRead: false,
        recipient_id: req.body.sender_id,
        sender_id: req.session.user_id,
        job_id: req.body.job_id,
        property_id: req.body.property_id,
        message: `A customer has accepted your service offer!`,
      };
      await Alert.create({ ...newAlert });

      // destroy the worker offer alert
      const destroyAlert = await Alert.findByPk(req.body.alert_id);
      await destroyAlert.destroy();

      // send response
      res.status(200).send({
        success: true,
        message: 'you have accepted the workers service offer!',
        toast: {
          color: 'green',
          message: "You have accepted the workers' service offer!",
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
