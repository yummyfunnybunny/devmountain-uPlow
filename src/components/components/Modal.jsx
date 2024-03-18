import '../../styles/components/modal.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { StateDropdown } from '../../../scripts/forms.jsx';

const root = import.meta.env.VITE_REACT_APP_ROOT;

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
    name: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    picture: '',
  });
  const [editProperty, setEditProperty] = useState({
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
  console.log(editJob);

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
        // TODO - display success toast
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

    // console.log('Edited User:');
    // console.log(edittedUser);

    const mapboxToken =
      'pk.eyJ1IjoieXVtbXlmdW5ueWJ1bm55IiwiYSI6ImNrODZwNzQydDA1bjEzZW15NTRqa2NpdnEifQ.6y8NFU2qjw6mTgINZYaRyg';

    const address = encodeURI(`${edittedUser.street} ${edittedUser.city} ${edittedUser.state} ${edittedUser.zipcode}`);
    // console.log(address);

    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${mapboxToken}`;

    axios
      .get(mapBoxUrl)
      .then((res) => {
        // console.log('== 1st then ==');
        // console.log(res.data);
        const coordinates = res.data.features[0].center;
        // console.log(coordinates);
        edittedUser.coordinates = coordinates;
        // console.log(edittedUser);
        return axios.put(`${root}/me`, edittedUser);
      })
      .then((res) => {
        // console.log(res.data);
        // setUser(res.data.user);
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
      });
  };
  const submitDeleteAccount = (e) => {
    e.preventDefault();

    const deleteUser = {
      ...user,
      password: user.password,
      confirmPassword: user.confirmPassword,
    };
    console.log(deleteUser);

    if (deleteUser.password !== deleteUser.confirmPassword) {
      console.log('passwords do not match!');
      dispatch({ type: 'SET_TOAST', payload: { color: 'red', message: 'The passwords you entered do not match' } });
      return;
    }
    axios
      .delete(`${root}/me/${deleteUser.password}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'RESET_LOGGED_IN' });
        dispatch({ type: 'NONE' });
        // navigate(res.data.redirectUri);
        navigate(`${root}/`);
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'SET_TOAST', payload: err.response.data.toast });
      });
  };
  const submitCreateProperty = (e) => {
    e.preventDefault();

    const createProperty = {
      name: newProperty.name,
      street: newProperty.street,
      city: newProperty.city,
      state: newProperty.state,
      zipcode: newProperty.zipcode,
      // TODO - add pictures
    };

    const mapboxToken = import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN;

    const address = encodeURI(
      `${createProperty.street} ${createProperty.city} ${createProperty.state} ${createProperty.zipcode}`
    );
    // console.log(address);

    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${mapboxToken}`;

    axios
      .get(mapBoxUrl)
      .then((res) => {
        // console.log('== 1st then ==');
        // console.log(res.data);
        const coordinates = res.data.features[0].center;
        // console.log(coordinates);
        createProperty.coordinates = coordinates;
        // console.log(createProperty);
        return axios.post(`${root}/properties`, createProperty);
      })
      .then((res) => {
        // console.log('== 2nd then ==');
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_PROPERTY' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
      })
      .catch((err) => {
        // console.log(err);
        dispatch({ type: 'SET_TOAST', payload: { color: 'red', message: 'Something went wrong. Please try again.' } });
      });
  };
  const submitEditProperty = (e) => {
    e.preventDefault();

    const propertyObject = {
      ...reduxProperty,
      name: editProperty.name,
      // picture: editPropertyPicture,
      street: editProperty.street,
      city: editProperty.city,
      state: editProperty.state,
      zipcode: editProperty.zipcode,
    };

    const mapboxToken = import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN;

    const address = encodeURI(
      `${propertyObject.street} ${propertyObject.city} ${propertyObject.state} ${propertyObject.zipcode}`
    );
    // console.log(address);

    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${mapboxToken}`;
    // console.log(propertyObject);

    axios
      .get(mapBoxUrl)
      .then((res) => {
        // console.log('== 1st then ==');
        // console.log(res.data);
        const coordinates = res.data.features[0].center;
        // console.log(coordinates);
        propertyObject.coordinates = coordinates;
        // console.log(propertyObject);
        return axios.put(`${root}/properties`, propertyObject);
      })
      .then((res) => {
        // console.log(res.data);
        // TODO - change this dispatch to send the whole res object instead
        // dispatch({
        //   type: 'SET_PROPERTY',
        //   payload: {
        //     name: editPropertyName,
        //     picture: editPropertyPicture,
        //     street: editPropertyStreet,
        //     city: editPropertyCity,
        //     state: editPropertyState,
        //     zipcode: editPropertyZipcode,
        //   },
        // });
        dispatch({ type: 'RESET_PROPERTY' });
        dispatch({ type: 'SET_TOAST', payload: res.data.toast });
        dispatch({ type: 'NONE' });
      })
      .catch((err) => {
        console.log(err);
        // dispatch({ type: 'SET_TOAST', payload: { color: 'red', message: 'Something went wrong. Please try again.' } });
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

    const instructionsArray = [newJob.instructions1, newJob.instructions2, newJob.instructions3];

    const createJob = {
      jobType: newJob.jobType,
      jobSize: newJob.jobSize,
      picture: 'img123',
      coordinates: reduxProperty.coordinates,
      instructions: instructionsArray,
      subscribed: null,
      property_id: reduxProperty.property_id,
    };

    axios
      .post(`${root}/jobs`, createJob)
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

    const instructionsArray = [editJob.instructions1, editJob.instructions2, editJob.instructions3];

    const jobObject = {
      ...editJob,
      jobType: editJob.jobType,
      jobSize: editJob.jobSize,
      // picture: 'img123',
      instructions: instructionsArray,
    };

    axios
      .put(`${root}/jobs`, jobObject)
      .then((res) => {
        dispatch({
          type: 'SET_JOB',
          payload: {
            ...jobObject,
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
              defaultValue=''
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
              onChange={(e) => handleChange(e, setNewProperty, newProperty)}
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

          {/* PICTURES */}
          <div className='form__row'>
            <label className='form__label'>Add Picture:&emsp;</label>
            <input
              className='form__input'
              name='pictures'
              defaultValue={newJob.pictures}
              onChange={(e) => handleChange(e, setNewJob, newJob)}
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
              defaultValue={editJob.pictures}
              onChange={(e) => handleChange(e, setEditJob, editJob)}
            ></input>
          </div>

          {/* INSTRUCTIONS */}
          <label className='form__label'>Instructions:&emsp;</label>
          <p className='form__label'>Separate individual instructions with a period.</p>
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
