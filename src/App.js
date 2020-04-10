import React from 'react';
import './App.css';
import obj from './store'
import Folder from './Folder/Folder'
import NoteFolder from './Folder/NoteFolder'
import Main from './Main/Main'
import Note from './Note/Note'
import FoldFilter from './Folder/FolderFilter'
import {Route} from 'react-router-dom';


class App extends React.Component {
   state = {
     folders: obj.folders,
     notes: obj.notes,
   }

   backButton = () => {
    console.log("back")

}

  render(){
   return (
    <>
      <nav>
        <a href="/">Noteful</a>
      </nav>
      <section className="sidebar">
      <Route 
      exact path="/"
      render={(props) => 
        (<Folder
        {...props}
        folders={this.state.folders}
        />)}
      />
      <Route
        path={`/note/:noteId`}
        component={(routeProps) => 
          (<NoteFolder
          {...routeProps}
          folders={this.state.folders}
          notes={this.state.notes}
          />)}
        />
        <Route
        path={`/folder/:folderId`}
        component={(routeProps) => 
          (<Folder
          {...routeProps}
          folders={this.state.folders}
          />)}
        />
       
       
      </section>
      <main>
        <Route
         exact path="/"
         component={() => 
          (<Main
          notes={this.state.notes}
          folders={this.state.folders}
          />)}
        />
        <Route
        path={`/note/:noteId`}
        component={(routeProps) => (
        <Note
        {...routeProps}
        notes={this.state.notes}
        />)}
        />
         <Route
        path={`/folder/:folderId`}
        component={(routeProps) => (
          <FoldFilter
          {...routeProps}
          notes={this.state.notes}
          />)}
        />
      </main>
     </>
   )
 }
}

export default App;
