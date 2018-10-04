import React from 'react';


const NewItem = (props) => (

    <div className="App-div-input">
        <form onSubmit={props.insertItem}>
        <input className="App-input" value={props.state.todoName} onChange={props.definingTodoName} placeholder="Type here your new Todo Name..." /><br/>
        <input className="App-input" value={props.state.todoDescription} onChange={props.definingTodoDescription} placeholder="Type here your new Todo Description..." /><br/>
        <input className="App-input" type="file" value={props.state.todoAddendum} onChange={props.definingAddendum} /><br/>
        <button id="submit" type="submit">Add Todo</button>
        </form>
    </div>
);

export default NewItem;