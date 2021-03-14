import log from '../../lib/log';
import extractNodes from './extractNodes';

/**
 * Returns items array from graphql response which expects it.
 *
 * @param {Object} response Response from graphql query
 * @param {String} key Key containing items in data.
 * @returns {Array} Array of items if present, empty array if not present.
 */
const getItems = (response, key) => {
  if (!response.data) {
    log.error('Got bad response for getItems(); no "data" present on response.');
    return [];
  }

  if (!response.data[key]) {
    log.error(`Got bad response for getItems(); no key "${key}" present on "data".`);
    return [];
  }

  return 'nodes' in response.data[key]
    ? extractNodes(response.data[key])
    : response.data[key];
};

export default getItems;
