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
// const { VITE_REACT_APP_ROOT } = process.env;
const root = process.env.VITE_REACT_APP_ROOT;
const { PORT } = process.env;
console.log('ROOT:');
console.log(root);
// ViteExpress.config({ printViteDevServerHost: true });

// ANCHOR -- Middle-Ware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'uplowRocks$69', saveUninitialized: true, resave: false }));

// SECTION -- Route Handlers

// ANCHOR -- Auth
const { signup, login, logout, changePassword, loginRequired, isLoggedIn, getWeather } = authCtrl;
app.post(`${root}/signup`, signup);
app.post(`${root}/login`, login);
app.get(`${root}/logout`, loginRequired, logout);
app.post(`${root}/changePassword`, loginRequired, changePassword);
app.get(`${root}/isLoggedIn`, isLoggedIn);
app.get(`${root}/weather/:latitude/:longitude`, loginRequired, getWeather);

// ANCHOR -- Users
const { getMe, editMe, deleteMe, getWorkers, getWorker } = userCtrl;
app.get(`${root}/me`, loginRequired, getMe);
app.put(`${root}/me`, loginRequired, editMe);
app.delete(`${root}/me/:password`, loginRequired, deleteMe);
app.get(`${root}/workers`, loginRequired, getWorkers);
app.get(`${root}/workerByjob/:job_id`, loginRequired, getWorker);

// ANCHOR -- Properties
const { myProperties, getPropertyBySubscription, createProperty, editProperty, deleteProperty } = propertyCtrl;
app.get(`${root}/properties`, loginRequired, myProperties);
app.get(`${root}/propertyBySubscription/:job_id`, loginRequired, getPropertyBySubscription);
app.post(`${root}/properties`, loginRequired, createProperty);
app.put(`${root}/properties`, loginRequired, editProperty);
app.delete(`${root}/properties/:property_id`, loginRequired, deleteProperty);

// ANCHOR -- Jobs
const {
  myJobs,
  availableJobs,
  createJob,
  updateJob,
  deleteJob,
  getSubscriptions,
  unsubscribeWorker,
  unsubscribeFromJob,
  myJobsWithProperties,
  acceptJobOffer,
  acceptServiceOffer,
} = jobCtrl;
app.get(`${root}/myJobs`, loginRequired, myJobs);
app.get(`${root}/myJobsWithProperties`, loginRequired, myJobsWithProperties);
app.get(`${root}/availableJobs`, loginRequired, availableJobs);
app.post(`${root}/jobs`, loginRequired, createJob);
app.put(`${root}/jobs`, loginRequired, updateJob);
app.put(`${root}/unsubscribeWorker/:job_id`, loginRequired, unsubscribeWorker);
app.put(`${root}/unsubscribeFromJob/:job_id`, loginRequired, unsubscribeFromJob);
app.delete(`${root}/jobs/:job_id`, loginRequired, deleteJob);
app.get(`${root}/mySubscriptions/:user_id`, loginRequired, getSubscriptions);
app.put(`${root}/acceptJobOffer`, loginRequired, acceptJobOffer);
app.put(`${root}/acceptWorkerOffer`, loginRequired, acceptServiceOffer);

// ANCHOER -- Alerts
const { myAlerts, requestWorker, requestJob, rejectRequestWorker, rejectRequestJob, deleteAlert } = alertCtrl;
app.get(`${root}/myAlerts`, loginRequired, myAlerts);
app.post(`${root}/requestWorker`, loginRequired, requestWorker);
app.post(`${root}/requestJob`, loginRequired, requestJob);
app.delete(`${root}/rejectRequestWorker/:alert_id`, loginRequired, rejectRequestWorker);
app.delete(`${root}/rejectRequestJob/:alert_id`, loginRequired, rejectRequestJob);
app.delete(`${root}/deleteAlert/:alert_id`, loginRequired, deleteAlert);

// !SECTION

// ANCHOR -- Run Server
ViteExpress.listen(app, PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
