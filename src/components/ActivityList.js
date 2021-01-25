import ActivityItem from './ActivityItem';
import ActivityItemEditable from './ActivityItemEditable';

function ActivityList(
  {
    activities,
    editable = false,
    onRemove,
  },
) {
  return (
    <div className="ep-activity-list">
      {activities.map((activity) => (
        editable
          ? (
            <ActivityItemEditable
              key={activity.id}
              onRemove={() => onRemove(activity)}
            >
              <ActivityItem {...activity}/>
            </ActivityItemEditable>
          )
          : (
            <ActivityItem
              key={activity.id}
              {...activity}
            />
          )
      ))}
    </div>
  );
}

export default ActivityList;
