import React ,{useContext,useState} from 'react'
import noteContext from '../Context/notes/noteContext';
const AddNote = () => {
    const context = useContext(noteContext);
  const {addNote} = context;

  //State for this component exclusively
  const [note,setNote]=useState({title:"",description:"",tag:"default"})
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:"default"});
  }
  const onChange = (event)=>{
    setNote({...note,[event.target.name]:event.target.value})
  }
  return (
    <>
    <h2>Add a Note</h2>
      <div className="container my-3">
      <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
             </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} minLength={5} required/>
          </div>
          
          <button type="submit" disabled={note.title<5 || note.description<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
      </div>
    </>
  )
}

export default AddNote
