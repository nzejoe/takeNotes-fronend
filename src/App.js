import { NoteList } from "./components/Notes";
import { LabelList } from "./components/Labels";

import "./App.css";

function App() {
  return (
    <div>
      <LabelList/>
      <NoteList />
    </div>
  );
}

export default App;
