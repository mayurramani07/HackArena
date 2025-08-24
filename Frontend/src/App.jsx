import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ContestPage from "./pages/ContestPage";
import HackathonPage from "./pages/HackathonPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contests" element={<ContestPage />}/>
         <Route path="/hackathons" element={<HackathonPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
