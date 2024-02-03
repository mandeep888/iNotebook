import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "65bd068db38da5d2e302dc97",
          "user": "6437be7b8be811b7db5eca01",
          "title": "MY title",
          "description": "My desription",
          "tag": "My personel note",
          "date": "2024-02-02T15:13:17.716Z",
          "__v": 0
        },
        {
          "_id": "65bd068eb38da5d2e302dc99",
          "user": "6437be7b8be811b7db5eca01",
          "title": "MY title",
          "description": "My desription",
          "tag": "My personel note",
          "date": "2024-02-02T15:13:18.572Z",
          "__v": 0
        },
        {
          "_id": "65bd068fb38da5d2e302dc9b",
          "user": "6437be7b8be811b7db5eca01",
          "title": "MY title",
          "description": "My desription",
          "tag": "My personel note",
          "date": "2024-02-02T15:13:19.081Z",
          "__v": 0
        },
        {
          "_id": "65bd068fb38da5d2e302dc9d",
          "user": "6437be7b8be811b7db5eca01",
          "title": "MY title",
          "description": "My desription",
          "tag": "My personel note",
          "date": "2024-02-02T15:13:19.368Z",
          "__v": 0
        },
        {
          "_id": "65bd068fb38da5d2e302dc9f",
          "user": "6437be7b8be811b7db5eca01",
          "title": "MY title",
          "description": "My desription",
          "tag": "My personel note",
          "date": "2024-02-02T15:13:19.546Z",
          "__v": 0
        },
        {
          "_id": "65bd068fb38da5d2e302dca1",
          "user": "6437be7b8be811b7db5eca01",
          "title": "MY title",
          "description": "My desription",
          "tag": "My personel note",
          "date": "2024-02-02T15:13:19.704Z",
          "__v": 0
        },
        {
          "_id": "65bd068fb38da5d2e302dca3",
          "user": "6437be7b8be811b7db5eca01",
          "title": "MY title",
          "description": "My desription",
          "tag": "My personel note",
          "date": "2024-02-02T15:13:19.858Z",
          "__v": 0
        },
        {
          "_id": "65bd0690b38da5d2e302dca5",
          "user": "6437be7b8be811b7db5eca01",
          "title": "MY title",
          "description": "My desription",
          "tag": "My personel note",
          "date": "2024-02-02T15:13:20.034Z",
          "__v": 0
        },
        {
          "_id": "65bd0690b38da5d2e302dca7",
          "user": "6437be7b8be811b7db5eca01",
          "title": "MY title",
          "description": "My desription",
          "tag": "My personel note",
          "date": "2024-02-02T15:13:20.195Z",
          "__v": 0
        },
        {
          "_id": "65bd0690b38da5d2e302dca9",
          "user": "6437be7b8be811b7db5eca01",
          "title": "MY title",
          "description": "My desription",
          "tag": "My personel note",
          "date": "2024-02-02T15:13:20.387Z",
          "__v": 0
        }
      ]
      const [notes,setNotes] = useState(notesInitial);
    return(
        //value={{state:state , update:update}}
        <NoteContext.Provider value={{notes , setNotes}}>  
            {props.children};
        </NoteContext.Provider>
    )
}
export default NoteState;     