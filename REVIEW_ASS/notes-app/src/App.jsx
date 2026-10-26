import { Profiler } from "react";
import NotesList from "./NotesList";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <h1>Notes App</h1>

      <Profiler id="NotesList" onRender={() => {}}>
        <NotesList />
      </Profiler>
    </div>
  );
}