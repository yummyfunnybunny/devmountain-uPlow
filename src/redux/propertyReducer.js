const initialState = {
  property_id: '',
  name: '',
  picture: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  coordinates: [0, 0],
  user_id: '',
};

function propertyReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PROPERTY':
      console.log(action.payload);
      return {
        ...state,
        property_id: action.payload.property_id,
        name: action.payload.name,
        picture: action.payload.picture,
        street: action.payload.street,
        city: action.payload.city,
        state: action.payload.state,
        zipcode: action.payload.zipcode,
        coordinates: action.payload.coordinates,
        user_id: action.payload.user_id,
      };
    case 'RESET_PROPERTY':
      return {
        ...state,
        property_id: '',
        name: '',
        picture: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        coordinates: '',
        user_id: '',
      };
    default:
      return state;
  }
}

export default propertyReducer;
