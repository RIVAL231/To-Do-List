import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Navbar from '../Components/Navbar';
import Notes from '../Components/Notes';
import NewNote from '../Components/NewNote';

function App() {
  // Load initial state from localStorage
  const storedNotes = JSON.parse(localStorage.getItem('saved')) || [];

  const [showAdd, setAdd] = useState(false);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(storedNotes);
  const [isEmpty, setEmpty] = useState(storedNotes.length === 0);

  // Save notes to localStorage whenever 'saved' changes
  useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(saved));
  }, [saved]);

  function saveNoteHandler(event) {
    setNote(event.target.value);
  }

  function addNote() {
    setAdd(prevAdd => !prevAdd);
    setNote("");
  }

  function saveNoteGlobal() {
    setSaved(prevSaved => {
      if (note !== "") {
        const newId = Math.random();
        setEmpty(false);
        setAdd(prevAdd => !prevAdd);
        return [...prevSaved, { isChecked: false, id: newId, text: note }];
      }
      return prevSaved;
    });
    setNote(""); // Clear the note input
  }

  const handleCheckboxChange = (id) => {
    setSaved(prevSaved =>
      prevSaved.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleDelete = (id) => {
    setSaved(prevSaved => {
      const updatedSaved = prevSaved.filter(item => item.id !== id);
      setEmpty(updatedSaved.length === 0);
      return updatedSaved;
    });
  };

  const displayNotes = saved.map((str) => (
    <Notes
      notes={str.text}
      isChecked={str.isChecked}
      handleCheckboxChange={() => handleCheckboxChange(str.id)}
      handledelete={() => handleDelete(str.id)}
      key={str.id}
      id={str.id}
    />
  ));


  return (
    <div className='container'>
      <Navbar />

      {isEmpty && (
        <div className='empty'>
          <img src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSiSLhRa8UExYF92rsew9Nmm_0OiuPybsn8SstgyZgICZKloGIh' alt="Empty"/>
          <h1>Empty...</h1>
        </div>
      )}
      <div className='notes'>
        {!isEmpty && displayNotes}
      </div>

      {showAdd && (
        <NewNote
          note={note}
          saveNote={saveNoteHandler}
          saveNoteGlobal={saveNoteGlobal}
          cancel={addNote}
          className="notescss"
        />
      )}

      <button onClick={addNote} className='button1'>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default App;
