import React from "react";
import { Icon } from "@iconify/react";

function CheckIcon(props) {
  return (
    <Icon
      className={props.isCompleted ? "completed-check" : ""}
      icon="gg:check-o"
      width="30"
    />
  );
}

export default CheckIcon;
