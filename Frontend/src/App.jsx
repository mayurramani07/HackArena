import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ContestPage from "./pages/ContestPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hackathons" element={<div>Hackathons Page</div>} />
        <Route
          path="/contests"
          element={<ContestPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
