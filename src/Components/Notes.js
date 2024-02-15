import React, { useEffect, useRef,useState } from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext';
import Noteitem from './NoteItem.js';
import AddNote from './AddNote.js';
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes ,editNote } = context;
  //State for this component exclusively
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line 
  }, [])

  
  
  const updateNote = (currentNote) => {
    ref.current.click();
    // setNote({currentNote});
    setNote({id:currentNote._id,etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag});
  }
  
  const handleClick=(e)=>{
    e.preventDefault();
    editNote(note.id , note.etitle , note.edescription , note.etag)
    refClose.current.click();
   
  }
   
   const onChange = (event)=>{
     setNote({...note,[event.target.name]:event.target.value})
   }
  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
