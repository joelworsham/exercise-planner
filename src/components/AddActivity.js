import { Button, ButtonGroup, Form } from 'react-bootstrap';

import { useState } from 'react';
import storage from '../lib/storage';

function AddActivity(
  {
    className = '',
    onAdd,
  },
) {
  const activities = storage.get('activities', []);
  activities.sort((a, b) => a.name.localeCompare(b.name));

  const [validated, updateValidated] = useState(false);
  const [selectedActivity, updateSelectedActivity] = useState('');
  const [selectedActivity2, updateSelectedActivity2] = useState('');
  const [addMode, updateAddMode] = useState('exercise');

  const handleAdd = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() !== false) {
      onAdd(selectedActivity2 ? [selectedActivity, selectedActivity2] : [selectedActivity]);
      updateSelectedActivity('');
      updateSelectedActivity2('');
      updateValidated(false);
    } else {
      updateValidated(true);
    }
  };

  return (
    <div className={`ep-add-activity ${className}`}>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleAdd}
      >
        <ButtonGroup
          aria-label="Choose add mode"
          className="mb-3"
        >
          <Button
            variant={addMode === 'exercise' ? 'secondary' : 'outline-secondary'}
            onClick={() => updateAddMode('exercise')}
          >
            Exercise
          </Button>
          <Button
            variant={addMode === 'superset' ? 'secondary' : 'outline-secondary'}
            onClick={() => updateAddMode('superset')}
          >
            Superset
          </Button>
        </ButtonGroup>

        <div className="d-flex">
          <div className="d-flex-grow mr-2">
            <Form.Group controlId="validateActivity">
              <Form.Control
                as="select"
                required
                value={selectedActivity}
                onChange={(event) => updateSelectedActivity(event.target.value)}
              >
                <option value="">- Select an Activity -</option>
                {activities.map((activity) => (
                  <option
                    key={activity.id}
                    value={activity.id}
                  >
                    {activity.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please choose an activity
              </Form.Control.Feedback>
            </Form.Group>

            {addMode === 'superset' && (
              <Form.Group
                className="mb-0 mt-2"
                controlId="validateActivity2"
              >
                <Form.Control
                  as="select"
                  required
                  value={selectedActivity2}
                  onChange={(event) => updateSelectedActivity2(event.target.value)}
                >
                  <option value="">- Select an Activity -</option>
                  {activities.map((activity) => (
                    <option
                      key={activity.id}
                      value={activity.id}
                    >
                      {activity.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please choose an activity
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </div>

          <div>
            <Button type="submit">
              Add {addMode === 'superset' ? 'Superset' : 'Activity'}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AddActivity;
