import "../../assets/styles/App.css";
import MetronomeInterface from "./MetronomeInterface/MetronomeInterface";
import NotationControl from "./NotationControl/NotationControl";

function App() {
  return (
    <main>
      <MetronomeInterface />
      <NotationControl />
    </main>
  );
}

export default App;
