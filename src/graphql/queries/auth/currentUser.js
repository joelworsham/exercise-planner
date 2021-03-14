import user from '../../fields/user';

const currentUser = `
{
  currentUser {
    ${user}
  }
}
`;


export default currentUser;
