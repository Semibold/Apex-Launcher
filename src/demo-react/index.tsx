import React from "react";
import ReactDOM from "react-dom";
import { metadata } from "../metadata";

export class RootApp extends React.Component {
    render() {
        if (DEBUG) {
            console.log("Conditional Compilation");
        }

        return Object.keys(metadata).map((key, index) => {
            return (<p key={key}>{key}: {metadata[key].toString()}</p>);
        });
    }
}

ReactDOM.render(<RootApp />, document.getElementById("app"));
