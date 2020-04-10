import React from 'react';


class NoteFolder extends React.Component {
    backButton = () => {
        console.log("back")
      this.props.history.goBack()
  
    } 

    render(){
        const note = this.props.notes.find(note => 
            note.id === this.props.match.params.noteId
            )
        const folder = this.props.folders.find(folder => 
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