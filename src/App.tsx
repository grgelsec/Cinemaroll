import Home from "./components/homepage";
import Films from "./components/films";
import { Route, Routes } from "react-router-dom";
import Create from "./components/createaccount";
import SignIn from "./components/signin";
import FilmLists from "./components/list";
import Reccomend from "./components/reccomender";

function App() {
  return (
    <>
      <Routes>
        <Route key={'home'} path="/" element={<Home/>}/>
        <Route path="/films" element={<Films/>} />
        <Route path="/createaccount" element={<Create/>} />
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/lists" element={<FilmLists/>}/>
        <Route path="/reccomender" element={<Reccomend/>}/>
      </Routes>
    </>
  );
}

export default App;