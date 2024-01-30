const initialState = {
  user_id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  coordinates: '',
  role: '',
};

function workerReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_WORKER':
      return {
        ...state,
        user_id: action.payload.user_id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        street: action.payload.street,
        city: action.payload.city,
        state: action.payload.state,
        zipcode: action.payload.zipcode,
        coordinates: action.payload.coordinates,
        role: action.payload.role,
      };
    case 'RESET_WORKER':
      return {
        ...state,
        user_id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        coordinates: '',
        role: '',
      };
    default:
      return state;
  }
}

export default workerReducer;
