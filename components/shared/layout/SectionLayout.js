const SectionLayout = ({
  children,
  id,
  className = "",
  containerClassName = "",
  paddingY = "py-20",
  backgroundColor,
  maxWidth = "max-w-7xl",
}) => {
  return (
    <section id={id} className={`${paddingY} ${backgroundColor} ${className}`}>
      <div
        className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 xl:px-[2rem] ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionLayout;
