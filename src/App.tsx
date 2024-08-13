import Home from "./components/homepage";
import Films, { Film } from "./components/films";
import { Route, Routes } from "react-router-dom";
import Create from "./components/createaccount";
import FilmLists from "./components/list";
import Reccomend from "./components/reccomender";
import { ListPage } from "./components/list";
import Profile from "./components/profile";
import AuthPage from "./components/authorizedpage";

function App() {
  return (
    <body className="">
      <Routes>
        <Route key={"home"} path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/createaccount" element={<Create />} />
        <Route path="/lists" element={<FilmLists />} />
        <Route path="/reccomender" element={<Reccomend />} />
        <Route path="/film/:movieID" element={<Film />} />
        <Route path="/list/:listID" element={<ListPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/continue" element={<AuthPage />} />
      </Routes>
    </body>
  );
}

export default App;
