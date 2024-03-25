const InputPractice = () => {
  return (
    <div
      className="bg-white sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100
     w-full shadow-lg p-5 rounded-3xl max-w-screen-sm flex flex-col gap-2
     md:flex-row
     "
    >
      <input
        type="text"
        placeholder="Search here..."
        className="w-full rounded-full py-2
         bg-gray-100 pl-5 outline-none ring ring-transparent
         focus:ring-orange-500 focus:ring-offset-2 transition-shadow
         placeholder:drop-shadow"
      />
      <button className="bg-black text-white py-2 rounded-full active:scale-95 outline-none transition-transform font-medium md:px-10">
        Search
      </button>
    </div>
  );
};

export default InputPractice;
