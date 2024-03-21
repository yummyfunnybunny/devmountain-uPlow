import '../../styles/components/modal.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { StateDropdown } from '../../../scripts/forms.jsx';

const root = import.meta.env.VITE_REACT_APP_ROOT;
const mapboxToken = import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN;

function Modal() {
  // INITS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SELECTORS
  const reduxModal = useSelector((state) => state.modalReducer.modalType);
  const reduxUser = useSelector((state) => state.loggedInReducer);
  const reduxProperty = useSelector((state) => state.propertyReducer);
  const reduxJob = useSelector((state) => state.jobReducer);
  const reduxWorker = useSelector((state) => state.workerReducer);
  const reduxAlert = useSelector((state) => state.alertReducer);

  // STATE VARIABLES
  const [myJobs, setMyJobs] = useState([]);
  console.log(myJobs);
  const [jobToRequestWorker, setJobToRequestWorker] = useState('');
  const [user, setUser] = useState({
    firstName: reduxUser.firstName,
    lastName: reduxUser.lastName,
    email: reduxUser.email,
    phone: reduxUser.phone,
    street: reduxUser.phone,
    city: reduxUser.city,
    state: reduxUser.state,
    zipcode: reduxUser.zipcode,
    password: '',
    confirmPassword: '',
    oldPassword: '',
    newPassword: '',
  });

  const [newProperty, setNewProperty] = useState({
    name: 'poop',
    street: '596 main st',
    city: 'contoocook',
    state: 'NH',
    zipcode: '03229',
    picture: '',
  });
  const [editProperty, setEditProperty] = useState({
    property_id: reduxProperty.property_id,
    name: reduxProperty.name,
    street: reduxProperty.street,
    city: reduxProperty.city,
    state: reduxProperty.state,
    zipcode: reduxProperty.zipcode,
    picture: reduxProperty.picture,
  });
  const [newJob, setNewJob] = useState({
    jobType: '',
    jobSize: '',
    pictures: '',
    instructions1: '',
    instructions2: '',
    instructions3: '',
  });
  const [editJob, setEditJob] = useState({
    job_id: reduxJob.job_id,
    jobType: reduxJob.jobType,
    jobSize: reduxJob.jobSize,
    pictures: reduxJob.picture,
    instructions1: reduxJob.instructions[0],
    instructions2: reduxJob.instructions[1],
    instructions3: reduxJob.instructions[2],
  });
  console.log(newJob);

  useEffect(() => {
    axios
      .get(`${root}/myJobsWithProperties`)
      .then((res) => {
        setMyJobs(res.data.jobsWithProperties);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // update state handler
  const handleChange = (e, setState, state) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e, setState, state) => {
    console.log(e.target.files[0]);
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
  };

  // TODO - see if you can combine these two switch statements
  let newJobSizeMeasure = '';
  switch (newJob.jobType) {
    case 'driveway':
    case 'roof':
    case 'pond':
      newJobSizeMeasure = 'sq ft';
      break;
    case 'sidewalk':
    case 'walkway':
      newJobSizeMeasure = 'ft';
      break;
    case 'parking-lot':
      newJobSizeMeasure = 'spaces';
      break;
    default:
      newJobSizeMeasure = '';
      break;
  }
  let editJobSizeMeasure = '';
  switch (editJob.jobType) {
    case 'driveway':
    case 'roof':
    case 'pond':
      editJobSizeMeasure = 'sq ft';
      break;
    case 'sidewalk':
    case 'walkway':
      editJobSizeMeasure = 'ft';
      break;
    case 'parking-lot':
      editJobSizeMeasure = 'spaces';
      break;
    default:
      editJobSizeMeasure = '';
      break;
  }

  const submitLogout = (e) => {
    e.preventDefault();
    console.log('== submit logout == ');
    axios
      .get(`${root}/logout`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_LOGGED_IN' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
        navigate(`${root}/`);
      })
      .catch((err) => {
        console.log(err);
        // TODO - display error toast
      });
  };
  const submitEditAccount = (e) => {
    // console.log('submit edit account');
    e.preventDefault();

    const edittedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      street: user.street,
      city: user.city,
      state: user.state,
      zipcode: user.zipcode,
      user_id: user.user_id,
    };

    // build the address url for coordinate fetching
    const address = encodeURI(`${edittedUser.street} ${edittedUser.city} ${edittedUser.state} ${edittedUser.zipcode}`);
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${mapboxToken}`;

    // send the axios request:
    // 1 - to mapbox for the coordinates
    // 2 - to the backend
    axios
      .get(mapBoxUrl)
      .then((res) => {
        const coordinates = res.data.features[0].center;
        edittedUser.coordinates = coordinates;
        return axios.put(`${root}/me`, edittedUser);
      })
      .then((res) => {
        dispatch({ type: 'SET_LOGGED_IN', payload: { ...res.data.user } });
        dispatch({ type: 'NONE' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitChangePassword = (e) => {
    console.log('== submit change password ==');
    e.preventDefault();

    // TODO - form validation
    // check that old password matches new password

    const edittedUser = {
      ...user,
      oldPassword: user.oldPassword,
      newPassword: user.newPassword,
    };
    console.log(edittedUser);

    axios
      .post(`${root}/changePassword`, edittedUser)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'SET_TOAST', payload: err.response.data.toast });
      });
  };
  const submitDeleteAccount = (e) => {
    e.preventDefault();

    const deleteUser = {
      ...user,
      password: user.password,
      confirmPassword: user.confirmPassword,
    };

    if (deleteUser.password !== deleteUser.confirmPassword) {
      dispatch({ type: 'SET_TOAST', payload: { color: 'red', message: 'The passwords you entered do not match' } });
      return;
    }
    axios
      .delete(`${root}/me/${deleteUser.password}`)
      .then((res) => {
        dispatch({ type: 'RESET_LOGGED_IN' });
        dispatch({ type: 'NONE' });
        navigate(`${root}/`);
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'SET_TOAST', payload: err.response.data.toast });
      });
  };
  const submitCreateProperty = (e) => {
    console.log('== submit create property ==');
    e.preventDefault();

    // build formData object
    const createdProperty = new FormData();
    createdProperty.append('name', newProperty.name);
    createdProperty.append('street', newProperty.street);
    createdProperty.append('city', newProperty.city);
    createdProperty.append('state', newProperty.state);
    createdProperty.append('zipcode', newProperty.zipcode);
    createdProperty.append('picture', newProperty.picture);

    // build the URI to fetch the coordinates of the created property address
    const address = encodeURI(
      `${createdProperty.street} ${createdProperty.city} ${createdProperty.state} ${createdProperty.zipcode}`
    );
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${mapboxToken}`;

    // send axios request:
    // 1: first to mapbox to get the coordinates
    // 2: than to the backend with formData
    axios
      .get(mapBoxUrl)
      .then((res) => {
        const coordinates = res.data.features[0].center;
        createdProperty.append('coordinates', coordinates);
        return axios.post(`${root}/properties`, createdProperty, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      })
      .then((res) => {
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_PROPERTY' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        dispatch({ type: 'SET_TOAST', payload: { color: 'red', message: 'Something went wrong. Please try again.' } });
      });
  };
  const submitEditProperty = (e) => {
    e.preventDefault();

    // build formData object
    const editedProperty = new FormData();
    editedProperty.append('property_id', editProperty.property_id);
    editedProperty.append('name', editProperty.name);
    editedProperty.append('street', editProperty.street);
    editedProperty.append('city', editProperty.city);
    editedProperty.append('state', editProperty.state);
    editedProperty.append('zipcode', editProperty.zipcode);
    editedProperty.append('picture', editProperty.picture);

    // build the URI to fetch the coordinates of the created property address
    const address = encodeURI(
      `${editedProperty.street} ${editedProperty.city} ${editedProperty.state} ${editedProperty.zipcode}`
    );
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${mapboxToken}`;

    // send axios request:
    // 1: first to mapbox to get the coordinates
    // 2: than to the backend with formData
    axios
      .get(mapBoxUrl)
      .then((res) => {
        const coordinates = res.data.features[0].center;
        editedProperty.append('coordinates', coordinates);
        return axios.put(`${root}/properties`, editedProperty, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      })
      .then((res) => {
        dispatch({ type: 'RESET_PROPERTY' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
        dispatch({ type: 'NONE' });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'SET_TOAST', payload: { color: 'red', message: 'Something went wrong. Please try again.' } });
      });
  };
  const submitDeleteProperty = (e) => {
    e.preventDefault();

    const propertyId = reduxProperty.property_id;
    console.log(propertyId);

    axios
      .delete(`${root}/properties/${propertyId}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_PROPERTY' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'SET_TOAST', payload: { color: 'red', message: 'Something went wrong. Please try again.' } });
      });
  };
  const submitCreateJob = (e) => {
    console.log('== submit create job form ==');
    e.preventDefault();

    // format the instructions array
    const instructionsArray = [newJob.instructions1, newJob.instructions2, newJob.instructions3];

    // build formData object
    const createdJob = new FormData();
    createdJob.append('jobType', newJob.jobType);
    createdJob.append('jobSize', newJob.jobSize);
    createdJob.append('pictures', newJob.pictures);
    createdJob.append('instructions', instructionsArray);
    createdJob.append('coordinates', reduxProperty.coordinates);
    // createdJob.append('subscribed', null);
    createdJob.append('property_id', reduxProperty.property_id);

    // send the axios request
    axios
      .post(`${root}/jobs`, createdJob, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitEditJob = (e) => {
    e.preventDefault();

    // format the instructions array
    const instructionsArray = [editJob.instructions1, editJob.instructions2, editJob.instructions3];

    // build formData object
    const editedJob = new FormData();
    editedJob.append('job_id', editJob.job_id);
    editedJob.append('jobType', editJob.jobType);
    editedJob.append('jobSize', editJob.jobSize);
    editedJob.append('pictures', editJob.pictures);
    editedJob.append('instructions', instructionsArray);
    // editedJob.append('coordinates', reduxProperty.coordinates);
    // editedJob.append('subscribed', editJob.sunscribed);
    editedJob.append('property_id', reduxJob.property_id);

    console.log(editedJob);

    // const jobObject = {
    //   ...editJob,
    //   jobType: editJob.jobType,
    //   jobSize: editJob.jobSize,
    //   // picture: 'img123',
    //   instructions: instructionsArray,
    // };

    axios
      .put(`${root}/jobs`, editedJob, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch({
          type: 'SET_JOB',
          payload: {
            ...editedJob,
          },
        });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
        dispatch({ type: 'NONE' });
      })
      .catch((err) => {
        console.lo(err);
      });
  };
  const submitDeleteJob = (e) => {
    e.preventDefault();

    console.log(reduxJob.job_id);
    // const jobId = reduxJob.job_id;

    axios
      .delete(`${root}/jobs/${reduxJob.job_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_JOB' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitUnsubscribeWorker = (e) => {
    e.preventDefault();
    console.log('submitUnsubscribeWorker');
    console.log(reduxJob.job_id);

    axios
      .put(`${root}/unsubscribeWorker/${reduxJob.job_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_JOB' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitUnsubscribeFromJob = (e) => {
    e.preventDefault();

    axios
      .put(`${root}/unsubscribeFromJob/${reduxJob.job_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_JOB' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitRequestWorker = (e) => {
    // Customer => Requests => Worker
    e.preventDefault();
    console.log('submitting a request for work!!!!');
    // console.log(jobToRequestWorker.jobSize);
    const job = myJobs[jobToRequestWorker];
    job.recipient_id = reduxWorker.user_id;
    console.log(job);
    axios
      .post(`${root}/requestWorker`, job)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_WORKER' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitAcceptRequestWorker = (e) => {
    // Worker => Accepts => Customer Offer
    e.preventDefault();
    axios
      .put(`${root}/acceptJobOffer`, reduxAlert)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_ALERT' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitRejectRequestWorker = (e) => {
    e.preventDefault();
    axios
      .delete(`${root}/rejectRequestWorker/${reduxAlert.alert_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_ALERT' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitRequestJob = (e) => {
    e.preventDefault();

    axios
      .post(`${root}/requestJob`, reduxJob)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_WORKER' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitDismissAlert = (e) => {
    e.preventDefault();
    console.log();

    axios
      .delete(`${root}/deleteAlert/${reduxAlert.alert_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_ALERT' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitAcceptRequestJob = (e) => {
    // Customer => Accepts => Worker Offer
    e.preventDefault();

    axios
      .put(`${root}/acceptWorkerOffer`, reduxAlert)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_ALERT' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitRejectRequestJob = (e) => {
    e.preventDefault();
    axios
      .delete(`${root}/rejectRequestJob/${reduxAlert.alert_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_ALERT' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let modalContent;
  switch (reduxModal) {
    case 'LOGOUT':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitLogout(e)}>
          <div className='modal__row'>
            <h2 className='section__subheader'>Are you sure you want to logout?</h2>
          </div>
          <div className='modal__row'>
            <button className='btn btn__success btn--md' type='submit'>
              Logout
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'EDIT_ACCOUNT':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitEditAccount(e)}>
          <div className='form__row'>
            <h2 className='section__subheader'>Edit Account Info</h2>
          </div>

          {/* FIRST NAME */}
          <div className='form__row'>
            <label className='form__label'>First Name:&emsp;</label>
            <input
              className='form__input'
              name='firstName'
              defaultValue={reduxUser.firstName}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>

          {/* LAST NAME */}
          <div className='form__row'>
            <label className='form__label'>Last Name:&emsp;</label>
            <input
              className='form__input'
              name='lastName'
              defaultValue={reduxUser.lastName}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>

          {/* EMAIL */}
          <div className='form__row'>
            <label className='form__label'>Email Name:&emsp;</label>
            <input
              className='form__input'
              name='email'
              defaultValue={reduxUser.email}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>

          {/* PHONE */}
          <div className='form__row'>
            <label className='form__label'>Phone Name:&emsp;</label>
            <input
              className='form__input'
              name='phone'
              defaultValue={reduxUser.phone}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>

          {/* STREET */}
          <div className='form__row'>
            <label className='form__label' htmlFor='street'>
              Street:&emsp;
            </label>
            <input
              id='street'
              name='street'
              className='form__input'
              defaultValue={reduxUser.street}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>

          {/* CITY */}
          <div className='form__row'>
            <label className='form__label' htmlFor='city'>
              City:&emsp;
            </label>
            <input
              id='city'
              name='city'
              className='form__input'
              defaultValue={reduxUser.city}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>

          {/* STATE */}
          <div className='form__row'>
            <label className='form__label' htmlFor='state'>
              State:&emsp;
            </label>
            <input
              id='state'
              name='state'
              className='form__input'
              defaultValue={reduxUser.state}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>

          {/* ZIPCODE */}
          <div className='form__row'>
            <label className='form__label' htmlFor='zipcode'>
              Zipcode:&emsp;
            </label>
            <input
              id='zipcode'
              name='zipcode'
              className='form__input'
              defaultValue={reduxUser.zipcode}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>

          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__success btn--md' type='submit'>
              Submit
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'CHANGE_PASSWORD':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitChangePassword(e)}>
          <div className='form__row'>
            <h2 className='section__subheader'>Edit Password</h2>
          </div>

          {/* OLD PASSWORD */}
          <div className='form__row'>
            <label className='form__label'>Current Password:&emsp;</label>
            <input
              className='form__input'
              type='password'
              name='oldPassword'
              defaultValue={user.oldPassword}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>

          {/* NEW PASSWORD */}
          <div className='form__row'>
            <label className='form__label'>New Password:&emsp;</label>
            <input
              className='form__input'
              type='password'
              name='newPassword'
              defaultValue={user.newPassword}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>
          <div className='form__row'>
            <button className='btn btn__success btn--md' type='submit'>
              Submit
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'DELETE_ACCOUNT':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitDeleteAccount(e)}>
          <div className='form__row'>
            <h2 className='section__subheader'>Are you sure you want to delete yout account?</h2>
          </div>

          <div className='form__row'>
            <p className='form__extra-text'>
              Deleting your account will permanently delete all of your properties and jobs
            </p>
          </div>
          {/* PASSWORD */}
          <div className='form__row'>
            <label className='form__label'>Password:&emsp;</label>
            <input
              className='form__input'
              type='password'
              name='password'
              defaultValue={user.password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className='form__row'>
            <label className='form__label'>Confirm Password:&emsp;</label>
            <input
              className='form__input'
              type='password'
              name='confirmPassword'
              defaultValue={user.confirmPassword}
              // onChange={(e) => setConfirmPassword(e.target.value)}
              onChange={(e) => handleChange(e, setUser, user)}
            ></input>
          </div>
          <div className='form__row'>
            <button className='btn btn__warning btn--md' type='submit'>
              Delete
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'CREATE_PROPERTY':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitCreateProperty(e)}>
          <div className='form__row'>
            <h2>Create New Property</h2>
          </div>
          {/* PROPERTY NAME */}
          <div className='form__row'>
            <label className='form__label'>Property Name:&emsp;</label>
            <input
              className='form__input'
              name='name'
              required
              defaultValue={newProperty.name}
              onChange={(e) => handleChange(e, setNewProperty, newProperty)}
            ></input>
          </div>

          {/* STREET */}
          <div className='form__row'>
            <label className='form__label'>Street Address:&emsp;</label>
            <input
              className='form__input'
              name='street'
              required
              defaultValue={newProperty.street}
              onChange={(e) => handleChange(e, setNewProperty, newProperty)}
            ></input>
          </div>

          {/* CITY */}
          <div className='form__row'>
            <label className='form__label'>City:&emsp;</label>
            <input
              className='form__input'
              name='city'
              required
              defaultValue={newProperty.city}
              onChange={(e) => handleChange(e, setNewProperty, newProperty)}
            ></input>
          </div>

          {/* STATE */}
          <div className='form__row'>
            <label className='form__label'>State:&emsp;</label>
            <select
              className='form__input'
              name='state'
              required
              // defaultValue=''
              onChange={(e) => handleChange(e, setNewProperty, newProperty)}
            >
              <StateDropdown />
            </select>
          </div>

          {/* ZIPCODE */}
          <div className='form__row'>
            <label className='form__label'>Zipcode:&emsp;</label>
            <input
              className='form__input'
              name='zipcode'
              required
              maxLength='5'
              defaultValue={newProperty.zipcode}
              onChange={(e) => handleChange(e, setNewProperty, newProperty)}
            ></input>
          </div>

          {/* PICTURE */}
          <div className='form__row'>
            <label className='form__label'>Property Image:&emsp;</label>
            <input
              className='form__input'
              name='picture'
              type='file'
              accept='.png, .jpeg, .jpg'
              onChange={(e) => handleFileChange(e, setNewProperty, newProperty)}
            ></input>
          </div>

          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__success btn--md' type='submit'>
              Submit
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'EDIT_PROPERTY':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitEditProperty(e)}>
          <div className='form__row'>
            <h2>Edit Property</h2>
          </div>

          {/* PROPERTY NAME */}
          <div className='form__row'>
            <label className='form__label'>Property Name:&emsp;</label>
            <input
              className='form__input'
              name='name'
              required
              defaultValue={reduxProperty.name}
              onChange={(e) => handleChange(e, setEditProperty, editProperty)}
            ></input>
          </div>

          {/* STREET */}
          <div className='form__row'>
            <label className='form__label'>Street Address:&emsp;</label>
            <input
              className='form__input'
              name='street'
              required
              defaultValue={reduxProperty.street}
              onChange={(e) => handleChange(e, setEditProperty, editProperty)}
            ></input>
          </div>

          {/* CITY */}
          <div className='form__row'>
            <label className='form__label'>City:&emsp;</label>
            <input
              className='form__input'
              name='city'
              required
              defaultValue={reduxProperty.city}
              onChange={(e) => handleChange(e, setEditProperty, editProperty)}
            ></input>
          </div>

          {/* STATE */}
          <div className='form__row'>
            <label className='form__label'>State:&emsp;</label>
            <input
              className='form__input'
              name='state'
              required
              maxLength='2'
              defaultValue={reduxProperty.state}
              onChange={(e) => handleChange(e, setEditProperty, editProperty)}
            ></input>
          </div>

          {/* ZIPCODE */}
          <div className='form__row'>
            <label className='form__label'>Zipcode:&emsp;</label>
            <input
              className='form__input'
              name='zipcode'
              required
              maxLength='5'
              defaultValue={reduxProperty.zipcode}
              onChange={(e) => handleChange(e, setEditProperty, editProperty)}
            ></input>
          </div>

          {/* PICTURE */}
          <div className='form__row'>
            <label className='form__label'>Property Image:&emsp;</label>
            <input
              className='form__input'
              name='picture'
              type='file'
              accept='.png, .jpeg, .jpg'
              onChange={(e) => handleFileChange(e, setEditProperty, editProperty)}
            ></input>
          </div>

          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__success btn--md' type='submit'>
              Submit
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'DELETE_PROPERTY':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitDeleteProperty(e)}>
          <div className='form__row'>
            <h2>Delete Property</h2>
          </div>
          <div className='form__row'>
            <p>
              Are you sure you want to delete this property? all jobs associaited with this property will also be
              deleted
            </p>
          </div>
          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__warning btn--md' type='submit'>
              Delete
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'CREATE_JOB':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitCreateJob(e)}>
          <div className='form__row'>
            <h2>Create New Job</h2>
          </div>
          {/* JOB TYPE */}
          <div className='form__row'>
            <label className='form__label'>Job Type:&emsp;</label>
            <select
              className='form__input'
              name='jobType'
              defaultValue={newJob.jobType}
              onChange={(e) => handleChange(e, setNewJob, newJob)}
            >
              <option value='' disabled>
                - choose type -
              </option>
              <option value='driveway'>Driveway</option>
              <option value='parking-lot'>Parking Lot</option>
              <option value='sidewalk'>Sidewalk</option>
              <option value='walkway'>Walkway</option>
              <option value='roof'>Roof</option>
              <option value='pond'>Pond</option>
            </select>
          </div>

          {/* JOB SIZE */}
          <div className='form__row'>
            <label className='form__label'>Job Size-({newJobSizeMeasure}):&emsp;</label>
            <input
              className='form__input'
              name='jobSize'
              required
              defaultValue={newJob.jobSize}
              onChange={(e) => handleChange(e, setNewJob, newJob)}
            ></input>
          </div>

          {/* PICTURE */}
          <div className='form__row'>
            <label className='form__label'>Add Picture:&emsp;</label>
            <input
              className='form__input'
              name='pictures'
              type='file'
              accept='.png, .jpeg, .jpg'
              // defaultValue={newJob.pictures}
              onChange={(e) => handleFileChange(e, setNewJob, newJob)}
            ></input>
          </div>

          {/* INSTRUCTIONS */}
          <label className='form__subheader'>Instructions:&emsp;</label>
          <div className='form__row'>
            <input
              className='form__input'
              name='instructions1'
              defaultValue={newJob.instructions1}
              onChange={(e) => handleChange(e, setNewJob, newJob)}
            ></input>
          </div>
          <div className='form__row'>
            <input
              className='form__input'
              name='instructions2'
              defaultValue={newJob.instructions2}
              onChange={(e) => handleChange(e, setNewJob, newJob)}
            ></input>
          </div>
          <div className='form__row'>
            <input
              className='form__input'
              name='instructions3'
              defaultValue={newJob.instructions3}
              onChange={(e) => handleChange(e, setNewJob, newJob)}
            ></input>
          </div>

          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__success btn--md' type='submit'>
              Create Job
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'EDIT_JOB':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitEditJob(e)}>
          <div className='form__row'>
            <h2>Edit Job</h2>
          </div>
          {/* JOB TYPE */}
          <div className='form__row'>
            <label className='form__label'>Job Type:&emsp;</label>
            <select
              className='form__input'
              name='jobType'
              defaultValue={editJob.jobType}
              onChange={(e) => handleChange(e, setEditJob, editJob)}
            >
              <option disabled>- choose type -</option>
              <option value='driveway'>Driveway</option>
              <option value='parking-lot'>Parking Lot</option>
              <option value='sidewalk'>Sidewalk</option>
              <option value='walkway'>Walkway</option>
              <option value='roof'>Roof</option>
              <option value='pond'>Pond</option>
            </select>
          </div>

          {/* JOB SIZE */}
          <div className='form__row'>
            <label className='form__label'>Job Size-({editJobSizeMeasure}):&emsp;</label>
            <input
              className='form__input'
              name='jobSize'
              defaultValue={editJob.jobSize}
              onChange={(e) => handleChange(e, setEditJob, editJob)}
            ></input>
          </div>

          {/* PICTURES */}
          <div className='form__row'>
            <label className='form__label' name='picture'>
              Add Picture:&emsp;
            </label>
            <input
              className='form__input'
              name='pictures'
              type='file'
              accept='.png, .jpeg, .jpg'
              defaultValue={editJob.pictures}
              onChange={(e) => handleFileChange(e, setEditJob, editJob)}
            ></input>
          </div>

          {/* INSTRUCTIONS */}
          <label className='form__label'>Instructions:&emsp;</label>
          {/* <p className='form__label'>Separate individual instructions with a period.</p> */}
          <div className='form__row'>
            <input
              className='form__input'
              name='instructions1'
              defaultValue={editJob.instructions1}
              onChange={(e) => handleChange(e, setEditJob, editJob)}
            ></input>
          </div>
          <div className='form__row'>
            <input
              className='form__input'
              name='instructions2'
              defaultValue={editJob.instructions2}
              onChange={(e) => handleChange(e, setEditJob, editJob)}
            ></input>
          </div>
          <div className='form__row'>
            <input
              className='form__input'
              name='instructions3'
              defaultValue={editJob.instructions3}
              onChange={(e) => handleChange(e, setEditJob, editJob)}
            ></input>
          </div>

          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__success btn--md' type='submit'>
              Create Job
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'DELETE_JOB':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitDeleteJob(e)}>
          <div className='form__row'>
            <h2>Delete Job</h2>
          </div>
          <div className='form__row'>
            <p>Are you sure you want to delete this job?</p>
          </div>
          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__warning btn--md' type='submit'>
              Delete
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'UNSUBSCRIBE_WORKER':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitUnsubscribeWorker(e)}>
          <div className='form__row'>
            <h2>Unsubscribe Worker</h2>
          </div>
          <div className='form__row'>
            <p>Are you sure you want to unsubscribe the currently subscribed worker?</p>
          </div>
          <div className='form__row'>
            <p>We will send an alert to the worker to notify them that their services have been cancelled</p>
          </div>
          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__warning btn--md' type='submit'>
              Unsubscribe Worker
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'UNSUBSCRIBE_FROM_JOB':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitUnsubscribeFromJob(e)}>
          <div className='form__row'>
            <h2>Unsubscribe From Job</h2>
          </div>
          <div className='form__row'>
            <p>Are you sure you want to unsubscribe from this job?</p>
          </div>
          <div className='form__row'>
            <p>We will send an alert to the customer to notify them that you no longer wish to service their job</p>
          </div>
          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__warning btn--md' type='submit'>
              Unsubscribe
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'REQUEST_WORKER':
      // customer => requests => worker
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitRequestWorker(e)}>
          <div className='form__row'>
            <h2>Request Worker</h2>
          </div>
          <div className='form__row'>
            <p>Select the job you'd like to request this worker for:</p>
          </div>
          <div className='form__row'>
            <select defaultValue={jobToRequestWorker} onChange={(e) => setJobToRequestWorker(e.target.value)}>
              <option value='' disabled>
                Select Job
              </option>
              {myJobs
                ? myJobs.map((job, idx) => {
                    return (
                      <option key={job.job_id} value={idx}>
                        {job.Property.name} - {job.jobType}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__success btn--md' type='submit'>
              Request Work
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'ACCEPT_REQUEST_WORKER':
      // Worker => accepts => customer Offer
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitAcceptRequestWorker(e)}>
          <div className='form__row'>
            <h2>Accept Job Offer</h2>
          </div>
          <div className='form__row'>
            <p>Are you sure you want to accept this job offer?</p>
          </div>
          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__success btn--md' type='submit'>
              Accept Offer
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'COUNTER_REQUEST_WORKER':
      modalContent = <></>;
      break;
    case 'CUSTOMER_OFFER_REJECTED':
      // Worker => Rejects => Customer Offer
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitRejectRequestWorker(e)}>
          <div className='form__row'>
            <h2>Reject Job</h2>
          </div>
          <div className='form__row'>
            <p>Are you sure you want to reject this job offer</p>
          </div>
          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__warning btn--md' type='submit'>
              Reject Job
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'REQUEST_JOB':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitRequestJob(e)}>
          <div className='form__row'>
            <h2>Request Job</h2>
          </div>
          <div className='form__row'>
            <p>Are you sure you'd like to request this job?</p>
          </div>
          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__success btn--md' type='submit'>
              Request Job
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'ACCEPT_REQUEST_JOB':
      // Customer => accepts => Worker Offer
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitAcceptRequestJob(e)}>
          <div className='form__row'>
            <h2>Accept Service Offer</h2>
          </div>
          <div className='form__row'>
            <p>Are you sure you want to accept this service offer?</p>
          </div>
          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__success btn--md' type='submit'>
              Accept Offer
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'COUNTER_REQUEST_JOB':
      modalContent = <></>;
      break;
    case 'REJECT_REQUEST_JOB':
      // Customer => Rejects => Worker Offer
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitRejectRequestJob(e)}>
          <div className='form__row'>
            <h2>Reject Service Offer</h2>
          </div>
          <div className='form__row'>
            <p>Are you sure you want to reject this Service offer</p>
          </div>
          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__warning btn--md' type='submit'>
              Reject Job
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    case 'DISMISS_ALERT':
      modalContent = (
        <form className='form form--modal' onSubmit={(e) => submitDismissAlert(e)}>
          <div className='form__row'>
            <h2>Dismiss Alert</h2>
          </div>
          <div className='form__row'>
            <p>Are you sure you want to delete this alert?</p>
          </div>
          {/* BUTTONS */}
          <div className='form__row'>
            <button className='btn btn__warning btn--md' type='submit'>
              delete Alert
            </button>
            <button className='btn btn__caution btn--md' onClick={() => dispatch({ type: 'NONE' })}>
              Cancel
            </button>
          </div>
        </form>
      );
      break;
    default:
      modalContent = <></>;
      break;
  }

  return (
    <div className='modal__bg'>
      <div className='modal glass-3'>{modalContent}</div>
    </div>
  );
}

export default Modal;
