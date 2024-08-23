import Landing from "./components/homepage";
import Films, { Film } from "./components/films";
import { Route, Routes } from "react-router-dom";
import Create from "./components/createaccount";
import FilmLists from "./components/list";
import { ListPage } from "./components/list";
import Profile from "./components/profile";
import SignIn from "./components/signin";
import { AuthPage } from "./components/signin";
import Home from "./components/home";
import { CreateRating } from "./components/profile";
import Search from "./components/search";

function App() {
  return (
    <body className="">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/createaccount" element={<Create />} />
        <Route path="/lists" element={<FilmLists />} />
        <Route path="/film/:movieID" element={<Film />} />
        <Route path="/list/:listID" element={<ListPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-in/auth-page" element={<AuthPage />} />
        <Route path="/add-rating" element={<CreateRating />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </body>
  );
}

export default App;
