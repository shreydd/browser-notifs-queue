export default function Loader() {
  const emptyCards = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div className="grid grid-cols-1 md:grid-col-2 xl:grid-cols-3 gap-4">
      {emptyCards.map((item) => (
        <div
          className="border w-full rounded min-h-48 animate-pulse h-full shadow"
          key={item}
        ></div>
      ))}
    </div>
  );
}
