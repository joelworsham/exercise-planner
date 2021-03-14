import exerciseFields from '../../fields/exercise';

const exerciseCreateMutation = `
mutation (
  $exercise: CreateExerciseInput!,
) {
  exerciseCreate(
    exercise: $exercise
  ) {
    ${exerciseFields}
  }
}
`;

export default exerciseCreateMutation;
