import React from "react";
import { Icon } from "@iconify/react";

function AddItem(props) {
  return (
    <div className="add-item" onClick={props.handleAdd}>
      <div className="icon">
        <Icon icon="mingcute:add-fill" width="50" />
      </div>
    </div>
  );
}

export default AddItem;
