import React from "react";
import ComponentExample from "./ComponentExample";

const ComponentExampleContainer = () => {
  // Containers will do your logic such as fetching data, calculations etc, then pass it onto the component
  // If you need the component to do an action like a button click, pass the function to the component through props
  return <ComponentExample comment="Sample Component" />;
};

export default ComponentExampleContainer;
