export default function CardBody({
  text = "",
  flex = false,
  direction = "col",
  gap = 4,
  padding = "p-5",
  children,
  align = "start",
  justify = "start",
  textColor = "text-red-600",
}) {
  const flexClasses = flex
    ? `flex flex-${direction} gap-${gap} items-${align} justify-${justify}`
    : "";

  return (
    <div className={`${padding} ${flexClasses}`}>
      {text && <p className={`${textColor} text-md`}>{text}</p>}
      {children}
    </div>
  );
}
