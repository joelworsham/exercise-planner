import { Button } from 'react-bootstrap';

function ExerciseItemEditable(
  {
    children,
    className= '',
    disabled = false,
    onEdit,
    onDelete,
  },
) {
  return (
    <div className={`ep-exercise-item-editable d-flex justify-content-between ${className}`}>
      {children}
      <div className="ep-exercise-item-editable-actions d-flex ml-2">
        <Button
          disabled={disabled}
          variant="outline-secondary mr-2"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          disabled={disabled}
          variant="outline-danger"
          onClick={onDelete}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default ExerciseItemEditable
