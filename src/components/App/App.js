import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import Metronome from "./routes/Metronome/Metronome";
import Guide from "./routes/Guide/Guide";
import Nav from "./Nav/Nav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Metronome />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
