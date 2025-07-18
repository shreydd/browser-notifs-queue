export default function Loader() {
    const emptyCards = [1,2,3,4,5,6,7,8,9]
  return (
    <div className="grid grid-cols-1 md:grid-col-2 xl:grid-cols-3 gap-4">
        {
            emptyCards.map((item) => (
                <div className="border w-full rounded min-h-28 animate-pulse h-full shadow" key={item}></div>
            ))
        }
    </div>
  )
}
