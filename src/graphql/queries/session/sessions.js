import sessionFields from '../../fields/session';

const sessionsQuery = `
query {
  sessions {
    nodes {
      node {
        ${sessionFields}
      }
    }
  }
}
`;


export default sessionsQuery;
