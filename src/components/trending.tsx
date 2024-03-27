export function Movies() {


  //Promise<Type> is a generic interface, indicates the type of data the Promise is returning
  const getMovie = async (): Promise<void> => {
    try {
        //Uses await to pause the execution of async function until the promise returned by fetch is resolved
        //fetch always returns a promise
        //in the future type async functions with Promise<>
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key="
      );

      // that indicates if the HTTP request was successful
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
    
    // TypeScript can infer the type of `data` from the `await` expression
    // When you use the await keyword before an expression that returns a Promise, 
    // TypeScript can "look inside" the Promise and infer the type of the resolved value.
    // In this case, await response.json() means that TypeScript knows the resolved value 
    // of the Promise is the data returned by response.json(), 
    // which is typically a JavaScript object or array representing the parsed JSON data.
      
      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  getMovie();

  //what not to do is below in comments OUTDATED TECH U RAT
  /*
    nterface MovieApiResponse {
    results: any[];
    }

    const getMovie = (): void => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json() as Promise<MovieApiResponse>;
        })
        .then(json => console.log(json))
        .catch(error => console.error('Error fetching data:', error));
    }

    getMovie(); // Call the function to execute the fetch request.

      */

  return <div></div>;
}
