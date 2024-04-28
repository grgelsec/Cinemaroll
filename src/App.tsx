import Home from "./components/homepage";
import Films from "./components/films";
import { Route, Routes } from "react-router-dom";
import Create from "./components/createaccount";

function App() {
  return (
    <>
      <Routes>
        <Route key={'home'} path="/" element={<Home/>}/>
        <Route path="/films" element={<Films/>} />
        <Route path="/createaccount" element={<Create/>} />
      </Routes>
    </>
  );
}

export default App;