import user from '../../fields/user';

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
      ${user}
    }
  }
}
`;

export default logIn;
