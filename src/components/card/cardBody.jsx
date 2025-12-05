export default function CardBody({
  text = "",
  flex = false,
  direction = "col",
  gap = 4,
  padding = "p-5",
  children,
  align = "start",
  justify = "start",
  textColor = "text-gray-900",
}) {
  // Map direction values to Tailwind classes
  const directionMap = {
    row: "flex-row",
    col: "flex-col",
  };

  // Map gap values to Tailwind classes
  const gapMap = {
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  // Map align values to Tailwind classes
  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  // Map justify values to Tailwind classes
  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    between: "justify-between",
    end: "justify-end",
  };

  // Map text color values
  const textColorMap = {
    "text-gray-900": "text-gray-900",
    "text-red-600": "text-red-600",
    "text-green-600": "text-green-600",
    "text-blue-600": "text-blue-600",
    "text-yellow-600": "text-yellow-600",
    "text-gray-500": "text-gray-500",
  };

  const flexClasses = flex
    ? `flex ${directionMap[direction]} ${gapMap[gap]} ${alignMap[align]} ${justifyMap[justify]}`
    : "";

  const finalTextColor = textColorMap[textColor] || textColor;

  return (
    <div className={`${padding} ${flexClasses}`}>
      {text && <p className={`${finalTextColor} text-md font-medium`}>{text}</p>}
      {children}
    </div>
  );
}