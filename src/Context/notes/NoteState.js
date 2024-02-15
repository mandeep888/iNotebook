import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //Function to get all notes 
  const getAllNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzN2JlN2I4YmU4MTFiN2RiNWVjYTAxIn0sImlhdCI6MTY4MTQ3NzgyNn0.VpsamhA0FOfj11lReVuQnrgX5ko3KdGL2emi6cp7LUE"
      },
    });
    const json = await response.json();
    console.log(json)
    setNotes(json);
  }

  //Function to add a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzN2JlN2I4YmU4MTFiN2RiNWVjYTAxIn0sImlhdCI6MTY4MTQ3NzgyNn0.VpsamhA0FOfj11lReVuQnrgX5ko3KdGL2emi6cp7LUE"

      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header  
    });
    const json = await response.json();
    console.log(json);
    const note = {
      "_id": "658bd068db38da590+d2e302dc97",
      "user": "6437be7b8be811b7db5eca01",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-02-02T15:13:17.716Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //Function to delete a note
  const deleteNote = async (id) => {
    //Api call
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzN2JlN2I4YmU4MTFiN2RiNWVjYTAxIn0sImlhdCI6MTY4MTQ3NzgyNn0.VpsamhA0FOfj11lReVuQnrgX5ko3KdGL2emi6cp7LUE"

      }
    });
    const json = await response.json();
    console.log("deleting a note with id : ", id)
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }
  //Function to update a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzN2JlN2I4YmU4MTFiN2RiNWVjYTAxIn0sImlhdCI6MTY4MTQ3NzgyNn0.VpsamhA0FOfj11lReVuQnrgX5ko3KdGL2emi6cp7LUE"

      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header  
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)


    //Logic for updation on client side
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break
      }
    }
    setNotes(newNotes);
  }
  return (
    //value={{state:state , update:update}}
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getAllNotes }}>
      {props.children};
    </NoteContext.Provider>
  )
}
export default NoteState;     