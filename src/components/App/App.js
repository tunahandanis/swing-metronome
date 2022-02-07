import { BrowserRouter, Route, Switch } from "react-router-dom";
import Metronome from "./routes/Metronome/Metronome";
import Guide from "./routes/Guide/Guide";

function App() {
  return (
    <>
      <Guide />
      <Metronome />
    </>
  );
}

export default App;
