import React from "react";
import { Icon } from "@iconify/react";

function Alert(props) {
  return (
    <div className="alert">
      <div class="d-flex align-items-center" role="alert">
        <Icon icon="teenyicons:tick-circle-solid" width="30" />
        <div className="ms-3">{props.message}</div>
      </div>
    </div>
  );
}

export default Alert;
