import React, { useState } from 'react';
import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';

import AddActivity from './AddActivity';
import DayActivitiesList from './DayActivitiesList';
import storage from '../lib/storage';

function DayActivities(
  {
    activities,
    className = '',
    day,
    onAdd,
    onRemove,
  },
) {
  const dayFocusStorageKey = `dailyFocus${day}`;

  const [dayFocus, updateDayFocus] = useState(storage.get(dayFocusStorageKey) || '');

  const handleUpdateFocus = (event) => {
    updateDayFocus(event.target.value);
    storage.save(dayFocusStorageKey, event.target.value);
  };

  return (
    <Accordion className={`ep-day-activities ${className}`}>
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          eventKey={day}
          variant="link"
        >
          {day} {!!dayFocus && `- ${dayFocus}`}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={day}>
          <Card.Body>
            <Accordion>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={`${day}-edit`}
                  variant="link"
                >
                  Edit Day
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={`${day}-edit`}>
                  <Card.Body>
                    <Row>
                      <Col>
                        <AddActivity
                          className="mb-4"
                          onAdd={(addActivityIds) => onAdd(addActivityIds, day)}
                        />
                      </Col>
                      <Col>
                        <Form>
                          <Form.Group controlId="formFocus">
                            <Form.Label>Daily Focus</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Legs, Arms, etc..."
                              value={dayFocus}
                              onChange={handleUpdateFocus}
                            />
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            {!!activities.length && (
              <DayActivitiesList
                activities={activities}
                className="mt-4"
                onRemove={(activityId) => onRemove(activityId, day)}
              />
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default DayActivities;
