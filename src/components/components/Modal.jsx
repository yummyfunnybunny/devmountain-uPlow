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
  const modal = useSelector((state) => state.modalReducer.modalType);
  const user = useSelector((state) => state.loggedInReducer);
  const property = useSelector((state) => state.propertyReducer);
  const job = useSelector((state) => state.jobReducer);
  console.log(job);

  // STATE VARIABLES
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // TODO - can you combine these sets of states?
  const [newPropertyName, setNewPropertyName] = useState('');
  const [newPropertyStreet, setNewPropertyStreet] = useState('');
  const [newPropertyCity, setNewPropertyCity] = useState('');
  const [newPropertyState, setNewPropertyState] = useState('');
  const [newPropertyZip, setNewPropertyZip] = useState('');
  const [newPropertyPicture, setNewPropertyPicture] = useState('');

  const [editPropertyName, setEditPropertyName] = useState(property.name);
  const [editPropertyStreet, setEditPropertyStreet] = useState(property.street);
  const [editPropertyCity, setEditPropertyCity] = useState(property.city);
  const [editPropertyState, setEditPropertyState] = useState(property.state);
  const [editPropertyZip, setEditPropertyZip] = useState(property.zip);
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
  const [editJobInstructions1, setEditJobInstructions1] = useState(job.instructions[0]);
  const [editJobInstructions2, setEditJobInstructions2] = useState(job.instructions[1]);
  const [editJobInstructions3, setEditJobInstructions3] = useState(job.instructions[2]);

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

  console.log('Redux User:');
  console.log(user);
  console.log('PropertyReducer:');
  console.log(property);
  // console.log('PropertyReducer:');
  // console.log(property);

  const submitLogout = () => {
    axios
      .post('/logout')
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'NONE' });
        dispatch({ type: false });
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
    };

    console.log('Edited User:');
    console.log(edittedUser);

    axios
      .post('/me', edittedUser)
      .then((res) => {
        console.log(res.data);
        // setUser(res.data.user);
        dispatch({
          type: true,
          payload: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            role: user.role,
          },
        });
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
        dispatch({ type: false });
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
      zip: newPropertyZip,
      // TODO - add pictures
      // TODO - add coordinates
    };

    axios
      .post('/properties', createProperty)
      .then((res) => {
        console.log(res.data);
        // TODO - clear form
        setNewPropertyName('');
        setNewPropertyStreet('');
        setNewPropertyCity('');
        setNewPropertyState('');
        setNewPropertyZip('');
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
      picture: editPropertyPicture,
      street: editPropertyStreet,
      city: editPropertyCity,
      state: editPropertyState,
      zip: editPropertyZip,
    };
    console.log(editProperty);

    axios
      .put('/properties', editProperty)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: true,
          payload: {
            name: editPropertyName,
            picture: editPropertyPicture,
            street: editPropertyStreet,
            city: editPropertyCity,
            state: editPropertyState,
            zip: editPropertyZip,
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
        dispatch({ type: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitCreateJob = (e) => {
    e.preventDefault();

    const instructionsArray = [newJobInstructions1, newJobInstructions2, newJobInstructions3];

    const createJob = {
      jobType: newJobType,
      jobSize: newJobSize,
      picture: 'img123',
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
      property_id: property.property_id,
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
          type: true,
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
        dispatch({ type: false });
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

              {/* ZIP */}
              <div className='form__row'>
                <label className='form__label'>Zipcode:&emsp;</label>
                <input className='form__input' onChange={(e) => setNewPropertyZip(e.target.value)}></input>
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

              {/* ZIP */}
              <div className='form__row'>
                <label className='form__label'>Zipcode:&emsp;</label>
                <input
                  className='form__input'
                  defaultValue={property.zip}
                  onChange={(e) => setEditPropertyZip(e.target.value)}
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
                <h2>Create New Job</h2>
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
    default:
      return <></>;
  }

  return { modalDisplay };
}

export default Modal;