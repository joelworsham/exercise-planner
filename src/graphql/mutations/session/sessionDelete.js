const sessionDeleteMutation = `
mutation (
  $id: Int!,
) {
  sessionDelete(
    id: $id,
  )
}
`;

export default sessionDeleteMutation;
