import Pet from "./Pet";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="Luna" animal="Dog" breed="Havanese" />
      <Pet name="Pepper" animal="Bird" breed="Cockatiel" />
      <Pet name="Mittens" animal="Cat" breed="Persian" />
    </div>
  );
};

export default App;
