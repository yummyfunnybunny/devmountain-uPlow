const initialState = {
  alert_id: null,
  alertType: null,
  hasRead: false,
  message: '',
  recipient_id: null,
  sender_id: null,
  job_id: null,
  property_id: null,
  Job: {},
  Property: {},
  User: {},
  created_at: null,
  updated_at: null,
};

function alertReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...state,
        alert_id: action.payload.alert_id,
        alertType: action.payload.alertType,
        hasRead: action.payload.hasRead,
        message: action.payload.message,
        recipient_id: action.payload.recipient_id,
        sender_id: action.payload.sender_id,
        job_id: action.payload.job_id,
        property_id: action.payload.property_id,
        Job: action.payload.Job,
        Property: action.payload.Property,
        User: action.payload.User,
        created_at: action.payload.created_at,
        updated_at: action.payload.updated_at,
      };
    case 'RESET_ALERT':
      return {
        ...state,
        alert_id: null,
        alertType: null,
        hasRead: false,
        message: '',
        recipient_id: null,
        sender_id: null,
        job_id: null,
        property_id: null,
        Job: {},
        Property: {},
        User: {},
        created_at: null,
        updated_at: null,
      };
    default:
      return state;
  }
}

export default alertReducer;
