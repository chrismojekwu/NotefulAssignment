import React from 'react';
import './App.css';
//import obj from './store'
import Folder from './Folder/Folder'
import NoteFolder from './Folder/NoteFolder'
import Main from './Main/Main'
import Note from './Note/Note'
import FoldFilter from './Folder/FolderFilter'
import NoteContext from './NoteContext'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import ErrorBoundary from './ErrorBoundary'
import {Route} from 'react-router-dom';




class App extends React.Component {
  
     state = {
       folders:[],
       notes: [],
      }
  
  
 
 deleteNote = (id) => {
  
 const url = `http://localhost:9090/notes/${id}`

 const newNotes = this.state.notes.filter(notes => notes.id !== id);
  
  fetch(url, {
    method: "DELETE",
    headers: {
      'content-type': 'application/json'
    },
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    this.setState({
      notes: newNotes
    })  
  })
  .catch(error => {
    alert('error with delete request')
  })
 }

 updateNotes = (note) => {
  this.setState({
    notes: [...this.state.notes, note]
  })
}

updateFolders = (folder) => {
  this.setState({
    notes: [...this.state.folders, folder]
  })
}   

  componentDidMount() {
    const url1 = `http://localhost:9090/folders`
    const url2 = `http://localhost:9090/notes`

    fetch(url1)
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.setState({
        folders: data
      })
    })
    .catch(error => {
      alert('error fetching folders')
    })

    fetch(url2)
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.setState({
        notes: data
      })
    })
    .catch(error => {
      alert('error fetching notes')
    })
 } 

 


  render(){

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      updateFolders: this.updateFolders,
      updateNotes: this.updateNotes
    }

   return (
    <>
      <header>
        <a href="/">Noteful</a>
      </header>
      <NoteContext.Provider value={contextValue}>
      <section className="sidebar">
      <Route 
      exact path="/"
      render={(props) => 
        (<Folder
        {...props}
        
        />)}
      />
      <Route
        path={`/note/:noteId`}
        component={(routeProps) => 
          (<NoteFolder
          {...routeProps}
          
          
          />)}
        />
        <Route
        path={`/folder/:folderId`}
        component={(routeProps) => 
          (<Folder
          {...routeProps}
          
          />)}
        />
       
       
      </section>
      <main>
        <Route
         exact path="/"
         component={(routeProps) => 
          (<Main
          {...routeProps}
          notes={this.state.notes}
          />)}
        />
        <Route
        path={`/note/:noteId`}
        component={(routeProps) => (
        <Note
        {...routeProps}
        
        />)}
        />
         <Route
        path={`/folder/:folderId`}
        component={(routeProps) => (
          <FoldFilter
          {...routeProps}
          
          />)}
        />
        <Route
        path={`/addfolder`}
        component={(routeProps) => (
          <ErrorBoundary>
            <AddFolder
            {...routeProps}
            
            />
          </ErrorBoundary>
          )}
        />
         <Route
        path={`/addnote`}
        component={(routeProps) => (
          <ErrorBoundary>
            <AddNote
            {...routeProps}
            
            />
          </ErrorBoundary>
          )}
        />
      </main>
      </NoteContext.Provider>
     </>
   )
 }
}

export default App;
