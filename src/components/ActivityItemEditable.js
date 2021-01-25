import { Button } from 'react-bootstrap';

function ActivityItemEditable(
  {
    children,
    className= '',
    onRemove,
  },
) {
  return (
    <div className={`ep-activity-item-editable d-flex justify-content-between ${className}`}>
      {children}
      <Button
        variant="outline-danger"
        className="ml-2"
        onClick={onRemove}
      >
        Remove
      </Button>
    </div>
  );
}

export default ActivityItemEditable
