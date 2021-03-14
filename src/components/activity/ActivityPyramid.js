import IconPyramid from '../icons/IconPyramid';

function ActivityPyramid(
  {
    children,
  },
) {
  return (
    <div className="ep-activity-pyramid">
      {children}
      <IconPyramid/>
    </div>
  );
}

export default ActivityPyramid;
