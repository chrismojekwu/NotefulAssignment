import React from 'react'
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types'

class AddFolder extends React.Component {

    state = {
        newFolderName: {
            value: "",
            touched: false
          },
    }
    
    static contextType = NoteContext;

    backButton = () => {
       window.location.assign('/')
    }

    addFolder = (e) => {
     e.preventDefault()

     const {folderNameInput} = e.target
     //const name = e.target.folderNameInput.value
     const url = `http://localhost:9090/folders`
     const id = 
        Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4) 
      + Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);

     const folder = {
          id: id,
          name: folderNameInput.value
      }
     
    //this.context.updateFolders(folder)    

      fetch(url, {
          method: "POST",
          body: JSON.stringify(folder) ,
          headers: {
           'content-type': 'application/json'
           },
         })
        .then(response => {
            return response.json()
        }) 
        .then(data => {
           folder.name = "";
           folder.id = "";
           window.location.assign("/")
           //this.props.history.push("/")
           
           
        })
        .catch(error => {
            alert("error adding folder")
        }) 
          
    }

   generateError = () => {
       const folderName = this.state.newFolderName.value;

       if(folderName === ""){
           return "Please enter a folder name"
       } else {
           return ""
       }
   }

    validateFolderName = (name) => {
        this.setState({
          newFolderName: {
            value: name,
            touched: true
          }
        })
      }


    render(){
      return(
      <>
       <form 
        onSubmit={this.addFolder}
        className="add-folder">
           <label htmlFor="folderNameInput">
               Folder Name
           </label>
           :<input 
           id="folderNameInput"
           name="folderNameInput"
           type="text" 
           onChange={(e) => {this.validateFolderName(e.target.value)}}
           value={this.state.newFolderName.value}
           required
           />

           <input type="submit" value="Add Folder"/>

       </form>
       {this.generateError() && this.state.newFolderName.touched ?
       <p>{this.generateError()}</p>: ""}
      
       <button className="folder-back" onClick={() => this.backButton()}>Back</button>
       
       </>
       )
    }
}

export default AddFolder

AddFolder.propTypes = {
    context: PropTypes.shape({
      folders:PropTypes.arrayOf({}),
      notes:PropTypes.arrayOf({}),
      deleteNote: PropTypes.func
    })
 }