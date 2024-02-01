import { Alert, User, Job, Property } from '../database/model.js';

export default {
  myAlerts: async (req, res) => {
    console.log('== My Alerts Route ==');
    try {
      const alerts = await Alert.findAll({
        where: {
          recipient_id: req.session.user_id,
        },
        include: [
          {
            model: Property,
          },
          {
            model: Job,
          },
          {
            model: User,
          },
        ],
      });
      console.log(alerts);
      res.status(200).send({
        success: true,
        message: 'alerts successfully retrieved',
        alerts: alerts,
      });
    } catch (err) {
      console.log(err);
    }
  },
  requestWorker: async (req, res) => {
    // Customer => Offers => Worker
    console.log('== Request Service From Worker Route ==');
    console.log(req.body);
    try {
      // build alert object to create
      const user = await User.findByPk(req.session.user_id);
      const alert = {
        alertType: 'REQUEST_WORKER',
        hasRead: false,
        recipient_id: req.body.recipient_id,
        sender_id: req.session.user_id,
        job_id: req.body.job_id,
        property_id: req.body.property_id,
        message: `${user.firstName} ${user.lastName} has request your services for one of their jobs!`,
      };

      // Check for Duplicate Alert
      const duplicateAlert = await Alert.findOne({
        where: {
          alertType: 'REQUEST_JOB',
          recipient_id: req.body.recipient_id,
          sender_id: req.session.user_id,
          job_id: req.body.job_id,
          property_id: req.body.property_id,
        },
      });

      // create new alert if no duplicate
      if (!duplicateAlert) {
        await Alert.create({ ...alert });
      }

      // send response
      res.status(200).send({
        success: true,
        message: 'You have successfully requested the services of this worker!',
      });
    } catch (err) {
      console.log(err);
    }
  },
  requestJob: async (req, res) => {
    // Worker => Requests => Customer
    console.log('=== request job route ==');
    console.log(req.body);
    try {
      // build the alert object to create
      const user = await User.findByPk(req.session.user_id);
      const job = await Job.findByPk(req.body.job_id);
      const property = await Property.findByPk(job.property_id);
      const customer = await User.findByPk(property.user_id);
      const alert = {
        alertType: 'REQUEST_JOB',
        hasRead: false,
        recipient_id: customer.user_id,
        sender_id: req.session.user_id,
        job_id: job.job_id,
        property_id: property.property_id,
        message: `${user.firstName} ${user.lastName} has request to service your job!`,
      };

      // Check for Duplicate Alert
      const duplicateAlert = await Alert.findOne({
        where: {
          alertType: 'REQUEST_JOB',
          recipient_id: customer.user_id,
          sender_id: req.session.user_id,
          job_id: job.job_id,
          property_id: property.property_id,
        },
      });

      // create new alert if no duplicate
      if (!duplicateAlert) {
        await Alert.create({ ...alert });
      }

      // send response
      res.status(200).send({
        success: true,
        message: 'You have successfully requested to services this job!',
      });
    } catch (err) {
      console.log(err);
    }
  },
  rejectRequestWorker: async (req, res) => {
    // Worker => Rejects => Customer
    console.log('== reject request worker route ==');
    console.log(req.params);
    try {
      // get alert that we are deleting
      const alert = await Alert.findByPk(req.params.alert_id);

      // send new rejection alert to the sender
      const rejectionAlert = {
        alertType: 'CUSTOMER_OFFER_REJECTED',
        hasRead: false,
        recipient_id: alert.sender_id,
        sender_id: req.session.user_id,
        job_id: alert.job_id,
        property_id: alert.property_id,
        message: `Your request for a worker to service your job has been rejected`,
      };
      await Alert.create({ ...rejectionAlert });
      await alert.destroy();
      res.status(200).send({
        success: true,
        message: 'You have successfully rejected this job offer',
      });
    } catch (err) {
      console.log(err);
    }
  },
  rejectRequestJob: async (req, res) => {
    // Customer => Rejects => Worker Offer
    console.log('== Reject Request Job Route ==');
    console.log(req.params);
    try {
      // get alert that we are deleting
      const alert = await Alert.findByPk(req.params.alert_id);

      // send new rejection alert to the sender
      const rejectionAlert = {
        alertType: 'WORKER_OFFER_REJECTED',
        hasRead: false,
        recipient_id: alert.sender_id,
        sender_id: req.session.user_id,
        job_id: alert.job_id,
        property_id: alert.property_id,
        message: `Your request to service a job has been rejected by the customer`,
      };
      await Alert.create({ ...rejectionAlert });
      await alert.destroy();
      res.status(200).send({
        success: true,
        message: 'You have successfully rejected this service offer',
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteAlert: async (req, res) => {
    console.log('== Delete Alert Route ==');
    console.log(req.params.alert_id);
    try {
      const alert = await Alert.findByPk(req.params.alert_id);
      await alert.destroy();
      res.status(200).send({
        success: true,
        message: 'alert was successfully deleted',
      });
    } catch (err) {
      console.log(err);
    }
  },
};
