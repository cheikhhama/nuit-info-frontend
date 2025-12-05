export default function CardFooter({
  children,
  flex = true,
  direction = "row",
  gap = 4,
  padding = "p-4",
  align = "center",
  justify = "end",
  className = "",
}) {
  // Map values to Tailwind classes
  const directionMap = {
    row: "flex-row",
    col: "flex-col",
  };

  const gapMap = {
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    between: "justify-between",
    end: "justify-end",
  };

  const flexClasses = flex
    ? `flex ${directionMap[direction]} ${gapMap[gap]} ${alignMap[align]} ${justifyMap[justify]}`
    : "";

  return (
    <div className={`${padding} ${flexClasses} ${className}`}>
      {children}
    </div>
  );
}