const authReducer = (state = [], action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "REGISTER":
      return action.payload;
    case "ACTIVATE":
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
