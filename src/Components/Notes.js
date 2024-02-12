import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext';
import Noteitem from './NoteItem.js';
import AddNote from './AddNote.js';
const Notes = () => {
  const context = useContext(noteContext);
  const {notes , getAllNotes} = context;
  useEffect(()=>{
    getAllNotes();
  },[])
  return (
    <>
    <AddNote/>
    <div className="row my-3">
    <h2>Your Notes</h2>
      {notes.map((note)=>{
        return <Noteitem key = {note._id} note={note}/>
      })}
    </div>
    </>
  )
}

export default Notes
