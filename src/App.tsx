import Home from "./components/homepage";
import Films from "./components/films";
import { Route, Routes } from "react-router-dom";
import Create from "./components/createaccount";
import SignIn from "./components/signin";
import FilmLists from "./components/list";
import Reccomend from "./components/reccomender";
import Film from "./components/film";

function App() {
  return (
    <body className="">
      <Routes>
        <Route key={"home"} path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/createaccount" element={<Create />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/lists" element={<FilmLists />} />
        <Route path="/reccomender" element={<Reccomend />} />
        <Route path="/film" element={<Film />} />
      </Routes>
    </body>
  );
}

export default App;
