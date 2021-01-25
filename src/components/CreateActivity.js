import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import getUniqueId from '../util/getUniqueId';

const getDefaultActivityState = () => ({
  id: getUniqueId('activity-'),
  category: '',
  name: '',
})

function CreateActivity(
  {
    className = '',
    onCreate,
  },
) {
  const [activityState, updateActivityState] = useState(getDefaultActivityState());
  const [validated, updateValidated] = useState(false);

  const handleCreate = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() !== false) {
      onCreate(activityState);
      updateActivityState(getDefaultActivityState())
      updateValidated(false);
    } else {
      updateValidated(true);
    }
  };

  const handleUpdateActivityState = (state) => {
    updateActivityState({
      ...activityState,
      ...state,
    });
  };

  return (
    <Form
      className={`ep-create-activity ${className}`}
      noValidate
      validated={validated}
      onSubmit={handleCreate}
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

      <Button type="submit">
        Create Activity
      </Button>
    </Form>
  );
}

export default CreateActivity;
