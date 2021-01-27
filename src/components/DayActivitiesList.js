import ActivityItem from './ActivityItem';
import ActivityItemEditable from './ActivityItemEditable';
import ActivityPyramid from './ActivityPyramid';
import ActivitySuperset from './ActivitySuperset';

function DayActivitiesList(
  {
    activities,
    className = '',
    onRemove,
  },
) {
  return (
    <div className={`ep-day-activities-list ${className}`}>
      {activities.map((activity, index) => (
        <ActivityItemEditable
          key={activity.id}
          className={index < activities.length - 1 ? 'mb-3' : ''}
          onRemove={() => onRemove(activity.id)}
        >
          {
            (() => {
              switch (activity.type) {
                case 'exercise':
                  return (
                    <ActivityItem
                      key={activity.id}
                      {...activity.exercises[0]}
                    />
                  );
                case 'pyramid':
                  return (
                    <ActivityPyramid>
                      <ActivityItem
                        key={activity.id}
                        {...activity.exercises[0]}
                      />
                    </ActivityPyramid>
                  );
                case 'superset':
                  return (
                    <ActivitySuperset>
                      <ActivityItem {...activity.exercises[0]}/>
                      <ActivityItem {...activity.exercises[1]}/>
                    </ActivitySuperset>
                  );
                default:
                  throw new Error(`Unknown activity type: "${activity.type}"`);
              }
            })()
          }
        </ActivityItemEditable>
      ))}
    </div>
  );
}

export default DayActivitiesList;
