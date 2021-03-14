import {Button, ButtonGroup, Form} from 'react-bootstrap';
import React from 'react';

import exercisesQuery from '../../graphql/queries/exercise/exercises';
import makeRequest from '../../util/graphql/makeRequest';
import getItems from '../../util/graphql/getItems';
import log from '../../lib/log';

class ActivityAdd extends React.Component {
  state = {
    addMode: 'exercise',
    exercises: [],
    loading: false,
    selectedExercise: '',
    selectedExercise2: '',
    validated: false,
  }

  handleAdd(event) {
    event.preventDefault();

    const {
      addMode,
      exercises,
      selectedExercise,
      selectedExercise2,
    } = this.state

    if (event.currentTarget.checkValidity() !== false) {
      const exercises = [exercises.find(({id}) => `${id}` === selectedExercise)];
      if (selectedExercise2) {
        exercises.push(exercises.find(({id}) => `${id}` === selectedExercise2))
      }
      this.props.onAdd({exercises, type: addMode});
      this.setState({
        selectedExercise: '',
        selectedExercise2: '',
        validated: false,
      })
    } else {
      this.setState({validated: true})
    }
  }

  async getActivities() {
    this.setState({loading: true});

    const {data, errors} = await makeRequest({
      query: exercisesQuery,
    })

    if (errors) {
      log.error('Could not get exercises.', errors);
    } else {
      this.setState({exercises: getItems({data}, 'exercises')});
    }

    this.setState({loading: false});
  }

  async componentDidMount() {
    await this.getActivities();
  }

  render() {
    const {
      className = '',
    } = this.props;
    const {
      addMode,
      exercises,
      loading,
      selectedExercise,
      selectedExercise2,
      validated,
    } = this.state;

    return (
      <div className={`ep-add-activity ${className}`}>
        <Form
          noValidate
          validated={validated}
          onSubmit={this.handleAdd}
        >
          <ButtonGroup
            aria-label="Choose add mode"
            className="mb-3"
          >
            <Button
              disabled={loading}
              variant={addMode === 'exercise' ? 'secondary' : 'outline-secondary'}
              onClick={() => this.setState({addMode: 'exercise'})}
            >
              Exercise
            </Button>
            <Button
              disabled={loading}
              variant={addMode === 'superset' ? 'secondary' : 'outline-secondary'}
              onClick={() => this.setState({addMode: 'superset'})}
            >
              Superset
            </Button>
          </ButtonGroup>

          <div className="d-flex">
            <div className="d-flex-grow mr-2">
              <Form.Group controlId="validateExercise">
                <Form.Control
                  as="select"
                  disabled={loading}
                  required
                  value={selectedExercise}
                  onChange={(event) => this.setState({selectedExercise: event.target.value})}
                >
                  <option value="">- Select an Exercise -</option>
                  {exercises.map((exercise) => (
                    <option
                      key={exercise.id}
                      value={exercise.id}
                    >
                      {exercise.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please choose an exercise
                </Form.Control.Feedback>
              </Form.Group>

              {addMode === 'superset' && (
                <Form.Group
                  className="mb-0 mt-2"
                  controlId="validateExercise2"
                >
                  <Form.Control
                    as="select"
                    disabled={loading}
                    required
                    value={selectedExercise2}
                    onChange={(event) => this.setState({selectedExercise2: event.target.value})}
                  >
                    <option value="">- Select an Exercise -</option>
                    {exercises.map((exercise) => (
                      <option
                        key={exercise.id}
                        value={exercise.id}
                      >
                        {exercise.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please choose an exercise
                  </Form.Control.Feedback>
                </Form.Group>
              )}
            </div>

            <div>
              <Button
                disabled={loading}
                type="submit"
              >
                Add {addMode === 'superset' ? 'Superset' : 'Exercise'}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default ActivityAdd;
