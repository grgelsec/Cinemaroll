
import NavBar from './components/navbar'
import { Movies } from './components/trending'
import HomeHeader from './components/welcome'
import Showcase from './components/buttonbar'
import UserFeatures from './components/previews'

function App() {
  

  return (
    <>
     <NavBar/>
     <HomeHeader/>
     <Movies/>
     <Showcase/>
     <UserFeatures/>
    </>
  )
}

export default App
