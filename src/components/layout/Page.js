function Page(
  {
    children,
    title,
  },
) {
  return (
    <div className="container page mb-4">
      {!!title && (
        <h1 className="page-title">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}

export default Page;
