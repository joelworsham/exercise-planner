const exerciseDeleteMutation = `
mutation (
  $id: Int!,
) {
  exerciseDelete(
    id: $id,
  )
}
`;

export default exerciseDeleteMutation;
