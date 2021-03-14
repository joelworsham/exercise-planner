import React, {useState} from 'react';

import getItems from '../../util/graphql/getItems';
import makeRequest from '../../util/graphql/makeRequest';
import Session from './Session';
import SessionCreate from './SessionCreate';
import sessionsQuery from '../../graphql/queries/session/sessions';
import log from '../../lib/log';
import sessionCreateMutation from '../../graphql/mutations/session/sessionCreate';

class Sessions extends React.Component {
  state = {
    loading: false,
    sessions: [],
  }

  async createSession(sessionState) {
    this.setState({loading: true});

    const {data, errors} = await makeRequest({
      query: sessionCreateMutation,
      variables: {
        session: sessionState,
      },
    })

    if (errors) {
      log.error('Could not create session', errors);
    } else {
      this.setState((prevState) => ({
        sessions: [data.sessionCreate].concat(prevState.sessions),
      }))
    }

    this.setState({loading: false});
  }

  async getSessions() {
    this.setState({loading: true});

    const {data, errors} = await makeRequest({
      query: sessionsQuery,
    })

    if (errors) {
      log.error('Could not get sessions.', errors);
    } else {
      this.setState({sessions: getItems({data}, 'sessions')});
    }

    this.setState({loading: false});
  }

  async componentDidMount() {
    await this.getSessions();
  }

  render() {
    const {
      loading,
      sessions,
    } = this.state;

    return (
      <div className="ep-sessions">
        <SessionCreate
          loading={loading}
          onCreate={(sessionState) => this.createSession(sessionState)}
        />

        {sessions.length > 0 && sessions.map((session) => (
          <Session
            key={`session-accordion-${session.id}`}
            activities={session.activities}
            className="mb-4"
            name={session.name}
            // onAdd={(activity) => addActivity(activity, session.id)}
            // onRemove={(activityId) => removeActivity(activityId, session.id)}
          />
        ))}
      </div>
    );
  }
}

export default Sessions;
