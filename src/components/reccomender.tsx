import NavBar from "./navbar";

export default function Reccomend() {
  return (
    <>
      <NavBar></NavBar>
      <body className="flex col flex-wrap justify-center px-40 lg:px-40 md:px-40 sm:px-40 ring-2">
      <div className="flex w-8/12 lg:w-8/12 md:w-8/12 sm:w-8/12 col p-20 ring-2">

        </div>
      <div className="">
        <div className="flex justify-center p-3 font-bold text-white lg:gap-3 md:gap-3 sm:gap-3 ring-2">
              <button className="py-2 px-2 bg-lightPurp ring-white rounded-xl hover:ring-2 hover:ring-darkPurp hover:bg-mediumPurp transition-sexy ring-2">
                Action
              </button>
              <button className="p-2 bg-lightPurp ring-white rounded-xl hover:ring-2 hover:ring-darkPurp hover:bg-mediumPurp transition-sexy ring-2">
                Romance
              </button>
              <button className="p-2 bg-lightPurp ring-white rounded-xl hover:ring-2 hover:ring-darkPurp hover:bg-mediumPurp transition-sexy ring-2">
                Comedy
              </button>
              <button className="p-2 bg-lightPurp ring-white rounded-xl hover:ring-2 hover:ring-darkPurp hover:bg-mediumPurp transition-sexy ring-2">
                Drama
              </button>
              <button className="p-2 bg-lightPurp ring-white rounded-xl hover:ring-2 hover:ring-darkPurp hover:bg-mediumPurp transition-sexy ring-2">
                Musical
              </button>
              <button className="p-2 bg-lightPurp ring-white rounded-xl hover:ring-2 hover:ring-darkPurp hover:bg-mediumPurp transition-sexy ring-2">
                Romcom
              </button>
        </div>
      </div>
      </body>
    </>
  );
}
