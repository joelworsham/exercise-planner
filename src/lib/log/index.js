// TODO more robust logging library
const log = {
  inform: (message) => {
    console.log(message);
  },
  error: (message, { error = undefined } = {}) => {
    console.error(message);
    if (error) {
      console.log(error);
    }
  },
};

export default log;

