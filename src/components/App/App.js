import MetronomeInterface from "./MetronomeInterface/MetronomeInterface";
import NotationControl from "./NotationControl/NotationControl";
import AudioControl from "./AudioControl/AudioControl";
import { MetronomeProvider } from "../../context/context";

function App() {
  return (
    <main>
      <MetronomeProvider>
        <MetronomeInterface />
        <NotationControl />
        <AudioControl />
      </MetronomeProvider>
    </main>
  );
}

export default App;
