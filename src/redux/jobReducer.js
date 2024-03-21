const initialState = {
  job_id: '-',
  jobType: '-',
  jobSize: '-',
  picture: '-',
  instructions: ['-', '-', '-'],
  subscribed: '-',
  property_id: '-',
};

function jobReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_JOB':
      return {
        ...state,
        job_id: action.payload.job_id,
        jobType: action.payload.jobType,
        jobSize: action.payload.jobSize,
        picture: action.payload.picture,
        instructions: action.payload.instructions,
        subscribed: action.payload.subscribed,
        property_id: action.payload.property_id,
      };
    case 'RESET_JOB':
      return {
        ...state,
        job_id: '-',
        jobType: '-',
        jobSize: '-',
        picture: '-',
        instructions: ['-', '-', '-'],
        subscribed: '-',
        property_id: '-',
      };
    default:
      return state;
  }
}

export default jobReducer;
