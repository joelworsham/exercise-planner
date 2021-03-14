import ExerciseItem from '../exercise/ExerciseItem';
import ExerciseItemEditable from '../exercise/ExerciseItemEditable';
import ActivityPyramid from '../activity/ActivityPyramid';
import ActivitySuperset from '../activity/ActivitySuperset';

function SessionActivities(
  {
    activities,
    className = '',
    onRemove,
  },
) {
  return (
    <div className={`ep-session-activities-list ${className}`}>
      {activities.map((activity, index) => (
        <ExerciseItemEditable
          key={activity.id}
          className={index < activities.length - 1 ? 'mb-3' : ''}
          onRemove={() => onRemove(activity.id)}
        >
          {
            (() => {
              switch (activity.type) {
              case 'exercise':
                return (
                  <ExerciseItem
                    key={activity.id}
                    {...activity.exercises[0]}
                  />
                );
              case 'pyramid':
                return (
                  <ActivityPyramid>
                    <ExerciseItem
                      key={activity.id}
                      {...activity.exercises[0]}
                    />
                  </ActivityPyramid>
                );
              case 'superset':
                return (
                  <ActivitySuperset>
                    <ExerciseItem {...activity.exercises[0]}/>
                    <ExerciseItem {...activity.exercises[1]}/>
                  </ActivitySuperset>
                );
              default:
                throw new Error(`Unknown activity type: "${activity.type}"`);
              }
            })()
          }
        </ExerciseItemEditable>
      ))}
    </div>
  );
}

export default SessionActivities;
