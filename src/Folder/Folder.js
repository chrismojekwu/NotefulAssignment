import React from 'react';
import {NavLink} from 'react-router-dom';
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types'



class Folder extends React.Component {
    static contextType = NoteContext;

    addFolder = () => {
        this.props.history.push('/addfolder')
    }
    

    render(){
       const folderId = this.props.match.params.folderId ? this.props.match.params.folderId:"";
       const folders = this.context.folders.map((obj,index) => {
           const selectedClass = obj.id === folderId ? "folder highlight": "folder";
           return <div 
           key={obj.id}
           className={selectedClass}>
           <NavLink 
           to={`/folder/${obj.id}`}
           className="folderTitle"
           >{obj.name}</NavLink>
           </div>
       })

        return (
            <>
          {folders}
          <button 
          onClick={() => this.addFolder()}
          className="addFolder">Add Folder</button>
          </>
        )
    }
}

export default Folder


Folder.propTypes = {
    context: PropTypes.shape({
      folders:PropTypes.arrayOf({}),
      notes:PropTypes.arrayOf({}),
      deleteNote: PropTypes.func
    })
 }