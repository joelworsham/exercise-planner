import React from 'react';

import Page from '../layout/Page';
import ExerciseList from '../exercise/ExerciseList';
import ExerciseCreate from '../exercise/ExerciseCreate';
import ExerciseEditModal from '../exercise/ExerciseEditModal';
import {Card} from 'react-bootstrap';
import makeRequest from '../../util/graphql/makeRequest';
import exercisesQuery from '../../graphql/queries/exercise/exercises';
import exerciseCreateMutation from '../../graphql/mutations/exercise/exerciseCreate';
import log from '../../lib/log';
import exerciseDeleteMutation from '../../graphql/mutations/exercise/exerciseDelete';
import exerciseUpdateMutation from '../../graphql/mutations/exercise/exerciseUpdate';
import getItems from '../../util/graphql/getItems';

class PageAdmin extends React.Component {
  state = {
    exercises: [],
    editExerciseState: null,
    loading: false,
  }

  async createExercise(exerciseState) {
    this.setState({loading: true});

    const {data, errors} = await makeRequest({
      query: exerciseCreateMutation,
      variables: {
        exercise: exerciseState,
      },
    })

    if (errors) {
      log.error(`Could not create exercise with name: "${exerciseState.name}"`, errors);
    } else {
      this.setState((prevState) => ({
        exercises: [data.exerciseCreate].concat(prevState.exercises),
      }))
    }

    this.setState({loading: false});
  }

  async deleteExercise(exercise) {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Really remove exercise "${exercise.name}"?`)) return;

    this.setState({loading: true});

    const {errors} = await makeRequest({
      query: exerciseDeleteMutation,
      variables: {
        id: exercise.id,
      },
    })

    if (errors) {
      log.error(`Could not delete exercise with name: "${exercise.name}"`, errors);
    } else {
      this.setState((prevState) => ({
        exercises: prevState.exercises.filter(({id}) => id !== exercise.id),
      }))
    }

    this.setState({loading: false});
  }

  async updateExercise(exerciseState) {
    this.setState({loading: true});

    const {data, errors} = await makeRequest({
      query: exerciseUpdateMutation,
      variables: {
        exercise: exerciseState,
      },
    })

    if (errors) {
      log.error(`Could not update exercise with name: "${exerciseState.name}"`, errors);
    } else {
      this.setState((prevState) => ({
        exercises: prevState.exercises.map((exercise) => (
          exercise.id !== data.exerciseUpdate.id
            ? exercise
            : data.exerciseUpdate
        )),
      }))
    }

    this.setState({loading: false, editExerciseState: null});
  }

  async getExercises() {
    this.setState({loading: true});

    const {data, errors} = await makeRequest({
      query: exercisesQuery,
    })

    if (errors) {
      log.error('Could not get exercises', errors);
    } else {
      this.setState({
        exercises: getItems({data}, 'exercises'),
      })
    }

    this.setState({loading: false});
  }

  async componentDidMount() {
    await this.getExercises();
  }

  render() {
    const {
      exercises,
      editExerciseState,
      loading,
    } = this.state;

    return (
      <Page title="Admin">
        <Card>
          <Card.Header>
            <Card.Title className="mb-0">Manage Exercises</Card.Title>
          </Card.Header>

          <Card.Body>
            <ExerciseCreate
              className="mb-4"
              loading={loading}
              onCreate={(exerciseState) => this.createExercise(exerciseState)}
            />
            <ExerciseList
              editable
              exercises={exercises}
              disabled={loading}
              onEdit={(exercise) => this.setState({editExerciseState: exercise})}
              onDelete={(exercise) => this.deleteExercise(exercise)}
            />
          </Card.Body>
        </Card>

        {!!editExerciseState && (
          <ExerciseEditModal
            disbled={loading}
            exercise={editExerciseState}
            onCancel={() => this.setState({editExerciseState: null})}
            onUpdate={(exerciseState) => this.updateExercise(exerciseState)}
          />
        )}
      </Page>
    );
  }
}

export default PageAdmin;
