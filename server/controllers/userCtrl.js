import { User, Property, Job, Customer, Worker } from '../database/model.js';

export default {
  getMe: async (req, res) => {
    const userId = req.session.user_id;

    let user;
    try {
      user = await User.findByPk(userId);
    } catch (err) {
      console.log(err);
    }
    console.log('me route');
    console.log(user);

    if (!user) {
      console.log('me failed');
      res.status(404).send({
        message: 'user was not found!',
      });
    } else {
      console.log('me success');
      res.status(200).send({
        message: 'user found',
        user: user,
      });
    }
  },
  editMe: async (req, res) => {
    console.log('edit me route');
    const userId = req.session.user_id;
    console.log(userId);
    // console.log(req.body);
    const editUser = req.body;
    console.log('editUser:');
    console.log(editUser);

    try {
      await User.update(
        { ...editUser },
        {
          where: {
            user_id: userId,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }

    res.status(200).send({
      message: 'your information has been updated successfully',
      user: editUser,
    });
  },
  deleteMe: async (req, res) => {
    const { password } = req.params;

    try {
      // TODO - send alerts to all workers subscribed to your jobs
      // TODO - Delete all jobs associated with this user
      const userToDelete = await User.findByPk(req.session.user_id);
      if (userToDelete.password === password) {
        let propertiesToDelete;
        propertiesToDelete = await userToDelete.getProperties();
        await Promise.all(
          propertiesToDelete.map(async (prop) => {
            await Job.destroy({
              where: {
                property_id: prop.property_id,
              },
            });
          })
        );

        // TODO - Delete all properties associated with this user
        await Property.destroy({
          where: {
            user_id: req.session.user_id,
          },
        });
        await User.destroy({
          where: {
            user_id: req.session.user_id,
          },
        });
      }

      req.session.destroy();
      res.status(200).send({
        success: true,
        message: 'your account has been successfully deleted',
        redirectUri: '/',
      });
    } catch (err) {
      console.log(err);
    }
  },
  getWorkers: async (req, res) => {
    console.log('== Get Workers Route ==');

    try {
      const workers = await User.findAll({
        where: {
          role: 'worker',
        },
      });
      res.status(200).send({
        success: true,
        message: 'workers successfully retrieved',
        workers: workers,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getWorker: async (req, res) => {
    console.log('== Get Worker Route ==');
    console.log(req.params.job_id);
    try {
      const job = await Job.findByPk(req.params.job_id);
      const worker = await User.findOne({
        where: {
          user_id: job.subscribed,
        },
      });
      res.status(200).send({
        success: true,
        message: 'worker successfully retrieved',
        worker: worker,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
