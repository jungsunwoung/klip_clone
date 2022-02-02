import { useMediaQuery } from "react-responsive";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Main from "./Main";

export const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 451 });
  return isNotMobile ? children : null;
};

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 450 });
  return isMobile ? children : null;
};
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
