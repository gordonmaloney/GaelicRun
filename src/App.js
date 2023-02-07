import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Landing } from "./Landing";
import { PlayFrame } from "./PlayFrame";

const App = () => {
  return (
    <BrowserRouter>
      <div className="overlay"></div>
      <div className="overlay glitch"></div>
      <div className="overlay glitch2"></div>

      <Routes>
        <Route path="/" exact element={<Landing />} />

        <Route path="/play" element={<PlayFrame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
