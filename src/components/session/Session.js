import React from 'react';
import {Accordion, Card} from 'react-bootstrap';

import ActivityAdd from '../activity/ActivityAdd';
import SessionActivities from './SessionActivities';

function Session(
  {
    activities,
    className = '',
    name,
    onAdd,
    onRemove,
  },
) {
  return (
    <Accordion className={`ep-session-activities ${className}`}>
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          eventKey={name}
          variant="link"
        >
          {name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={name}>
          <Card.Body>
            <Accordion>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={`${name}-edit`}
                  variant="link"
                >
                  Edit Session
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={`${name}-edit`}>
                  <Card.Body>
                    <ActivityAdd
                      className="mb-4"
                      onAdd={(activity) => onAdd(activity, name)}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            {!!activities && !!activities.length && (
              <SessionActivities
                activities={activities}
                className="mt-4"
                onRemove={(activityId) => onRemove(activityId, name)}
              />
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Session;
