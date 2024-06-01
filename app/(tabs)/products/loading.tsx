export default function Loading() {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="*:rounded-md flex gap-5 " key={index}>
          <div className="bg-neutral-700 size-28" />
          <div className="flex flex-col gap-2 *:rounded-md">
            <div className="bg-neutral-700 h-5 w-40" />
            <div className="bg-neutral-700 h-5 w-20" />
            <div className="bg-neutral-700 h-5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
