import { User, Customer, Worker, WorkerService, Property, Job, Service, Alert, Message, db } from './model.js';
import userData from '../database/_mock_userData.json' assert { type: 'json' };
import customerData from '../database/_mock_customerData.json' assert { type: 'json' };
import workerData from '../database/_mock_workerData.json' assert { type: 'json' };
import workerServiceData from '../database/_mock_workerServiceData.json' assert { type: 'json' };
import propertyData from '../database/_mock_propertyData.json' assert { type: 'json' };
import jobData from '../database/_mock_jobData.json' assert { type: 'json' };

// ANCHOR -- Sync Database
await db.sync({ force: true });
console.log('Started seeding!');

// ANCHOR -- Add Users
await Promise.all(
  userData.map(async (user) => {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      street,
      city,
      state,
      zipcode,
      coordinates,
      role,
      profilePicture,
    } = user;

    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      coordinates: coordinates,
      role: role,
      profilePicture: profilePicture,
    });
  })
);

// ANCHOR -- Add Customers
// await Promise.all(
//   customerData.map(async (customer) => {
//     const { firstName, lastName, email, password, phone, profilePicture } = customer;

//     await Customer.create({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: password,
//       phone: phone,
//       profilePicture: profilePicture,
//     });
//   })
// );

// ANCHOR -- Add Workers

// ANCHOR -- Add WorkerServices

// ANCHOR -- Add Properties
await Promise.all(
  propertyData.map(async (property) => {
    const { name, picture, street, city, state, zipcode, coordinates, user_id } = property;

    await Property.create({
      name: name,
      picture: picture,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      coordinates: coordinates,
      user_id: user_id,
    });
  })
);

// ANCHOR -- Add Jobs
await Promise.all(
  jobData.map(async (job) => {
    const { jobType, jobSize, pictures, coordinates, instructions, subscribed, property_id } = job;

    await Job.create({
      jobType: jobType,
      jobSize: jobSize,
      pictures: pictures,
      coordinates: coordinates,
      instructions: instructions,
      subscribed: subscribed,
      property_id: property_id,
    });
  })
);

// ANCHOR -- Add Services

// ANCHOR -- Add Alerts

// ANCHOR -- Add Messages

// ANCHOR -- close the database
await db.close();
console.log('Finished seeding!');
