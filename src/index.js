import React, { useState } from "react";
import ReactDOM from "react-dom";
import { getDestinationNode, getGainNode, getOscillatorNode } from "./nodes";
import { addNode, COMPONENTS_TYPES, useRete } from "./rete";

import "./styles.css";

function Editor() {
    const [setContainer] = useRete();

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh"
            }}
            ref={(ref) => ref && setContainer(ref)}
        />
    );
}

function App() {
    const [visible, setVisible] = useState(true);
    const addNewNode = () => {
        addNode(COMPONENTS_TYPES.DESTINATION, { node: getDestinationNode() });
        // addNode(COMPONENTS_TYPES.NUM, { num: 1 });
        // addNode(COMPONENTS_TYPES.NUM, { num: 1 });
        // addNode(COMPONENTS_TYPES.NUM, { num: 1 });
        // addNode(COMPONENTS_TYPES.ADD);
        addNode(COMPONENTS_TYPES.OSCILLATOR, { node: getOscillatorNode() });
        addNode(COMPONENTS_TYPES.GAIN, { node: getGainNode(), gain: 1 });
    }

    return (
        <div className="App">
            <button onClick={addNewNode}>Add</button>
            { visible && <Editor /> }
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
