import "../../assets/styles/App.css";
import MetronomeInterface from "./MetronomeInterface/MetronomeInterface";
import NotationControl from "./NotationControl/NotationControl";
import { MetronomeProvider } from "../../context/context";

function App() {
  return (
    <main>
      <MetronomeProvider>
        <MetronomeInterface />
        <NotationControl />
      </MetronomeProvider>
    </main>
  );
}

export default App;
