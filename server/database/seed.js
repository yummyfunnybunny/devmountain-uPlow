import { Customer, Worker, WorkerService, Property, Job, Service, Alert, Message, db } from './model.js';

// ANCHOR -- Sync Database
await db.sync({ force: true });

// ANCHOR -- Add Customers

// ANCHOR -- Add Workers

// ANCHOR -- Add WorkerServices

// ANCHOR -- Add Properties

// ANCHOR -- Add Jobs

// ANCHOR -- Add Services

// ANCHOR -- Add Alerts

// ANCHOR -- Add Messages

// ANCHOR -- close the database
await db.close();
