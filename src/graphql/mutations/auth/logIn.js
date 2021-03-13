import userFields from '../../fields/user';

const logIn = `
mutation (
  $email: String!,
  $password: String!,
){
  logIn(
    email: $email,
    password: $password,
  ) {
    user {
      ${userFields}
    }
  }
}
`;

export default logIn;
