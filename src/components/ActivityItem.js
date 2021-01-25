import ActivityCategoryIcon from './ActivityCategoryIcon';

function ActivityItem(
  {
    category,
    className = '',
    name,
  },
) {
  return (
    <div className={`ep-activity-item ${className}`}>
      <div className="ep-activity-item-container d-flex align-items-center">
        {!!category && (
          <div className="ep-activity-item-category d-flex align-items-center justify-content-center">
            <ActivityCategoryIcon/>
          </div>
        )}

        <div className="ep-activity-item-name">
          {name}
        </div>
      </div>
    </div>
  );
}

export default ActivityItem;
