// ANCHOR -- Imports
import express from 'express';
import session from 'express-session';
import ViteExpress from 'vite-express';
import dotenv from 'dotenv';
import authCtrl from './controllers/authCtrl.js';
import userCtrl from './controllers/userCtrl.js';
import propertyCtrl from './controllers/propertyCtrl.js';
import jobCtrl from './controllers/jobCtrl.js';

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
const { signup, login, logout, changePassword, loginRequired } = authCtrl;
app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', loginRequired, logout);
app.post('/changePassword', loginRequired, changePassword);

// ANCHOR -- Users
const { getMe, editMe, deleteMe } = userCtrl;
app.get('/me', loginRequired, getMe);
app.post('/me', loginRequired, editMe);
app.delete('/me/:password', loginRequired, deleteMe);

// ANCHOR -- Properties
const { myProperties, createProperty, editProperty, deleteProperty } = propertyCtrl;
app.get('/properties', loginRequired, myProperties);
app.post('/properties', loginRequired, createProperty);
app.put('/properties', loginRequired, editProperty);
app.delete('/properties/:property_id', loginRequired, deleteProperty);

// ANCHOR -- Jobs
const { myJobs, createJob, updateJob, deleteJob } = jobCtrl;
app.get('/myJobs', loginRequired, myJobs);
app.post('/jobs', loginRequired, createJob);
app.put('/jobs', loginRequired, updateJob);
app.delete('/jobs/:job_id', loginRequired, deleteJob);

// !SECTION

// ANCHOR -- Run Server
ViteExpress.listen(app, PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
