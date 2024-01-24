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
    const newUser = req.body;
    console.log('newUser:');
    // console.log(newUser);

    try {
      await User.update(
        { ...newUser },
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
      user: newUser,
    });
  },
  deleteMe: async (req, res) => {
    const { password } = req.params;

    try {
      // TODO - send alerts to all workers subscribed to your jobs
      // TODO - Delete all jobs associated with this user
      // TODO - Delete all properties associated with this user
      const userToDelete = await User.findByPk(req.session.user_id);
      if (userToDelete.password === password) {
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
};
