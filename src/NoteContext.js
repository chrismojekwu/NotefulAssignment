import React from 'react';

const NoteContext = React.createContext({
    folders: [],
    notes: [],
})

export default NoteContext