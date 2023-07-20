import React from "react";
import { Icon } from "@iconify/react";

function DeleteIcon(props) {
  function deleteItem() {
    console.log("Clicked");
  }
  return (
    <Icon
      onClick={deleteItem}
      className="delete-icon"
      icon="ic:baseline-delete"
      width="40"
    />
  );
}

export default DeleteIcon;
