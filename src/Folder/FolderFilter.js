import React from 'react'
import {Link} from 'react-router-dom'


class FoldFilter extends React.Component {
    render(){
       
        /*const folder = obj.folders.find(folder => 
            folder.id === this.props.match.params.folderId
            )*/
        const notes = this.props.notes.filter(note => {
           return note.folderId === this.props.match.params.folderId
        }).map(notes => {
            const date = new Date(notes.modified).toUTCString();
            return <div 
                   key={notes.id}
                   className="note">
                    <Link to={`/note/${notes.id}`}
                    className="noteTitle">
                      {notes.name}</Link>
                    <p>Date modified on {date}
                    <button className="deleteButton">Delete Note</button>
                    </p>
                   </div>
        }
            ) 
        

        return (
                <>
              {notes}
                </>
        )
    }
}

export default FoldFilter

/**/