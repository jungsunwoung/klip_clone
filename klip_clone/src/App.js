import { useMediaQuery } from "react-responsive";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Main from "./Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}
export default App;
