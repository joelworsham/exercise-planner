import axios from 'axios';
import handleError from './handleError';
import logErrors from './logErrors';

const makeRequest = async ({ query, variables }) => {
  const client = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  try {
    const response = await client.post('/graphql', { query, variables });

    // Handle logging of errors
    if (response.data.errors && response.data.errors.length) {
      logErrors(response.data.errors, { query, variables });
    }

    return {
      data: response.data.data,
      errors: response.data.errors || null,
      headers: response.headers,
    };
  } catch (error) {
    // Handle logging of errors
    if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length) {
      logErrors(error.response.data.errors, { query, variables });
    }

    return handleError(error);
  }
};

export default makeRequest;
