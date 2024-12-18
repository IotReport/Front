import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./screen/main/Main";
import Info from "./screen/info/Info";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/info/:reportId" element={<Info />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
