import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function EditActivityModal(
  {
    activity,
    onCancel,
    onUpdate,
  },
) {
  // TODO integrate into Redux
  const [activityState, updateActivityState] = useState(activity);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(activityState);
  };

  const handleUpdateActivityState = (state) => {
    updateActivityState({
      ...activityState,
      ...state,
    });
  };

  return (
    <Modal
      show={true}
      onHide={onCancel}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit "{activityState.name}"</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          noValidate
          onSubmit={handleSubmit}
          validated={true}
        >
          <Form.Group controlId="validateActivity">
            <Form.Label>Activity Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Overhead Press, Squats, Bicep Curls, etc."
              value={activityState.name}
              onChange={(event) => handleUpdateActivityState({
                name: event.target.value,
              })}
            />
            <Form.Control.Feedback type="invalid">
              Enter an activity name
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => onUpdate(activityState)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditActivityModal;
