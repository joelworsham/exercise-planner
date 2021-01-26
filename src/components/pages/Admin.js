import React, { useState } from 'react';

import Page from '../layout/Page';
import ActivityList from '../ActivityList';
import CreateActivity from '../CreateActivity';
import storage from '../../lib/storage';
import EditActivityModal from '../EditActivityModal';

function PageAdmin() {
  const [activities, updateActivities] = useState(storage.get('activities', []));
  const [editActivityState, updateEditActivityState] = useState(null);

  const addActivity = (activity) => {
    const updatedActivities = activities.concat(activity);
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
