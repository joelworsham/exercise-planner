import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const getDefaultExerciseState = () => ({
  name: '',
})

function ExerciseCreate(
  {
    className = '',
    loading = false,
    onCreate,
  },
) {
  const [exerciseState, updateExerciseState] = useState(getDefaultExerciseState());
  const [validated, updateValidated] = useState(false);

  const handleCreate = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() !== false) {
      onCreate(exerciseState);
      updateExerciseState(getDefaultExerciseState())
      updateValidated(false);
    } else {
      updateValidated(true);
    }
  };

  const handleUpdateExerciseState = (state) => {
    updateExerciseState({
      ...exerciseState,
      ...state,
    });
  };

  return (
    <Form
      className={`ep-create-exercise ${className}`}
      noValidate
      validated={validated}
      onSubmit={handleCreate}
    >
      <Form.Group controlId="validateExercise">
        <Form.Label>Exercise Name</Form.Label>
        <Form.Control
          type="text"
          disabled={loading}
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

      <Button
        disabled={loading}
        type="submit"
      >
        {loading ? 'Creating...' : 'Create Exercise'}
      </Button>
    </Form>
  );
}

export default ExerciseCreate;
