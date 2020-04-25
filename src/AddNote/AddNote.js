import React from 'react';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';

class AddNote extends React.Component {
    state = {
      newNoteName: {
        value: "",
        touched: false
      },
    }
   
    static contextType = NoteContext;

    addNote = (e) => {
      e.preventDefault()  
      const { noteName, folderName, noteBody } = e.target
      

      const url = `http://localhost:9090/notes`
      const id = 
        Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4) 
      + Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);

      const note = {
          id: id,
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
             note.name = "";
             note.id = "";
             note.modified = "";
             note.folderId = "";
             note.content = "";
             window.location.assign('/')
             //console.log(data)
             //this.context.updateFolders(data) 
          })
          .catch(error => {
              alert("error adding note")
        })  

      //console.log(note)
    }

    generateError = () => {
      const noteName = this.state.newNoteName.value;

      if(noteName === ""){
          return "Please enter a note name"
      } else {
          return ""
      }
  }

   validateNoteName = (name) => {
       this.setState({
         newNoteName: {
           value: name,
           touched: true
         }
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
            onChange={(e) => this.validateNoteName(e.target.value)} value={this.state.newNoteName.value}
            id="note-name" name="noteName"className="note-name"/>
            <select style={{display:"block"}} name="folderName" id="folder-select">
                  {options}
            </select>
            <textarea type="text" id="note-body" name="noteBody" className="note-body"></textarea>
            <input type="submit" value="Add Note"/>
           
        </form>
        {this.generateError() && this.state.newNoteName.touched ?
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