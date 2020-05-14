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

     const folderName = this.state.newFolderName.value
     
     const url = `http://localhost:9090/folders`
    
     const folder = {
          name: folderName
     }     
          
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
           this.context.updateFolders(data) 
           this.props.history.push("/")   
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