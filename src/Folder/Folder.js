import React from 'react';
import {NavLink} from 'react-router-dom';


class Folder extends React.Component {
    

    render(){
       const folderId = this.props.match.params.folderId ? this.props.match.params.folderId:"";
       const folders = this.props.folders.map((obj,index) => {
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
          <button className="addFolder">Add Folder</button>
          </>
        )
    }
}

export default Folder