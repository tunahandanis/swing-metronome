import { BrowserRouter, Route, Routes } from "react-router-dom";
import Metronome from "./routes/Metronome/Metronome";
import Guide from "./routes/Guide/Guide";
import NotFound from "./routes/NotFound/NotFound";
import Nav from "./Nav/Nav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<Metronome />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
