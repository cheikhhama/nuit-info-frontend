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
  const flexClasses = flex
    ? `flex flex-${direction} gap-${gap} items-${align} justify-${justify}`
    : "";
  return (
    <div className={`${padding} ${flexClasses} ${className}`}>{children}</div>
  );
}
