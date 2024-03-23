const CardPractice = () => {
  return (
    <div className="bg-white w-full shadow-lg p-5 rounded-3xl max-w-screen-sm dark:bg-gray-600">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold -mb-1 dark:text-gray-300">
            In transit
          </span>
          <span className="text-4xl font-semibold">Coolblue</span>
        </div>
        <div className="size-12 rounded-full bg-orange-400" />
      </div>
      <div className="my-2 flex items-center gap-2">
        <span className="bg-green-400 text-white uppercase px-2.5 py-1.5 text-xs font-medium rounded-full hover:bg-green-500 hover:scale-105 transition cursor-pointer">
          Today
        </span>
        <span className="dark:text-gray-300">9:30-10:30</span>
      </div>
      <div className="relative">
        <div className="absolute bg-gray-200 rounded-full w-full h-2" />
        <div className="absolute bg-green-400 rounded-full w-2/3 h-2" />
      </div>
      <div className="flex justify-between items-start mt-5 text-gray-600 dark:text-gray-300">
        <span>Expected</span>
        <span>Sorting center</span>
        <span>In transit</span>
        <span className="text-gray-400  dark:text-gray-500">Delivered</span>
      </div>
    </div>
  );
};

export default CardPractice;
