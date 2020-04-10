import React from 'react';

class Note extends React.Component {

 render(){
       const note = this.props.notes.find(note => 
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
                className="deleteButton">Delete Note</button>
                </p></div>
                {note.content}
           
            </div>
        )
    }
}

export default Note;