import ExerciseCategoryIcon from '../exercise/ExerciseCategoryIcon';

function ExerciseItem(
  {
    category,
    className = '',
    name,
  },
) {
  return (
    <div className={`ep-exercise-item ${className}`}>
      <div className="ep-exercise-item-container d-flex align-items-center">
        {!!category && (
          <div className="ep-exercise-item-category d-flex align-items-center justify-content-center">
            <ExerciseCategoryIcon/>
          </div>
        )}

        <div className="ep-exercise-item-name">
          {name}
        </div>
      </div>
    </div>
  );
}

export default ExerciseItem;
