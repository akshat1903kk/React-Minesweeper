import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import GamePage from "../pages/GamePage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Root Path - Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Game Path - Game Page */}
        <Route path="/play" element={<GamePage />} />

        {/*fallback route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
