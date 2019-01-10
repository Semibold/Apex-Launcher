import React from "react";
import { metadata } from "../metadata";

export class Clause extends React.Component {
    render() {
        if (DEBUG) {
            // tslint:disable-next-line
            console.log("Test: conditional compilation");
        }
        return Object.keys(metadata).map((key, index) => {
            return (
                <div key={key} className="red" data-state={index % 2 ? "active" : null}>
                    {key}: {metadata[key].toString()}
                </div>
            );
        });
    }
}
