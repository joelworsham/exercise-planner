import React, { useState } from 'react';

import Page from '../layout/Page';
import ActivityList from '../ActivityList';
import CreateActivity from '../CreateActivity';
import storage from '../../lib/storage';
import EditActivityModal from '../EditActivityModal';
import { Card } from 'react-bootstrap';

function PageAdmin() {
  const [activities, updateActivities] = useState(storage.get('activities', []));
  const [editActivityState, updateEditActivityState] = useState(null);

  const addActivity = (activity) => {
    const updatedActivities = [activity].concat(activities);
    updateActivities(updatedActivities);
    storage.save('activities', updatedActivities);
  };

  const removeActivity = (activity) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Really remove activity "${activity.name}"?`)) return;
    const updatedActivities = activities.filter(({ id }) => id !== activity.id);
    updateActivities(updatedActivities);
    storage.save('activities', updatedActivities);
  };

  const updateActivity = (activityState) => {
    const updatedActivities = activities.map((activity) => (
      activityState.id === activity.id
        ? { ...activity, ...activityState }
        : activity
    ));
    updateActivities(updatedActivities);
    storage.save('activities', updatedActivities);
    updateEditActivityState(null);
  };

  return (
    <Page title="Admin">
      <Card>
        <Card.Header>
          <Card.Title className="mb-0">Manage Exercises</Card.Title>
        </Card.Header>

        <Card.Body>
          <CreateActivity
            className="mb-4"
            onCreate={addActivity}
          />
          <ActivityList
            activities={activities}
            editable
            onEdit={updateEditActivityState}
            onRemove={removeActivity}
          />
        </Card.Body>
      </Card>

      {!!editActivityState && (
        <EditActivityModal
          activity={editActivityState}
          onCancel={() => updateEditActivityState(null)}
          onUpdate={updateActivity}
        />
      )}
    </Page>
  );
}

export default PageAdmin;
