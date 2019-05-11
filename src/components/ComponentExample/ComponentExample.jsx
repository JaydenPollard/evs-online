import React from "react";

const ComponentExample = props => {
    // Components should only display data provided by the container
    return <div>{props.comment}</div>;
};

export default ComponentExample;
