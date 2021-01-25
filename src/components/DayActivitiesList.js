import ActivityItem from './ActivityItem';
import ActivitySuperset from './ActivitySuperset';
import ActivityItemEditable from './ActivityItemEditable';

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
            activity.superset
              ? (
                <ActivitySuperset>
                  <ActivityItem {...activity.superset[0].exercise}/>
                  <ActivityItem {...activity.superset[1].exercise}/>
                </ActivitySuperset>
              )
              : (
                <ActivityItem
                  key={activity.id}
                  {...activity.exercise}
                />
              )
          }
        </ActivityItemEditable>
      ))}
    </div>
  );
}

export default DayActivitiesList;
