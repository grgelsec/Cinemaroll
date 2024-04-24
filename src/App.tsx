import Home from "./components/homepage";
import Films from "./components/films";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route key={'home'} path="/" element={<Home/>}/>
        <Route path="/films" element={<Films/>} />
      </Routes>
    </>
  );
}

export default App;