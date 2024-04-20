import NavBar from "./navbar";
import { Movies } from "./trending";
import HomeHeader from "./welcome";
import UserFeatures from "./previews";

export default function Home() {
  return (
    <div>
      <>
          <div className="hide-scrollbar scroll-smooth">
            <NavBar />
            <HomeHeader />
            <Movies />
            <UserFeatures />
          </div>
      </>
    </div>
  );
}
