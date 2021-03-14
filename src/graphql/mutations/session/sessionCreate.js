import sessionFields from '../../fields/session';

const sessionCreateMutation = `
mutation (
  $session: CreateSessionInput!,
) {
  sessionCreate(
    session: $session
  ) {
    ${sessionFields}
  }
}
`;

export default sessionCreateMutation;
