export default function HomeHeader() {
  return (
    <div className="">
      <div className="flex justify-center">
        <header className="text-mediumPurp font-bold text-7xl sm:text-6xl py-20  transition duration-300 ease-in-out">
          Welcome to Cinemaroll
        </header>
      </div>
      <div className="flex justify-center">
        <button className="p-5 bg-indigo-500 rounded-xl text-whitePurp font-extrabold shadow-xl shadow-indigo-500 hover:shadow-indigo-700 transition duration-300 ease-in-out">
          Sign up
        </button>
      </div>
    </div>
  );
}
