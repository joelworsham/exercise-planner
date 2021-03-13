import userFields from '../../fields/user';

const currentUser = `
{
  currentUser {
    ${userFields}
  }
}
`;


export default currentUser;
