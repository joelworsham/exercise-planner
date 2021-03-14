import FontAwesome from 'react-fontawesome';

function ActivitySuperset(
  {
    children,
    className = '',
  },
) {
  return (
    <div className={`ep-activity-superset row align-items-center justify-content-between ${className}`}>
      <span className="ep-activity-superset-connector">
        <FontAwesome
          className="ep-activity-superset-connector-icon"
          name="arrows-h"
        />
      </span>
      {children}
    </div>
  );
}

export default ActivitySuperset;
