import React from "react";
import { Icon } from "@iconify/react";

function UncheckIcon(props) {
  return (
    <Icon
      className={props.isCompleted ? "completed-check" : ""}
      icon="ic:round-radio-button-unchecked"
      width="30"
    />
  );
}

export default UncheckIcon;
