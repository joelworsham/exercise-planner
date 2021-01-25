function Icon(
  {
    children,
    size = 'md',
  }
) {
  const classes = ['ep-icon', size]

  return (
    <span className={classes.join(' ')}>
      {children}
    </span>
  )
}

export default Icon;
