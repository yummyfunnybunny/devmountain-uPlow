import { User, Customer, Worker } from '../database/model.js';

export default {
  signup: async (req, res) => {
    const { firstName, lastName, email, phone, password, confirmPassword, role } = req.body;

    // TODO - data validation
    // - check that email doesnt already exist

    let newUser;
    try {
      // add user to DB
      newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        role: role,
      });

      // set session to user ID
      req.session.user_id = newUser.user_id;
    } catch (err) {
      console.log(err);
    }

    // Send Response
    res.status(201).send({
      success: true,
      user: newUser,
      message: "you've successfully created a new account!",
      redirectUri: '/dashboard',
    });
  },
  login: async (req, res) => {
    console.log('login route');
    const { email, password } = req.body;

    let user;
    try {
      user = await User.findOne({
        where: { email: email },
      });

      if (!user || user.password != password) {
        console.log('user or password do not matching or invalid');
        res.status(400).send({
          message: 'Invalid login info. Please try again.',
        });
        return;
      }
      req.session.user_id = user.user_id;
      res.status(200).send({
        success: true,
        user: user,
        message: 'login successful!',
        redirectUri: '/dashboard',
      });
    } catch (err) {
      console.log(err);
    }
  },
  logout: async (req, res) => {
    // console.log('- Logout Route -');
    if (req.session.user_id) {
      req.session.destroy();

      res.status(200).send({
        message: 'You have successfully logged out',
      });
    }
  },
  changePassword: async (req, res) => {
    console.log('change password route');
    console.log(req.body);
    const { oldPassword, newPassword } = req.body;
    const userId = req.session.user_id;

    let user;
    try {
      user = await User.findByPk(userId);
      if (oldPassword === user.password) {
        await User.update(
          { password: newPassword },
          {
            where: {
              user_id: userId,
            },
          }
        );
      } else {
        res.status(400).send({
          success: false,
          message: 'password info incorrect. please try again',
        });
      }
      res.status(200).send({
        success: true,
        message: 'updated your password successfully',
      });
    } catch (err) {
      console.log(err);
    }
  },
  loginRequired: (req, res, next) => {
    console.log('login required route');
    // console.log(req.session);
    if (!req.session.user_id) {
      res.status(401).send({ error: 'Unauthorized' });
    } else {
      next();
    }
  },
  isLoggedIn: async (req, res) => {
    console.log('=== is logged in route ==');
    if (!req.session.user_id) {
      res.status(401).send({ error: 'Unauthorized' });
    } else {
      res.status(200).send({
        success: true,
        message: 'Authorized',
      });
    }
  },
};
