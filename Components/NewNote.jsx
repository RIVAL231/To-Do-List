import React from "react"

export default function NewNote(props){
    
  
   
    return(
        <div className="container--New">
            <h2>NEW NOTE</h2>
            <input
             type="text" 
             placeholder="Input Your Note"
             value={props.note}
             onChange={props.saveNote}

             
             />
            <button className="cancel" onClick={props.cancel}>CANCEL</button>
            <button className="apply" onClick={props.saveNoteGlobal}>APPLY</button>

        </div>
    )
}