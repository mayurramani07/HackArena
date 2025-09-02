import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ContestPage from "./pages/ContestPage";
import HackathonPage from "./pages/HackathonPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Feedback from "./pages/Feedbackpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contests" element={<ContestPage />}/>
        <Route path="/hackathons" element={<HackathonPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/hackathons" element={<HackathonPage/>} />
        <Route path="/feedback" element={<Feedback/>}/>
      </Routes>
    </Router>
  );
}

export default App;
