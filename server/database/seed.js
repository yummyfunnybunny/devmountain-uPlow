import { Customer, Worker, WorkerService, Property, Job, Service, Alert, Message, db } from './model.js';
import customerData from '../database/_mock_customerData.json' assert { type: 'json' };
import workerData from '../database/_mock_workerData.json' assert { type: 'json' };
import workerServiceData from '../database/_mock_workerServiceData.json' assert { type: 'json' };
import propertyData from '../database/_mock_propertyData.json' assert { type: 'json' };
import jobData from '../database/_mock_jobData.json' assert { type: 'json' };

// ANCHOR -- Sync Database
await db.sync({ force: true });
console.log('Started seeding!');

// ANCHOR -- Add Customers
await Promise.all(
  customerData.map(async (customer) => {
    const { firstName, lastName, email, password, phone, profilePicture } = customer;

    await Customer.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      profilePicture: profilePicture,
    });
  })
);

// ANCHOR -- Add Workers

// ANCHOR -- Add WorkerServices

// ANCHOR -- Add Properties

// ANCHOR -- Add Jobs

// ANCHOR -- Add Services

// ANCHOR -- Add Alerts

// ANCHOR -- Add Messages

// ANCHOR -- close the database
await db.close();
console.log('Finished seeding!');
