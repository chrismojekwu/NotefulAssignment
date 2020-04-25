import React from 'react';
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types'


class Note extends React.Component {
 static contextType = NoteContext;   

 deleteButton = (id) => {
     this.context.deleteNote(id)
     this.props.history.push('/')
 }

 render(){
       const note = this.context.notes.find(note => 
        note.id === this.props.match.params.noteId
        )

        const date = new Date(note.modified).toUTCString();

        return (
            <div className="notePage">
                <div 
               key={note.id}
               className="note">
                   {note.name}
                <p>Date modified on {date}
                <button 
                onClick={() => this.deleteButton(note.id)}
                className="deleteButton">Delete Note</button>
                </p></div>
                {note.content}
           
            </div>
        )
    }
}

export default Note;

Note.propTypes = {
    context: PropTypes.shape({
      folders:PropTypes.arrayOf({}),
      notes:PropTypes.arrayOf({}),
      deleteNote: PropTypes.func
    })
 }