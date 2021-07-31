import React from 'react'
import { Card ,Button} from 'react-bootstrap'
import { database } from '../../../firebase'
const Note = ({note,handleSeeMore}) => {
    function handleDelete(Id){
        database.Notes.doc(Id).delete();
    }
    function handleClick(doc){
        handleSeeMore(doc)
    }
    return (
                <Card style={{height:'13rem',cursor:'pointer' }} className='m-3' key={note.id}>
                    <Card.Body>
                        <Card.Title className='title'>{note.note.title.toUpperCase()}</Card.Title>
                        <Card.Text className='description' >
                            {note.note.desc}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer variant='light' className='d-flex justify-content-between'>
                        <Button variant="outline-danger" onClick={event=>{handleDelete(note.id)}}>Delete</Button>
                        <Button variant="outline-success" onClick={event=>{handleClick(note)}}>See more</Button>
                    </Card.Footer>
                </Card>
    )
}

export default Note
