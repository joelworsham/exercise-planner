import exerciseFields from '../../fields/exercise';

const exercisesQuery = `
query {
  exercises {
    nodes {
      node {
        ${exerciseFields}
      }
    }
  }
}
`;


export default exercisesQuery;
