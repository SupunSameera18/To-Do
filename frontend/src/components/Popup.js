import React, { useState } from "react";
import { Icon } from "@iconify/react";

function Popup(props) {
  const [input, setInput] = useState("");

  const canAdd = input.trim().length > 0;

  function handleAdd() {
    if (!canAdd) {
      return;
    }
    props.handleAdd(input.trim());
    setInput("");
    props.handleClose();
  }

  return (
    <div className="window">
      <div className="popup">
        <div className="title-bar">
          <h4>Add Item</h4>
          <div className="icon" onClick={props.handleClose}>
            <Icon icon="ion:close" width="30" />
          </div>
        </div>
        <div className="input">
          <div className="input-group mb-3">
            <textarea
              className="form-control"
              aria-label="With textarea"
              rows="4"
              name="text"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-info"
            disabled={!canAdd}
            onClick={handleAdd}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
