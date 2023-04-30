import { useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./Main";
import Sidebar from "./Sidebar";

const App = () => {

  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  const onAddNote = () => {

    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);

  }

  const onDeleteNote = (idToDelete) => {

    setNotes(notes.filter((note) => note.id !== idToDelete));

  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  return (
    <div className="App">
      <Sidebar 
        notes={notes} 
        onAddNote={onAddNote} 
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} />
    </div>
  )

}

export default App;