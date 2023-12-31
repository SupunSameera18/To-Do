import React from "react";
import CheckIcon from "./CheckIcon";
import UncheckIcon from "./UncheckIcon";
import DeleteIcon from "./DeleteIcon";

function ListItem(props) {
  const completedStyle = {
    textDecoration: "line-through",
  };

  function completeTodo(id) {
    props.onComplete(id);
  }
  return (
    <div className="todo-item d-flex row">
      <div className="check-icon col-1" onClick={() => completeTodo(props.id)}>
        {props.isCompleted ? (
          <CheckIcon isCompleted={props.isCompleted} />
        ) : (
          <UncheckIcon isCompleted={props.isCompleted} />
        )}
      </div>
      <div
        className="todo-text col-10 no-curor"
        style={props.isCompleted ? completedStyle : null}
      >
        {props.text}
      </div>
      <div
        className="delete-icon col-1"
        onClick={() => props.onDelete(props.id)}
      >
        <DeleteIcon />
      </div>
    </div>
  );
}

export default ListItem;
