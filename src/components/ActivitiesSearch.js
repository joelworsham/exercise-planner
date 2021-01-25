import ActivityList from './ActivityList';
import { useState } from 'react';

function ActivitiesSearch(
) {
  const [activities, updateActivities] = useState([]);

  return (
    <div className="ep-activities-search">
      <ActivityList activities={activities}/>
    </div>
  );
}

export default ActivitiesSearch;
