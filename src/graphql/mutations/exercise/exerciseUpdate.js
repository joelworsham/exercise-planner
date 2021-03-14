import exerciseFields from '../../fields/exercise';

const exerciseUpdateMutation = `
mutation (
  $exercise: UpdateExerciseInput!,
) {
  exerciseUpdate(
    exercise: $exercise,
  ) {
    ${exerciseFields}
  }
}
`;

export default exerciseUpdateMutation;
