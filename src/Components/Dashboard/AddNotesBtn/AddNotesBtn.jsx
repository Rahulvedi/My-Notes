import React,{useState} from 'react'
import { database } from '../../../firebase'
import {useAuth} from '../../../contexts/AuthContext'
import {Form,Button,Modal} from 'react-bootstrap'
import {RiPencilFill} from 'react-icons/ri'
const AddNotesBtn = () => {
    const [open, setOpen] = useState(false)
    const [Title, setTitle] = useState('')
    const [Desc, setDesc] = useState('')
    const {currentUser}=useAuth()
    function openModel() {
        setOpen(true)
    }
    function closeModel() {
        setTitle('')
        setDesc('')
        setOpen(false)
    }
    function handleSave(e) {
        e.preventDefault()
        database.Notes.add({
            title:Title,
            desc:Desc,
            userID:currentUser.uid,
            createdAt: database.getCurrentTimeStamp()
        })
        setTitle('')
        setDesc('')
        closeModel()
    }
    return (
        <div>
            <Button className='addNotes' style={{ borderRadius: '100%' }} onClick={openModel}><RiPencilFill/></Button>
            <Modal show={open} onHide={closeModel}>
                <Form onSubmit={handleSave}>
                    <Modal.Body>
                        <Form.Label >Title:</Form.Label>
                        <Form.Control
                            name='title'
                            type='text'
                            required
                            value={Title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <Form.Label >Description:</Form.Label>
                        <Form.Control 
                            name='description'
                            as='textarea'
                            rows="4"
                            cols="50"
                            required
                            value={Desc}
                            onChange={e => setDesc(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeModel}>Close</Button>
                        <Button variant='success' type='submit' >Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default AddNotesBtn
