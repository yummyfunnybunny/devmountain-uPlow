const initialState = {
  modalType: 'NONE',
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
    default:
      return state;
  }
}

export default modalReducer;
