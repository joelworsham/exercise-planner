import { Button } from 'react-bootstrap';

function ActivityItemEditable(
  {
    children,
    className= '',
    onEdit,
    onRemove,
  },
) {
  return (
    <div className={`ep-activity-item-editable d-flex justify-content-between ${className}`}>
      {children}
      <div className="ep-activity-item-editable-actions d-flex ml-2">
        <Button
          variant="outline-secondary mr-2"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          variant="outline-danger"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default ActivityItemEditable
