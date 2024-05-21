import NavBar from "./navbar";

export default function Create() {
  return (
    <>
      <NavBar></NavBar>
      <div className="flex col justify-center py-40 lg:px-40 md:px-40 sm:px-40">
        <div 
        className="flex col flex-wrap justify-center items-center xl:w-4/12 lg:w-5/12 md:w-7/12 sm:w-11/12 py-8 text-white font-extrabold bg-indigo-500 rounded-xl font-mono">
          <div 
          className="space-y-2">
            <div 
            className="flex justify-center">
              <h1 
              className="py-3 text-3xl ring-4 rounded-xl ring-white px-2 ">Create Account</h1>
            </div>
            <form className="space-y-2 py-2">
              <h1>Username:</h1>
              <input
                type="input"
                className="flex px-4 py-1 bg-white rounded-xl text-black"
              ></input>
              <h1>Password:</h1>
              <input
                type="password"
                className="flex px-4 py-1 bg-white rounded-xl text-black"
              ></input>
              <h1>Confirm Password:</h1>
              <input
                type="password"
                className="flex px-4 py-1 bg-white rounded-xl text-black"
              ></input>
              <div className="flex justify-center py-2">
                <button
                  type="submit"
                  className="px-10 py-3 bg-white text-mediumPurp rounded-xl"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
