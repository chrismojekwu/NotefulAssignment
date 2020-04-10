import React from 'react';
import {Link} from 'react-router-dom';


class Main extends React.Component {
  notes = (id) => {
    console.log("note click", id)

    
    
  }

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
                <button className="deleteButton">Delete Note</button>
                </p>
              </div>
      })

        return (
            <>
            {notes}
            </>
        )
    }
}

export default Main;