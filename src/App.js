import { useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./Main";
import Sidebar from "./Sidebar";

const App = () => {

  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  const [useDarkMode, setColorMode] = useState(false);

  const onAddNote = () => {

    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);

  }

  const onNoteUpdate = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {

      if (note.id === activeNote) {
        return updatedNote;
      }

      return note

    });

    setNotes(updatedNotesArray);
  }

  const onDeleteNote = (idToDelete) => {

    setNotes(notes.filter((note) => note.id !== idToDelete));

  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  return (
    <div className={useDarkMode === false ? "App" : "App-darkMode"}>
      <Sidebar 
        notes={notes} 
        onAddNote={onAddNote} 
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        useDarkMode={useDarkMode}
        setColorMode={setColorMode}
      />
      <Main activeNote={getActiveNote()} onNoteUpdate={onNoteUpdate} />
    </div>
  )

}

export default App;