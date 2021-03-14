import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const getDefaultSessionState = () => ({
  name: '',
})

function SessionCreate(
  {
    className = '',
    loading = false,
    onCreate,
  },
) {
  const [sessionState, updateSessionState] = useState(getDefaultSessionState());
  const [validated, updateValidated] = useState(false);

  const handleCreate = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() !== false) {
      onCreate(sessionState);
      updateSessionState(getDefaultSessionState())
      updateValidated(false);
    } else {
      updateValidated(true);
    }
  };

  const handleUpdateSessionState = (state) => {
    updateSessionState({
      ...sessionState,
      ...state,
    });
  };

  return (
    <Form
      className={`ep-create-session ${className}`}
      noValidate
      validated={validated}
      onSubmit={handleCreate}
    >
      <Form.Group controlId="validateSession">
        <Form.Label>Session Name</Form.Label>
        <Form.Control
          type="text"
          disabled={loading}
          required
          placeholder="Monday, Thursday, Weekday, Morning, etc."
          value={sessionState.name}
          onChange={(event) => handleUpdateSessionState({
            name: event.target.value,
          })}
        />
        <Form.Control.Feedback type="invalid">
          Enter an session name
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        disabled={loading}
        type="submit"
      >
        {loading ? 'Creating...' : 'Create Session'}
      </Button>
    </Form>
  );
}

export default SessionCreate;
