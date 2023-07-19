import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const [state, setState] = useState({
        "name": "karthik",
        "class": "5b"
    })
     
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "harry",
                "class": "10 a"
            })
        }, 1000);
    }

    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;