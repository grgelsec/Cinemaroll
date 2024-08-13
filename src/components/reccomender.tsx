import { useEffect, useState } from "react";
import NavBar from "./navbar";
import OpenAI from "openai";

export default function Reccomend(this: unknown) {
  type Message = {
    content: string;
  };

  const [result, setResult] = useState<Message[]>();

  useEffect(() => {
    //useEffect handles side affects in function componenest, running additional code anfter the DOM has updated

    const questions = ["What is color?", "What is a Dog?", "What is a cat?"];

    async function streamAI() {
      const openai = new OpenAI();

      const responses: Message[] = [];

      try {
        const stream = await openai.chat.completions.create({
          messages: [{ role: "user", content: `${questions[1]}` }],
          model: "gpt-3.5-turbo",
          stream: true,
        });

        for await (const chunk of stream) {
          if (chunk.choices[0]?.delta?.content) {
            responses.push({ content: chunk.choices[0]?.delta?.content });
          }
        }

        setResult(responses);
        //setResult(streamAI();)
        //hey idiot, you cant set state with promises if you expect the state to return a promise
        //so store the result in an array and structure it like Messages[] and then set the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    streamAI();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <body className="flex col flex-wrap justify-center px-40 lg:px-40 md:px-40 sm:px-40 ring-2">
        <div className="flex w-8/12 lg:w-8/12 md:w-8/12 sm:w-8/12 col p-20 ring-2">
          {result?.map((msg) => (
            <p>{msg.content}</p>
          ))}
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
