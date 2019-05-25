import React from "react";
import ComponentExampleContainer from "../components/ComponentExample/ComponentExampleContainer";

const LayoutExample = () => {

    test = () => {

    }
    return (
        <div>
            <p>
                Layouts should only have components, and this should only
                contain tags that help format the website
            </p>
            <ComponentExampleContainer submitFunction={test}/>
        </div>
    );
};

export default LayoutExample;
