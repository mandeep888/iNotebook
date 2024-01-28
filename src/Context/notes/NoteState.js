import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const s1 = {
    "name":"Mandeep",
    "class":"5b"
}

const NoteState = (props)=>{
    const [state,setState] = useState(s1);
    const update = ()=>{
    setTimeout(()=>{
        setState({
            "name":"Mandeep Singh",
            "class":"12"
        })    },1000)
}
    return(
        <NoteContext.Provider value={{state , update}}>
            {props.children};
        </NoteContext.Provider>
    )
}
export default NoteState;