const initialState = {
  modalType: 'NONE',
  // data: null,
};

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case 'NONE':
      return { ...state, modalType: 'NONE' };
    case 'LOGOUT':
      return { ...state, modalType: 'LOGOUT' };
    case 'EDIT_ACCOUNT':
      return { ...state, modalType: 'EDIT_ACCOUNT' };
    case 'CHANGE_PASSWORD':
      return { ...state, modalType: 'CHANGE_PASSWORD' };
    case 'DELETE_ACCOUNT':
      return { ...state, modalType: 'DELETE_ACCOUNT' };
    case 'CREATE_PROPERTY':
      return { ...state, modalType: 'CREATE_PROPERTY' };
    case 'EDIT_PROPERTY':
      return { ...state, modalType: 'EDIT_PROPERTY' };
    case 'DELETE_PROPERTY':
      return { ...state, modalType: 'DELETE_PROPERTY' };
    case 'CREATE_JOB':
      return { ...state, modalType: 'CREATE_JOB' };
    case 'EDIT_JOB':
      return { ...state, modalType: 'EDIT_JOB' };
    case 'DELETE_JOB':
      return { ...state, modalType: 'DELETE_JOB' };
    case 'UNSUBSCRIBE_WORKER':
      return { ...state, modalType: 'UNSUBSCRIBE_WORKER' };
    case 'UNSUBSCRIBE_FROM_JOB':
      return { ...state, modalType: 'UNSUBSCRIBE_FROM_JOB' };
    case 'REQUEST_WORKER':
      return { ...state, modalType: 'REQUEST_WORKER' };
    case 'ACCEPT_REQUEST_WORKER':
      return { ...state, modalType: 'ACCEPT_REQUEST_WORKER' };
    case 'COUNTER_REQUEST_WORKER':
      return { ...state, modalType: 'COUNTER_REQUEST_WORKER' };
    case 'CUSTOMER_OFFER_REJECTED':
      return { ...state, modalType: 'CUSTOMER_OFFER_REJECTED' };
    case 'REQUEST_JOB':
      return { ...state, modalType: 'REQUEST_JOB' };
    case 'ACCEPT_REQUEST_JOB':
      return { ...state, modalType: 'ACCEPT_REQUEST_JOB' };
    case 'COUNTER_REQUEST_JOB':
      return { ...state, modalType: 'COUNTER_REQUEST_JOB' };
    case 'REJECT_REQUEST_JOB':
      return { ...state, modalType: 'REJECT_REQUEST_JOB' };
    case 'DISMISS_ALERT':
      return { ...state, modalType: 'DISMISS_ALERT' };
    default:
      return state;
  }
}

export default modalReducer;
