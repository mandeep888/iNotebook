
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/about"element={<About/>}></Route>
          <Route exact path="/"element={<Home/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
