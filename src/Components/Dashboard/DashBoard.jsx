import React,{useState,useEffect} from 'react'
import NavBar from './NavBar/NavBar'
import Note from './Note/Note'
import { useAuth } from '../../contexts/AuthContext'
import AddNotesBtn from './AddNotesBtn/AddNotesBtn'
import { database } from '../../firebase'
const DashBoard = () => {
    const [Notes, setNotes] = useState([])
    const {currentUser}=useAuth()
    useEffect( () => {
        database.Notes.where("userID","==",currentUser.uid)
        .orderBy("createdAt").onSnapshot(snapshot=>{
            setNotes(snapshot.docs.map(doc=>({id:doc.id,note:doc.data()})))
        })
    },[])
    console.log(Notes)
    return (
        <>
            <NavBar />
            <div className='notesArea'>
                {Notes.map((note)=>{
                    return <Note note={note}/>
                })}
            </div>
           <AddNotesBtn/>
        </>
    )
}

export default DashBoard
