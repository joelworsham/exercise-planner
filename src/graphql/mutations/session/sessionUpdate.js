import sessionFields from '../../fields/session';

const sessionUpdateMutation = `
mutation (
  $session: UpdateSessionInput!,
) {
  sessionUpdate(
    session: $session,
  ) {
    ${sessionFields}
  }
}
`;

export default sessionUpdateMutation;
