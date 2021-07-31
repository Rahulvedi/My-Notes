import React, { useState, useEffect } from 'react'
import NavBar from './NavBar/NavBar'
import Note from './Note/Note'
import { useAuth } from '../../contexts/AuthContext'
import AddNotesBtn from './AddNotesBtn/AddNotesBtn'
import { database } from '../../firebase'
import {HiOutlineEmojiSad} from 'react-icons/hi'
import {Modal} from 'react-bootstrap'
const DashBoard = () => {
    const [Notes, setNotes] = useState([])
    const [open, setOpen] = useState(false)
    const [ModalDoc, setModalDoc] = useState({})
    const { currentUser } = useAuth()
    useEffect(() => {
        database.Notes.where("userID", "==", currentUser.uid)
            .orderBy("createdAt").onSnapshot(snapshot => {
                setNotes(snapshot.docs.map(doc => ({ id: doc.id, note: doc.data() })))
            })
    }, [currentUser.uid])
    function handleSearch(text){
        let matches=[]
        if(text.length>0){
            matches=Notes.filter(note=>{
                const regex=new RegExp(`${text}`,'gi')
                return note.note.desc.match(regex)
            })

            setNotes(matches)
        }
        else if(text.length===0){
            database.Notes.where("userID", "==", currentUser.uid)
            .orderBy("createdAt").onSnapshot(snapshot => {
                setNotes(snapshot.docs.map(doc => ({ id: doc.id, note: doc.data() })))
            })
        }
    }
    function openModal(){
        setOpen(true)
    }
    function closeModal(){
        setOpen(false)
    }
    function handleSeeMore(doc){
        let tempDoc={
            title:doc.note.title,
            desc:doc.note.desc
        }
        setModalDoc(tempDoc)
        openModal()
    }
    return (
        <>
            <NavBar handleSearch={handleSearch}/>
            {(Notes.length === 0) ? <div className="overlay">
                <HiOutlineEmojiSad className='overlay_icon'/>
                <p className='overlay_Text'>No Notes Found</p>
            </div> : (<div className='notesArea'>
                {Notes.map((note) => {
                    return <Note note={note} handleSeeMore={handleSeeMore} />
                })}
            </div>)}
            <AddNotesBtn />
            <Modal show={open} onHide={closeModal} >
                <Modal.Body>
                    <h3 className='modalTitle'>{ModalDoc.title}</h3>
                    <p className='modalDesc'>{ModalDoc.desc}</p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DashBoard
