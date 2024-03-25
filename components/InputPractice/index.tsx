const InputPractice = () => {
  return (
    <div
      className="bg-white sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100
     w-full shadow-lg p-5 rounded-3xl max-w-screen-sm flex flex-col gap-2
     md:flex-row
     "
    >
      <input
        type="email"
        placeholder="Email address"
        className="w-full rounded-full py-2
         bg-gray-100 pl-5 outline-none ring ring-transparent
         focus:ring-green-500 focus:ring-offset-2 transition-shadow
         placeholder:drop-shadow
         focus:invalid:ring-red-500 peer"
        required
      />
      <span className="text-red-500 font-medium hidden peer-invalid:block">
        Email is required.
      </span>
      <button
        className="text-white py-2 rounded-full active:scale-95 outline-none transition-transform font-medium md:px-10
        bg-gradient-to-tr from-cyan-500 to-purple-400 peer-invalid:from-red-500 peer-invalid:to-purple-500"
      >
        Search
      </button>
    </div>
  );
};

export default InputPractice;
