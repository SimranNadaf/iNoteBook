import { useContext, useEffect } from 'react'
import noteContext from '../Context/note/NoteContext'

function About() {

  const a = useContext(noteContext);
useEffect (()=>{
  a.update();
  // eslint-disable-next-line
},[])
  return (
    <>

      <h3 className='text-center p-2'>This is About {a.state.name} and She is in class {a.state.class}</h3>
    </>
  )
}

export default About
