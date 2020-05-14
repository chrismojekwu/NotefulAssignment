import React from 'react';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';

class AddNote extends React.Component {
    state = {
        value: "",
        folderId: "",
        content: "",
        touched: false
      
    }
   
    static contextType = NoteContext;

    addNote = (e) => {
      e.preventDefault()  
      const { noteName, folderName, noteBody } = e.target
      

      const url = `http://localhost:9090/notes`
   
      const note = {
          name: noteName.value,
          modified: new Date(),
          folderId: folderName.value,
          content: noteBody.value
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(note) ,
            headers: {
             'content-type': 'application/json'
             },
           })
          .then(response => {
              return response.json()
          }) 
          .then(data => {
            this.context.updateNotes(data)   
            this.props.history.push("/")    
          })
          .catch(error => {
              alert("error adding note")
        })  
    }

    generateError = () => {
      const noteName = this.state.value;

      if(noteName === ""){
          return "Please enter a note name"
      } else {
          return ""
      }
  }

   updateNoteName = (noteName) => {
      this.setState({
         value: noteName,
         touched: true
         })
     }

     updateFolderId = (id) => {
      this.setState({
        folderId: id
        })
    }
    
    updateContent = (content) => {
      this.setState({
        content
        })
    }


    render(){
     const options = this.context.folders.map((folder,index) => {
         return (<option key={folder.id} value={folder.id}>{folder.name}</option>)
     })   
     return(
        <>
        <form onSubmit={this.addNote} className="add-note">
            <input type="text" 
            onChange={(e) => this.updateNoteName(e.target.value)} value={this.state.value}
            id="note-name" name="noteName"className="note-name" required/>
            <select onChange={(e) => this.updateFolderId(e.target.value)} 
            style={{display:"block"}} name="folderName" id="folder-select" required>
                  {options}
            </select>
            <textarea onChange={(e) => this.updateContent(e.target.value)}
            type="text" id="note-body" name="noteBody" className="note-body" required></textarea>
            <input type="submit" value="Add Note"/>
           
        </form>
        {this.generateError() && this.state.touched ?
       <p>{this.generateError()}</p>: ""}
       </>
     )
    }
       
}

export default AddNote

AddNote.propTypes = {
  context: PropTypes.shape({
    folders:PropTypes.arrayOf({}),
    notes:PropTypes.arrayOf({}),
    deleteNote: PropTypes.func
  })
}