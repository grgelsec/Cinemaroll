import { useEffect, useRef, useState } from "react";

export default function UserFeatures() {

// this is completely unrelated, i was just learning ts generics
/*
interface Animal {
  name: string
}

interface Human {
  firstName: string
  lastName: string
}

export const getDisplayName = <TItem extends Animal | Human>(
  item: Animal | Human
): TItem extends Human ? { humanName: string } : { animal: string } => {
  if ("name" in item) {
    return {
      animalName: item.name,
    }
  }
}
*/

    //type for refs 
    type refType = HTMLDivElement | null;

    //React hook, allows you to reference the DOM without rerenders 
    //useRef allows you to set a reference to something in the dom and manipulate it w/o rerenders
    const eye = useRef<HTMLDivElement>(null)
    const star = useRef<HTMLDivElement>(null)
    const heart = useRef<HTMLDivElement>(null)
    const list = useRef<HTMLDivElement>(null)
    const flames = useRef<HTMLDivElement>(null)

  const buttonIcons = [
    {
      //eye
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path
            fill-rule="evenodd"
            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      reference: eye,
    },
    {
      //star
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      reference: star,
    },
    {
      //heart
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      ),
      reference: heart,
    },
    {
      //list
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
        </svg>
      ),
      reference: list,
    },
    {
      //flames
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      reference: flames,
    },
  ];

  type Movie = {
    poster_path: string;
    title: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
  };

  type MovieAPIResponse = {
    results: Movie[];
  };

  const [posterList, setPosterList] = useState<Movie[]>([]);

  //function that scrolls smoothly to ref
  const scrollToRef = (ref: React.RefObject<refType> ) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const getPoster = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: MovieAPIResponse = await response.json();
        setPosterList(data.results);
        console.log(data.results.slice(0, 40));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPoster();
  }, []);

  return (
    <body className="font-mono">
      <div className="flex justify-center px-40 py-10">
        <nav className="flex justify-center space-x-3 lg:w-5/12 2xl:w-4/12 md:w-7/12 sm:w-11/12 xs-w-6/12 py-2 rounded-xl bg-lightPurp overflow-x-scroll hide-scrollbar">
          {buttonIcons.map((x) => (
            <button className="flex row items-start rounded-xl p-5 border-white hover:bg-indigo-600 transition-sexy"
            onClick={() => scrollToRef(x.reference)}>
              {x.icon}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex col flex-wrap justify-center lg:px-40 md:px-20 sm:px-20 space-y-10">
        <div className="flex col flex-wrap justify-center text-whitePurp font-semibold py-2 w-8/12" ref={eye}>
          <h1 className="py-2">What have you watched?</h1>
          <p className="flex flex-wrap justify-center text-center text-whitePurp border-t opacity-70 font-sans font-light left-0 py-3">
            Let us know what you've seen! Cinemaroll allows you to keep track of
            every movie that you've watched. Build your library and keep a
            running log!
          </p>
          <div className="flex flex-wrap row justify-center gap-3">
            {posterList.slice(17, 20).map((movie) => (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="flex items-center rounded-xl lg:w-3/12 md:w-3/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
              ></img>
            ))}
          </div>
        </div>
        <div className="flex col flex-wrap justify-center text-whitePurp font-semibold py-2 w-8/12" ref={star}>
          <h1 className="py-2">What would you rate it?</h1>
          <p className="flex flex-wrap justify-center text-center text-whitePurp border-t opacity-70 font-sans font-light left-0 py-3">
            Rate each film to record how you feel about it! While you're at it,
            Go more in depth on what you loved or hated. No wrong answers...
            hopefully.
          </p>
          <div className="flex flex-wrap row items-center justify-center gap-3 ">
            {posterList.slice(19, 20).map((movie) => (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="flex items-center rounded-xl lg:w-6/12 md:w-6/12 hover:opacity-50 hover:outline-none hover:border-transparent ring-4 ring-lightPurp transition-sexy mt-3"
              ></img>
            ))}
            <h1 className="flex row items-center text-indigo-500 font-semibold p-5 bg-whitePurp rounded-xl ring-2">
              Rating:
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
            </h1>
          </div>
        </div>
        <div className="flex col flex-wrap justify-center text-whitePurp font-semibold py-2 w-8/12" ref={heart}>
          <h1 className="py-2">Did you love it it?</h1>
          <p className="flex flex-wrap justify-center text-center text-whitePurp border-t opacity-70 font-sans font-light left-0 py-3 ">
            With each film you watch, take the opportunity to show us that you
            loved it! If you really liked it, give the film a 'heart' indicating
            to others what floats your boat.
          </p>
          <div className="flex row space-x-5 justify-center items-center">
            {posterList.slice(9, 10).map((movie) => (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="relative flex items-center rounded-xl lg:w-6/12 md:w-6/12 opacity-50 outline-none border-transparent ring-4 ring-indigo-500 transition-sexy mt-3"
              ></img>
            ))}
            <div className="sticky p-3  bg-red-500 rounded-xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="flex w-14 h-14 rounded-xl"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex col flex-wrap justify-center text-whitePurp font-semibold py-2 w-8/12" ref={list}>
          <h1 className="py-2">Don't know what to watch?</h1>
          <p className="flex flex-wrap justify-center text-center text-whitePurp border-t opacity-70 font-sans font-light left-0 py-3">
            Ever have those times where you don't know what to watch? Lists
            allow you to search through specfic genres to find what you're
            looking for. Maybe a classic or sad film, there is a list for what
            you want.
          </p>
          <h1 className="border-b border-mediumPurp font-light">
            Trending Action
          </h1>
          <div className="flex flex-wrap row items-center justify-center gap-3 py-2 ">
            {posterList.slice(10, 14).map((movie) => (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="flex items-center rounded-xl lg:w-2/12 md:w-4/12 sm:w-5/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
              ></img>
            ))}
          </div>
          <h1 className="border-b border-mediumPurp font-light">Must See</h1>
          <div className="flex flex-wrap row items-center justify-center gap-3 py-2 ">
            {posterList.slice(14, 18).map((movie) => (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="flex items-center rounded-xl lg:w-2/12 md:w-4/12 sm:w-5/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
              ></img>
            ))}
          </div>
          <h1 className="border-b border-mediumPurp font-light">Hidden Gems</h1>
          <div className="flex flex-wrap row items-center justify-center gap-3 py-2 ">
            {posterList.slice(5, 9).map((movie) => (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="flex items-center rounded-xl lg:w-2/12 md:w-4/12 sm:w-5/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
              ></img>
            ))}
          </div>
        </div>
        <div className="flex col flex-wrap justify-center text-whitePurp font-semibold py-2 w-8/12" ref={flames}>
          <h1 className="py-2">Have any hot takes?</h1>
          <p className="flex flex-wrap justify-center text-center text-whitePurp border-t opacity-70 font-sans font-light left-0 py-3 ">
            Do you have any hills you want to die on? Maybe you have some wild
            movie opinions that you'd love to discuss. Hot takes is an open
            field for discussion and debate about movie opinions that not
            everyone is going to love.
          </p>
          <div className="flex flex-wrap row items-center justify-center py-2 gap-3">
            {posterList.slice(16, 17).map((movie) => (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="flex items-center rounded-xl lg:w-3/12 md:w-3/12 hover:opacity-50 hover:outline-none hover:border-transparent hover:ring-4 hover:ring-indigo-500 transition-sexy mt-3"
              ></img>
            ))}
            <div className=" py-2 px-10 font-sans font-light text-center rounded-3xl text-lightPurp">
              "People should stop making these kind of films because they don't
              resonate with modern audiances. Anyone disagree?"
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
