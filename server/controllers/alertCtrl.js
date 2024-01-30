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
    console.log('== Request Service From Worker Route ==');
    console.log(req.body);
    try {
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
      await Alert.create({ ...alert });
      res.status(200).send({
        success: true,
        message: 'You have successfully requested the services of this worker!',
      });
    } catch (err) {
      console.log(err);
    }
  },
};
