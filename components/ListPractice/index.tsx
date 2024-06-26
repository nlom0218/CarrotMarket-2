const ListPractice = () => {
  return (
    <div
      className="bg-white sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100
        w-full shadow-lg p-5 rounded-3xl max-w-screen-sm flex flex-col gap-4"
    >
      {['KHD', 'WKH', 'Nico', 'You', ''].map((person, index) => (
        <div
          key={index}
          className="flex items-center gap-5 border-b-2 pb-5 last:border-0 last:pb-0 group"
        >
          <div className="size-10 bg-blue-400 rounded-full" />
          <span className="text-lg font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300 group-hover:text-red-500">
            {person}
          </span>
          <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full relative">
            <span className="z-10">{index}</span>
            <div className="size-6 bg-red-500 rounded-full absolute animate-ping" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPractice;
