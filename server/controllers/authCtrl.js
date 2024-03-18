import { User, Customer, Worker } from '../database/model.js';
import axios from 'axios';
// const openWeatherKey = import.meta.env.VITE_REACT_APP_OPENWEATHER_KEY;
import dotenv from 'dotenv';

dotenv.config();
const { OPENWEATHER_KEY } = process.env;

export default {
  signup: async (req, res) => {
    // const { firstName, lastName, email, phone, password, confirmPassword, role } = req.body;
    // console.log(req.body);

    // TODO - data validation
    // - check that email doesnt already exist

    let newUser;
    try {
      // add user to DB
      newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        password: req.body.password,
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
      // redirectUri: '/dashboard',
      toast: {
        color: 'green',
        message: 'Your account has been created!',
      },
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
        // redirectUri: '/dashboard',
        toast: {
          color: 'green',
          message: 'You have successfully logged in!',
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
  logout: async (req, res) => {
    console.log('- Logout Route -');
    if (req.session.user_id) {
      req.session.destroy();
      console.log(req.session);

      res.status(200).send({
        message: 'You have successfully logged out',
        toast: {
          color: 'green',
          message: 'You have successfully logged out!',
        },
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
          toast: {
            color: 'red',
            message: 'The password info you entered was incorrect. Please try again.',
          },
        });
      }
      res.status(200).send({
        success: true,
        message: 'updated your password successfully',
        toast: {
          color: 'green',
          message: 'You have successfully updated your password!',
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
  loginRequired: (req, res, next) => {
    console.log('== login required route ==');
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
      try {
        const user = await User.findByPk(req.session.user_id);
        res.status(200).send({
          success: true,
          message: 'Authorized',
          user: user,
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  getWeather: async (req, res) => {
    console.log('== GET WEATHER ROUTE ==');
    const { latitude, longitude } = req.params;
    try {
      const weather = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_KEY}`
      );
      console.log(weather);
      res.status(200).send({
        weather: weather,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
