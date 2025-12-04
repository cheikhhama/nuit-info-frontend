export default function CardHeader({ title }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="font-semibold text-gray-900 text-2xl">{title}</h1>
        </div>
      </div>
    </div>
  );
}
