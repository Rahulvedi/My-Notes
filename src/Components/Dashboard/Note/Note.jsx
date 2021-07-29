import React from 'react'
import { Card ,Button} from 'react-bootstrap'
import { database } from '../../../firebase'
const Note = ({note}) => {
    function handleDelete(Id){
        database.Notes.doc(Id).delete();
    }
    return (
        <>
                <Card style={{height:'13rem' }} className='m-3' key={note.id}>
                    <Card.Body >
                        <Card.Title className='title'>{note.note.title.toUpperCase()}</Card.Title>
                        <Card.Text className='description' >
                            {note.note.desc}
                        </Card.Text>
                    </Card.Body>
                    {/* <Card.Footer> */}
                        <Button variant="danger" onClick={event=>{handleDelete(note.id)}}>Delete</Button>
                    {/* </Card.Footer> */}
                </Card>
        </>
    )
}

export default Note
