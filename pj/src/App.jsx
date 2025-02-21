import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from "react-router-dom";
import Home from "./hometest";
import Login from "./login";
import Signin from "./signin";
import Game from "./game";
import Leaderboard from "./leaderboard";
import First from "./first";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/" element={<First />} />
      </Routes>
    </Router>
  );
}

export default App;