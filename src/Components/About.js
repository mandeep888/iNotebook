import React, { useEffect } from 'react'
import { useContext } from 'react';
import noteContext from '../Context/notes/noteContext'
const About = () => {
  useEffect(()=>{
    a.update()
    // eslint-disable-next-line
  },[])
  const a = useContext(noteContext);
  return (
    <>
    <h1>This is about {a.state.name} and he is in {a.state.class}</h1>
    </>
  )
}

export default About
