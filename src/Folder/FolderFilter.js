import React from 'react'
import {Link} from 'react-router-dom'
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types'



class FoldFilter extends React.Component {
    static contextType = NoteContext;

    render(){
       const notes = this.context.notes.filter(note => {
           return note.folderId === this.props.match.params.folderId
        }).map(notes => {
            const date = new Date(notes.modified).toUTCString();
            return <div 
                   key={notes.id}
                   className="note">
                    <Link to={`/note/${notes.id}`}
                    className="noteTitle">
                      {notes.name}</Link>
                    <p>Date modified on {date}
                    <button 
                    onClick={() => this.context.deleteNote(notes.id)}
                    className="deleteButton">Delete Note</button>
                    </p>
                   </div>
        }
            ) 
        

        return (
                <>
              {notes}
              <button className="addNoteButton" 
               onClick={() => this.props.history.push("/addnote")}>Add Note</button>
                </>
        )
    }
}

export default FoldFilter


FoldFilter.propTypes = {
    context: PropTypes.shape({
      folders:PropTypes.arrayOf({}),
      notes:PropTypes.arrayOf({}),
      deleteNote: PropTypes.func
    })
 }