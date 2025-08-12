const SectionLayout = ({
  children,
  id,
  className = "",
  containerClassName = "",
  paddingY = "py-20",
  backgroundColor = "bg-[#111111]",
  maxWidth = "max-w-7xl",
}) => {
  return (
    <section id={id} className={`${paddingY} ${backgroundColor} ${className}`}>
      <div
        className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-[8rem] ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionLayout;
