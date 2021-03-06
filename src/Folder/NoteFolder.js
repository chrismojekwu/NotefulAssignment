import React from 'react';
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types'



class NoteFolder extends React.Component {
    static contextType = NoteContext;

    backButton = () => {
    this.props.history.goBack()
    } 

    render(){
        const note = this.context.notes.find(note => 
            note.id === this.props.match.params.noteId
            )
        const folder = this.context.folders.find(folder => 
            folder.id === note.folderId
            )    

        return (
           <>
           <button 
           onClick={() => this.backButton()}
           className="backButton">
               Go Back
           </button>
           <p>{folder.name}</p>
           </>
        )
    }
}

export default NoteFolder;

NoteFolder.propTypes = {
    context: PropTypes.shape({
      folders:PropTypes.arrayOf({}),
      notes:PropTypes.arrayOf({}),
      deleteNote: PropTypes.func
    })
 }