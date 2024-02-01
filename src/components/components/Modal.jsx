import '../../styles/components/modal.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Modal() {
  // INITS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SELECTORS
  // TODO - rename these redux[name]
  const modal = useSelector((state) => state.modalReducer.modalType);
  const user = useSelector((state) => state.loggedInReducer);
  const property = useSelector((state) => state.propertyReducer);
  const job = useSelector((state) => state.jobReducer);
  const worker = useSelector((state) => state.workerReducer);
  const alert = useSelector((state) => state.alertReducer);
  const [myJobs, setMyJobs] = useState([]);

  useEffect(() => {
    axios
      .get('/myJobsWithProperties')
      .then((res) => {
        console.log(res.data.jobsWithProperties);
        setMyJobs(res.data.jobsWithProperties);
        // myJobs = [...res.data.jobs];
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log('Redux User:');
  // console.log(user);
  // console.log('Redux Property:');
  // console.log(property);
  console.log('Redux Jobs:');
  console.log(job);
  // console.log('Redux Worker:');
  // console.log(worker);
  // console.log('Redux Alert:');
  // console.log(alert);

  // STATE VARIABLES
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [street, setStreet] = useState(user.street);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [zipcode, setZipcode] = useState(user.zipcode);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // TODO - can you combine these sets of states?
  const [newPropertyName, setNewPropertyName] = useState('');
  const [newPropertyStreet, setNewPropertyStreet] = useState('');
  const [newPropertyCity, setNewPropertyCity] = useState('');
  const [newPropertyState, setNewPropertyState] = useState('');
  const [newPropertyZipcode, setNewPropertyZipcode] = useState('');
  const [newPropertyPicture, setNewPropertyPicture] = useState('');

  const [editPropertyName, setEditPropertyName] = useState(property.name);
  const [editPropertyStreet, setEditPropertyStreet] = useState(property.street);
  const [editPropertyCity, setEditPropertyCity] = useState(property.city);
  const [editPropertyState, setEditPropertyState] = useState(property.state);
  const [editPropertyZipcode, setEditPropertyZipcode] = useState(property.zipcode);
  const [editPropertyPicture, setEditPropertyPicture] = useState(property.picture);

  // TODO - can you combine these sets of states?

  const [newJobType, setNewJobType] = useState('');
  const [newJobSize, setNewJobSize] = useState('');
  const [newJobPicture, setNewJobPicture] = useState('');
  const [newJobInstructions1, setNewJobInstructions1] = useState(['']);
  const [newJobInstructions2, setNewJobInstructions2] = useState(['']);
  const [newJobInstructions3, setNewJobInstructions3] = useState(['']);

  const [editJobType, setEditJobType] = useState(job.jobType);
  const [editJobSize, setEditJobSize] = useState(job.jobSize);
  const [editJobPicture, setEditJobPicture] = useState(job.picture);
  const [editJobInstructions1, setEditJobInstructions1] = useState(job.instructions[0] || '');
  const [editJobInstructions2, setEditJobInstructions2] = useState(job.instructions[1] || '');
  const [editJobInstructions3, setEditJobInstructions3] = useState(job.instructions[2] || '');

  const [jobToRequestWorker, setJobToRequestWorker] = useState('');

  // TODO - see if you can combine these two switch statements
  let newJobSizeMeasure = '';
  switch (newJobType) {
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
  }
  let editJobSizeMeasure = '';
  switch (editJobType) {
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
  }

  const submitLogout = () => {
    axios
      .post('/logout')
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_LOGGED_IN' });
        navigate('/');
        // TODO - display success toast
      })
      .catch((err) => {
        console.log(err);
        // TODO - display error toast
      });
  };
  const submitEditAccount = (e) => {
    console.log('submit edit account');
    e.preventDefault();

    const edittedUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      user_id: user.user_id,
      role: user.role,
    };

    console.log('Edited User:');
    console.log(edittedUser);

    const mapboxToken =
      'pk.eyJ1IjoieXVtbXlmdW5ueWJ1bm55IiwiYSI6ImNrODZwNzQydDA1bjEzZW15NTRqa2NpdnEifQ.6y8NFU2qjw6mTgINZYaRyg';

    const address = encodeURI(`${street} ${city} ${state} ${zipcode}`);
    console.log(address);

    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${mapboxToken}`;

    axios
      .get(mapBoxUrl)
      .then((res) => {
        console.log('== 1st then ==');
        console.log(res.data);
        const coordinates = res.data.features[0].center;
        // console.log(coordinates);
        edittedUser.coordinates = coordinates;
        console.log(edittedUser);
        return axios.put('/me', edittedUser);
      })
      .then((res) => {
        console.log(res.data);
        // setUser(res.data.user);
        dispatch({ type: 'SET_LOGGED_IN', payload: { ...res.data.user } });
        dispatch({ type: 'NONE' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitChangePassword = (e) => {
    e.preventDefault();

    const edittedUser = {
      ...user,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    console.log(edittedUser);

    axios
      .post('/changePassword', edittedUser)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitDeleteAccount = (e) => {
    e.preventDefault();

    const deleteUser = {
      ...user,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(deleteUser);

    if (password !== confirmPassword) {
      console.log('passwords do not match!');
      return;
    }
    axios
      .delete(`/me/${password}`, deleteUser)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'RESET_LOGGED_IN' });
        dispatch({ type: 'NONE' });
        navigate(res.data.redirectUri);
        // TODO - display toast notification
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitCreateProperty = (e) => {
    e.preventDefault();

    const createProperty = {
      name: newPropertyName,
      street: newPropertyStreet,
      city: newPropertyCity,
      state: newPropertyState,
      zipcode: newPropertyZipcode,
      // TODO - add pictures
      // TODO - add coordinates
    };

    const mapboxToken =
      'pk.eyJ1IjoieXVtbXlmdW5ueWJ1bm55IiwiYSI6ImNrODZwNzQydDA1bjEzZW15NTRqa2NpdnEifQ.6y8NFU2qjw6mTgINZYaRyg';

    const address = encodeURI(`${newPropertyStreet} ${newPropertyCity} ${newPropertyState} ${newPropertyZipcode}`);
    console.log(address);

    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${mapboxToken}`;

    axios
      .get(mapBoxUrl)
      .then((res) => {
        console.log('== 1st then ==');
        console.log(res.data);
        const coordinates = res.data.features[0].center;
        // console.log(coordinates);
        createProperty.coordinates = coordinates;
        console.log(createProperty);
        return axios.post('/properties', createProperty);
      })
      .then((res) => {
        console.log('== 2nd then ==');
        console.log(res.data);
        setNewPropertyName('');
        setNewPropertyStreet('');
        setNewPropertyCity('');
        setNewPropertyState('');
        setNewPropertyZipcode('');
        dispatch({ type: 'NONE' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitEditProperty = (e) => {
    e.preventDefault();

    const editProperty = {
      ...property,
      name: editPropertyName,
      // picture: editPropertyPicture,
      street: editPropertyStreet,
      city: editPropertyCity,
      state: editPropertyState,
      zipcode: editPropertyZipcode,
    };

    const mapboxToken =
      'pk.eyJ1IjoieXVtbXlmdW5ueWJ1bm55IiwiYSI6ImNrODZwNzQydDA1bjEzZW15NTRqa2NpdnEifQ.6y8NFU2qjw6mTgINZYaRyg';

    const address = encodeURI(`${editPropertyStreet} ${editPropertyCity} ${editPropertyState} ${editPropertyZipcode}`);
    console.log(address);

    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${mapboxToken}`;
    console.log(editProperty);

    axios
      .get(mapBoxUrl)
      .then((res) => {
        console.log('== 1st then ==');
        console.log(res.data);
        const coordinates = res.data.features[0].center;
        // console.log(coordinates);
        editProperty.coordinates = coordinates;
        console.log(editProperty);
        return axios.put('/properties', editProperty);
      })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'SET_PROPERTY',
          payload: {
            name: editPropertyName,
            picture: editPropertyPicture,
            street: editPropertyStreet,
            city: editPropertyCity,
            state: editPropertyState,
            zipcode: editPropertyZipcode,
          },
        });
        dispatch({ type: 'NONE' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitDeleteProperty = (e) => {
    e.preventDefault();

    const propertyId = property.property_id;
    console.log(propertyId);

    axios
      .delete(`/properties/${propertyId}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_PROPERTY' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitCreateJob = (e) => {
    console.log('== submit create job form ==');
    e.preventDefault();

    const instructionsArray = [newJobInstructions1, newJobInstructions2, newJobInstructions3];

    const createJob = {
      jobType: newJobType,
      jobSize: newJobSize,
      picture: 'img123',
      coordinates: property.coordinates,
      instructions: instructionsArray,
      subscribed: null,
      property_id: property.property_id,
    };

    axios
      .post('/jobs', createJob)
      .then((res) => {
        console.log(res.data);
        setNewJobType('');
        setNewJobSize('');
        setNewJobPicture('');
        setNewJobInstructions1('');
        setNewJobInstructions2('');
        setNewJobInstructions3('');
        dispatch({ type: 'NONE' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitEditJob = (e) => {
    e.preventDefault();

    const instructionsArray = [editJobInstructions1, editJobInstructions2, editJobInstructions3];

    const editJob = {
      ...job,
      jobType: editJobType,
      jobSize: editJobSize,
      picture: 'img123',
      instructions: instructionsArray,
      subscribed: null,
      // property_id: property.property_id,
    };

    axios
      .put('/jobs', editJob)
      .then((res) => {
        console.log(res.data);
        setEditJobType('');
        setEditJobSize('');
        setEditJobPicture('');
        setEditJobInstructions1('');
        setEditJobInstructions2('');
        setEditJobInstructions3('');
        dispatch({
          type: 'SET_JOB',
          payload: {
            ...editJob,
          },
        });
        dispatch({ type: 'NONE' });
      })
      .catch((err) => {
        console.lo(err);
      });
  };
  const submitDeleteJob = (e) => {
    e.preventDefault();

    console.log(job.job_id);
    // const jobId = job.job_id;

    axios
      .delete(`/jobs/${job.job_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_JOB' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitUnsubscribeWorker = (e) => {
    e.preventDefault();
    console.log('submitUnsubscribeWorker');
    console.log(job.job_id);

    axios
      .put(`/unsubscribeWorker/${job.job_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_JOB' });
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
    job.recipient_id = worker.user_id;
    console.log(job);
    axios
      .post('/requestWorker', job)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_WORKER' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitAcceptRequestWorker = (e) => {
    // Worker => Accepts => Customer Offer
    e.preventDefault();
    axios
      .put('/acceptJobOffer', alert)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_ALERT' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitRejectRequestWorker = (e) => {
    e.preventDefault();
    axios
      .delete(`/rejectRequestWorker/${alert.alert_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_ALERT' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitRequestJob = (e) => {
    e.preventDefault();

    axios
      .post('/requestJob', job)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_WORKER' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitDismissAlert = (e) => {
    e.preventDefault();
    console.log();

    axios
      .delete(`/deleteAlert/${alert.alert_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_ALERT' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitAcceptRequestJob = (e) => {
    // Customer => Accepts => Worker Offer
    e.preventDefault();

    axios
      .put('/acceptWorkerOffer', alert)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_ALERT' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitRejectRequestJob = (e) => {
    e.preventDefault();
    axios
      .delete(`/rejectRequestJob/${alert.alert_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: 'RESET_ALERT' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let modalDisplay;
  switch (modal) {
    case 'LOGOUT':
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <div className='modal__row'>
              <h2>Are you sure you want to logout?</h2>
            </div>
            <div className='modal__row'>
              <button className='btn' onClick={() => submitLogout()}>
                Logout
              </button>
              <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    case 'EDIT_ACCOUNT':
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitEditAccount(e)}>
              <div className='form__row'>
                <h2>Edit Account Info</h2>
              </div>

              {/* FIRST NAME */}
              <div className='form__row'>
                <label className='form__label'>First Name:&emsp;</label>
                <input
                  className='form__input'
                  defaultValue={user.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>

              {/* LAST NAME */}
              <div className='form__row'>
                <label className='form__label'>Last Name:&emsp;</label>
                <input
                  className='form__input'
                  defaultValue={user.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>

              {/* EMAIL */}
              <div className='form__row'>
                <label className='form__label'>Email Name:&emsp;</label>
                <input
                  className='form__input'
                  defaultValue={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              {/* PHONE */}
              <div className='form__row'>
                <label className='form__label'>Phone Name:&emsp;</label>
                <input
                  className='form__input'
                  defaultValue={user.phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  defaultValue={user.street}
                  onChange={(e) => setStreet(e.target.value)}
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
                  defaultValue={user.city}
                  onChange={(e) => setCity(e.target.value)}
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
                  defaultValue={user.state}
                  onChange={(e) => setState(e.target.value)}
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
                  defaultValue={user.zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                ></input>
              </div>

              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Submit
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'CHANGE_PASSWORD':
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitChangePassword(e)}>
              <div className='form__row'>
                <h2>Edit Account Info</h2>
              </div>

              {/* OLD PASSWORD */}
              <div className='form__row'>
                <label className='form__label'>Current Password:&emsp;</label>
                <input
                  className='form__input'
                  type='password'
                  defaultValue={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                ></input>
              </div>

              {/* NEW PASSWORD */}
              <div className='form__row'>
                <label className='form__label'>New Password:&emsp;</label>
                <input
                  className='form__input'
                  type='password'
                  defaultValue={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></input>
              </div>
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Submit
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'DELETE_ACCOUNT':
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitDeleteAccount(e)}>
              <div className='form__row'>
                <h2>Are you sure you want to delete yout account?</h2>
                <h3>Deleting your account will permanently delete all of your properties and jobs</h3>
              </div>
              {/* PASSWORD */}
              <div className='form__row'>
                <label className='form__label'>Password:&emsp;</label>
                <input
                  className='form__input'
                  type='password'
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className='form__row'>
                <label className='form__label'>Confirm Password:&emsp;</label>
                <input
                  className='form__input'
                  type='password'
                  defaultValue={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Delete
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'CREATE_PROPERTY':
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitCreateProperty(e)}>
              <div className='form__row'>
                <h2>Create New Property</h2>
              </div>
              {/* PROPERTY NAME */}
              <div className='form__row'>
                <label className='form__label'>Property Name:&emsp;</label>
                <input className='form__input' onChange={(e) => setNewPropertyName(e.target.value)}></input>
              </div>

              {/* STREET */}
              <div className='form__row'>
                <label className='form__label'>Street Address:&emsp;</label>
                <input className='form__input' onChange={(e) => setNewPropertyStreet(e.target.value)}></input>
              </div>

              {/* CITY */}
              <div className='form__row'>
                <label className='form__label'>City:&emsp;</label>
                <input className='form__input' onChange={(e) => setNewPropertyCity(e.target.value)}></input>
              </div>

              {/* STATE */}
              <div className='form__row'>
                <label className='form__label'>State:&emsp;</label>
                <input className='form__input' onChange={(e) => setNewPropertyState(e.target.value)}></input>
              </div>

              {/* ZIPCODE */}
              <div className='form__row'>
                <label className='form__label'>Zipcode:&emsp;</label>
                <input className='form__input' onChange={(e) => setNewPropertyZipcode(e.target.value)}></input>
              </div>

              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Submit
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'EDIT_PROPERTY':
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitEditProperty(e)}>
              <div className='form__row'>
                <h2>Edit Property</h2>
              </div>

              {/* PROPERTY NAME */}
              <div className='form__row'>
                <label className='form__label'>Property Name:&emsp;</label>
                <input
                  className='form__input'
                  defaultValue={property.name}
                  onChange={(e) => setEditPropertyName(e.target.value)}
                ></input>
              </div>

              {/* STREET */}
              <div className='form__row'>
                <label className='form__label'>Street Address:&emsp;</label>
                <input
                  className='form__input'
                  defaultValue={property.street}
                  onChange={(e) => setEditPropertyStreet(e.target.value)}
                ></input>
              </div>

              {/* CITY */}
              <div className='form__row'>
                <label className='form__label'>City:&emsp;</label>
                <input
                  className='form__input'
                  defaultValue={property.city}
                  onChange={(e) => setEditPropertyCity(e.target.value)}
                ></input>
              </div>

              {/* STATE */}
              <div className='form__row'>
                <label className='form__label'>State:&emsp;</label>
                <input
                  className='form__input'
                  defaultValue={property.state}
                  onChange={(e) => setEditPropertyState(e.target.value)}
                ></input>
              </div>

              {/* ZIPCODE */}
              <div className='form__row'>
                <label className='form__label'>Zipcode:&emsp;</label>
                <input
                  className='form__input'
                  defaultValue={property.zipcode}
                  onChange={(e) => setEditPropertyZipcode(e.target.value)}
                ></input>
              </div>

              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Submit
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'DELETE_PROPERTY':
      return (
        <div className='modal__bg'>
          <div className='modal'>
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
                <button className='btn' type='submit'>
                  Delete
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'CREATE_JOB':
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitCreateJob(e)}>
              <div className='form__row'>
                <h2>Create New Job</h2>
              </div>
              {/* JOB TYPE */}
              <div className='form__row'>
                <label className='form__label'>Job Type:&emsp;</label>
                <select className='form__input' onChange={(e) => setNewJobType(e.target.value)}>
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
                <label className='form__label'>Job Size-({newJobSizeMeasure}):&emsp;</label>
                <input className='form__input' onChange={(e) => setNewJobSize(e.target.value)}></input>
              </div>

              {/* PICTURES */}
              <div className='form__row'>
                <label className='form__label'>Add Picture:&emsp;</label>
                <input className='form__input' onChange={(e) => setNewJobPicture(e.target.value)}></input>
              </div>

              {/* INSTRUCTIONS */}
              <label className='form__label'>Instructions:&emsp;</label>
              <p className='form__label'>Separate individual instructions with a period.</p>
              <div className='form__row'>
                <input className='form__input' onChange={(e) => setNewJobInstructions1(e.target.value)}></input>
              </div>
              <div className='form__row'>
                <input className='form__input' onChange={(e) => setNewJobInstructions2(e.target.value)}></input>
              </div>
              <div className='form__row'>
                <input className='form__input' onChange={(e) => setNewJobInstructions3(e.target.value)}></input>
              </div>

              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Create Job
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'EDIT_JOB':
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitEditJob(e)}>
              <div className='form__row'>
                <h2>Edit Job</h2>
              </div>
              {/* JOB TYPE */}
              <div className='form__row'>
                <label className='form__label'>Job Type:&emsp;</label>
                <select
                  className='form__input'
                  defaultValue={editJobType}
                  onChange={(e) => setEditJobType(e.target.value)}
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
                  defaultValue={editJobSize}
                  onChange={(e) => setEditJobSize(e.target.value)}
                ></input>
              </div>

              {/* PICTURES */}
              <div className='form__row'>
                <label className='form__label'>Add Picture:&emsp;</label>
                <input
                  className='form__input'
                  defaultValue={editJobPicture}
                  onChange={(e) => setEditJobPicture(e.target.value)}
                ></input>
              </div>

              {/* INSTRUCTIONS */}
              <label className='form__label'>Instructions:&emsp;</label>
              <p className='form__label'>Separate individual instructions with a period.</p>
              <div className='form__row'>
                <input
                  className='form__input'
                  defaultValue={editJobInstructions1}
                  onChange={(e) => setEditJobInstructions1(e.target.value)}
                ></input>
              </div>
              <div className='form__row'>
                <input
                  className='form__input'
                  defaultValue={editJobInstructions2}
                  onChange={(e) => setEditJobInstructions2(e.target.value)}
                ></input>
              </div>
              <div className='form__row'>
                <input
                  className='form__input'
                  defaultValue={editJobInstructions3}
                  onChange={(e) => setEditJobInstructions3(e.target.value)}
                ></input>
              </div>

              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Create Job
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'DELETE_JOB':
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitDeleteJob(e)}>
              <div className='form__row'>
                <h2>Delete Job</h2>
              </div>
              <div className='form__row'>
                <p>Are you sure you want to delete this job?</p>
              </div>
              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Delete
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'UNSUBSCRIBE_WORKER':
      return (
        <div className='modal__bg'>
          <div className='modal'>
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
                <button className='btn' type='submit'>
                  Unsubscribe Worker
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'REQUEST_WORKER':
      return (
        <div className='modal__bg'>
          <div className='modal'>
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
                <button className='btn' type='submit'>
                  Request Work
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'ACCEPT_REQUEST_WORKER':
      // Worker => accepts => customer Offer
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitAcceptRequestWorker(e)}>
              <div className='form__row'>
                <h2>Accept Job Offer</h2>
              </div>
              <div className='form__row'>
                <p>Are you sure you want to accept this job offer?</p>
              </div>
              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Accept Offer
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'COUNTER_REQUEST_WORKER':
      return <></>;
    case 'CUSTOMER_OFFER_REJECTED':
      // Worker => Rejects => Customer Offer
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitRejectRequestWorker(e)}>
              <div className='form__row'>
                <h2>Reject Job</h2>
              </div>
              <div className='form__row'>
                <p>Are you sure you want to reject this job offer</p>
              </div>
              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Reject Job
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'REQUEST_JOB':
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitRequestJob(e)}>
              <div className='form__row'>
                <h2>Request Job</h2>
              </div>
              <div className='form__row'>
                <p>Are you sure you'd like to request this job?</p>
              </div>
              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Request Job
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'ACCEPT_REQUEST_JOB':
      // Customer => accepts => Worker Offer
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitAcceptRequestJob(e)}>
              <div className='form__row'>
                <h2>Accept Service Offer</h2>
              </div>
              <div className='form__row'>
                <p>Are you sure you want to accept this service offer?</p>
              </div>
              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Accept Offer
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'COUNTER_REQUEST_JOB':
      return <></>;
    case 'REJECT_REQUEST_JOB':
      // Customer => Rejects => Worker Offer
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitRejectRequestJob(e)}>
              <div className='form__row'>
                <h2>Reject Service Offer</h2>
              </div>
              <div className='form__row'>
                <p>Are you sure you want to reject this Service offer</p>
              </div>
              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  Reject Job
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    case 'DISMISS_ALERT':
      return (
        <div className='modal__bg'>
          <div className='modal'>
            <form className='form form--modal' onSubmit={(e) => submitDismissAlert(e)}>
              <div className='form__row'>
                <h2>Dismiss Alert</h2>
              </div>
              <div className='form__row'>
                <p>Are you sure you want to delete this alert?</p>
              </div>
              {/* BUTTONS */}
              <div className='form__row'>
                <button className='btn' type='submit'>
                  delete Alert
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'NONE' })}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    default:
      return <></>;
  }

  return { modalDisplay };
}

export default Modal;
