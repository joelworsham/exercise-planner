import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ExerciseEditModal(
  {
    disabled = false,
    exercise,
    onCancel,
    onUpdate,
  },
) {
  const [exerciseState, updateExerciseState] = useState(exercise);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(exerciseState);
  };

  const handleUpdateExerciseState = (state) => {
    updateExerciseState({
      ...exerciseState,
      ...state,
    });
  };

  return (
    <Modal
      show={true}
      onHide={onCancel}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit "{exerciseState.name}"</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          noValidate
          onSubmit={handleSubmit}
          validated={true}
        >
          <Form.Group controlId="validateExercise">
            <Form.Label>Exercise Name</Form.Label>
            <Form.Control
              type="text"
              disabled={disabled}
              required
              placeholder="Overhead Press, Squats, Bicep Curls, etc."
              value={exerciseState.name}
              onChange={(event) => handleUpdateExerciseState({
                name: event.target.value,
              })}
            />
            <Form.Control.Feedback type="invalid">
              Enter an exercise name
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          disabled={disabled}
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={disabled}
          variant="primary"
          onClick={() => onUpdate(exerciseState)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExerciseEditModal;
