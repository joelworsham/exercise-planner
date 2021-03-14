import ExerciseItem from '../exercise/ExerciseItem';
import ExerciseItemEditable from '../exercise/ExerciseItemEditable';

function ExerciseList(
  {
    disabled = false,
    exercises,
    onEdit,
    onDelete,
  },
) {
  return (
    <div className="ep-exercise-list">
      {exercises.map((exercise) => (
        <ExerciseItemEditable
          key={exercise.id}
          disabled={disabled}
          onEdit={() => onEdit(exercise)}
          onDelete={() => onDelete(exercise)}
        >
          <ExerciseItem {...exercise}/>
        </ExerciseItemEditable>
      ))}
    </div>
  );
}

export default ExerciseList;
