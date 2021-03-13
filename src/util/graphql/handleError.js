import log from '../../lib/log';

const handleError = (error) => {
  log.error('Could not get response from server.', { error });
  return { data: null, errors: [error.message] };
};

export default handleError;
