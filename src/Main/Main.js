import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteContext from '../NoteContext'


class Main extends React.Component {
  static contextType = NoteContext;



    render(){
      const notes = this.props.notes.map((obj,index) => {
          const date = new Date(obj.modified).toUTCString();
       return <div 
               key={obj.id}
               className="note">
                <Link to={`/note/${obj.id}`}
                className="noteTitle">
                  {obj.name}</Link>
                <p>Date modified on {date}
                <button 
                onClick={() => this.context.deleteNote(obj.id)}
                className="deleteButton">Delete Note</button>
                </p>
              </div>
      })

        return (
            <>
            {notes}
            <button className="addNoteButton" 
            onClick={() => this.props.history.push("/addnote")}>Add Note</button>
            </>
        )
    }
}

export default Main;

Main.propTypes = {
   notes: PropTypes.arrayOf(PropTypes.shape({
     id: PropTypes.string.isRequired,
     name: PropTypes.string.isRequired,
     modified: PropTypes.string.isRequired,
     folderId: PropTypes.string.isRequired,
     content: PropTypes.string.isRequired,
   }))
}

