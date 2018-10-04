import React from 'react';

const Item = (props) => (
    <div className="div-color" id={props.todo._id} >
        <div id='App-items'>
            <li className="App-li">
            Todo: {props.todo.todoName}
            <ul>
                <li>Description: {props.todo.todoDescription}</li>
                <li>{props.todo.todoAddendum}</li>
            </ul>
            </li>
        </div>
        <div id='App-done'>
            <label>Done:</label>
            <input onChange={(e) => { props.updateItem(e, props.todo._id) }} name='todoDone' type="checkbox" checked={props.todo.todoDone}/>
            <form onSubmit={(ev) => { props.deleteItem(ev, props.todo._id) }}>
            <button id="delete" type="submit">Delete</button>
            </form>
        </div>
    </div>
);

export default Item;