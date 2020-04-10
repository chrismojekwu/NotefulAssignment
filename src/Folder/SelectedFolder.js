import React from 'react'

import {NavLink} from 'react-router-dom'

let classes="folder"

class SelectedFolder extends React.Component {
    
    addClass = (id,name) => {
        document.getElementById(this.props.match.params.folderId).classList.toggle('highlight')
        /*if( id === this.props.match.params.folderId){
            classes += " highlight"
        } */
        
       //console.log(id,name)
      }
    

    componentDidMount(){
        //this.addClass();
    } 

    render(){
        
        /*if( === this.props.match.params.folderId){
            classes += " highlight"
        } */

        const folders = this.props.folders.map((obj,index) => {

             
           
              return <div 
              key={obj.id}
              id={obj.id}
              className="folder">
              <NavLink 
              onClick={() => this.addClass(obj.id,obj.name)}
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

export default SelectedFolder