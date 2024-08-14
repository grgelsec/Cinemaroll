import NavBar from "./navbar";
import Movies from "./trending";
import HomeHeader from "./welcome";
import UserFeatures from "./previews";
import { Outlet } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <>
        <div className="hide-scrollbar scroll-smooth">
          <NavBar />
          <HomeHeader />
          <Movies />
          <UserFeatures />
          <Outlet />
        </div>
      </>
    </div>
  );
}
