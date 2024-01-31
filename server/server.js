// ANCHOR -- Imports
import express from 'express';
import session from 'express-session';
import ViteExpress from 'vite-express';
import dotenv from 'dotenv';
import authCtrl from './controllers/authCtrl.js';
import userCtrl from './controllers/userCtrl.js';
import propertyCtrl from './controllers/propertyCtrl.js';
import jobCtrl from './controllers/jobCtrl.js';
import alertCtrl from './controllers/alertCtrl.js';

// ANCHOR -- Initializers
const app = express();
// const port = '8000';
dotenv.config();
const { PORT } = process.env;
// ViteExpress.config({ printViteDevServerHost: true });

// ANCHOR -- Middle-Ware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'uplowRocks$69', saveUninitialized: true, resave: false }));

// SECTION -- Route Handlers

// ANCHOR -- Auth
const { signup, login, logout, changePassword, loginRequired, isLoggedIn } = authCtrl;
app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', loginRequired, logout);
app.post('/changePassword', loginRequired, changePassword);
app.get('/isLoggedIn', isLoggedIn);

// ANCHOR -- Users
const { getMe, editMe, deleteMe, getWorkers, getWorker } = userCtrl;
app.get('/me', loginRequired, getMe);
app.put('/me', loginRequired, editMe);
app.delete('/me/:password', loginRequired, deleteMe);
app.get('/workers', loginRequired, getWorkers);
app.get('/workerByjob/:job_id', loginRequired, getWorker);

// ANCHOR -- Properties
const { myProperties, getPropertyBySubscription, createProperty, editProperty, deleteProperty } = propertyCtrl;
app.get('/properties', loginRequired, myProperties);
app.get('/propertyBySubscription/:job_id', loginRequired, getPropertyBySubscription);
app.post('/properties', loginRequired, createProperty);
app.put('/properties', loginRequired, editProperty);
app.delete('/properties/:property_id', loginRequired, deleteProperty);

// ANCHOR -- Jobs
const {
  myJobs,
  availableJobs,
  createJob,
  updateJob,
  deleteJob,
  getSubscriptions,
  unsubscribeWorker,
  myJobsWithProperties,
  acceptJobOffer,
} = jobCtrl;
app.get('/myJobs', loginRequired, myJobs);
app.get('/myJobsWithProperties', loginRequired, myJobsWithProperties);
app.get('/availableJobs', loginRequired, availableJobs);
app.post('/jobs', loginRequired, createJob);
app.put('/jobs', loginRequired, updateJob);
app.put('/unsubscribeWorker/:job_id', loginRequired, unsubscribeWorker);
app.delete('/jobs/:job_id', loginRequired, deleteJob);
app.get('/mySubscriptions/:user_id', loginRequired, getSubscriptions);
app.put('/acceptJobOffer', loginRequired, acceptJobOffer);

// ANCHOER -- Alerts
const { myAlerts, requestWorker, requestJob } = alertCtrl;
app.get('/myAlerts', loginRequired, myAlerts);
app.post('/requestWorker', loginRequired, requestWorker);
app.post('/requestJob', loginRequired, requestJob);

// !SECTION

// ANCHOR -- Run Server
ViteExpress.listen(app, PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
