import NavBar from "./components/navbar";
import { Movies } from "./components/trending";
import HomeHeader from "./components/welcome";
//import Showcase from "./components/buttonbar";
import UserFeatures from "./components/previews";

function App() {
  return (
    <>
      <div className="hide-scrollbar scroll-smooth">
        <NavBar />
        <HomeHeader />
        <Movies />

        <UserFeatures />
      </div>
    </>
  );
}

export default App;
