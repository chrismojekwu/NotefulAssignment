import React from 'react';
import './App.css';
//import obj from './store'
import Folder from './Folder/Folder'
import NoteFolder from './Folder/NoteFolder'
import Main from './Main/Main'
import Note from './Note/Note'
import FoldFilter from './Folder/FolderFilter'
import NoteContext from './NoteContext'
import {Route} from 'react-router-dom';


class App extends React.Component {
   state = {
     folders:[],
     notes: [],
   }

   backButton = () => {
    console.log("back")

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
    }

   return (
    <>
      <nav>
        <a href="/">Noteful</a>
      </nav>
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
      </main>
      </NoteContext.Provider>
     </>
   )
 }
}

export default App;
