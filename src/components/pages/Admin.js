import React, { useState } from 'react';

import Page from '../layout/Page';
import ActivityList from '../ActivityList';
import CreateActivity from '../CreateActivity';
import storage from '../../lib/storage';

function PageAdmin() {
  const [activities, updateActivities] = useState(storage.get('activities') || []);

  const addActivity = (activity) => {
    const updatedActivities = activities.concat(activity);
    updateActivities(updatedActivities);
    storage.save('activities', updatedActivities);
  };

  const removeActivity = (activity) => {
    const updatedActivities = activities.filter(({ id }) => id !== activity.id);
    updateActivities(updatedActivities);
    storage.save('activities', updatedActivities);
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
        onRemove={removeActivity}
      />
    </Page>
  );
}

export default PageAdmin;
