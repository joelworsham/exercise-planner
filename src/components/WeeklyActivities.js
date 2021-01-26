import React from 'react';

import storage from '../lib/storage';
import getUniqueId from '../util/getUniqueId';
import DayActivities from './DayActivities';

class WeeklyActivities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weeklyActivities: storage.get('weeklyActivities') || {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      },
    };
  }

  addActivity([activityId, activity2Id], day) {
    const activities = storage.get('activities', []);

    let dayActivity = { id: getUniqueId('day-activity-') };

    if (activity2Id) {
      dayActivity.superset = [
        { exercise: activities.find(({ id }) => `${id}` === activityId) },
        { exercise: activities.find(({ id }) => `${id}` === activity2Id) },
      ];
    } else {
      dayActivity.exercise = activities.find(({ id }) => `${id}` === activityId);
    }

    this.setState(({ weeklyActivities }) => ({
      weeklyActivities: {
        ...weeklyActivities,
        [day]: weeklyActivities[day].concat(dayActivity),
      },
    }), () => {
      storage.save('weeklyActivities', this.state.weeklyActivities);
    });
  }

  removeActivity(activityId, day) {
    this.setState(({ weeklyActivities }) => ({
      weeklyActivities: {
        ...weeklyActivities,
        [day]: weeklyActivities[day].filter(({ id }) => id !== activityId),
      },
    }), () => {
      storage.save('weeklyActivities', this.state.weeklyActivities);
    });
  }

  render() {
    return (
      <div className="ep-weekly-activities">
        {Object.keys(this.state.weeklyActivities).map((day) => (
          <DayActivities
            key={`day-accordion-${day.toLowerCase()}`}
            activities={this.state.weeklyActivities[day]}
            className="mb-4"
            day={day}
            onAdd={(addActivityIds) => this.addActivity(addActivityIds, day)}
            onRemove={(activityId) => this.removeActivity(activityId, day)}
          />
        ))}
      </div>
    );
  }
}

export default WeeklyActivities;
