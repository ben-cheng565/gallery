import React from "react";
import { Progress } from "reactstrap";

const uploadProgress = (props) => {
  return (
    <div className="load-progress">
      <Progress max="100" color="success" value={props.loaded}>
        {Math.round(props.loaded, 2)}%
      </Progress>
    </div>
  );
};

export default uploadProgress;
