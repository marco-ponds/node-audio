import { useState, useEffect, useRef } from "react";
import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import AddComponent from "./components/AddComponent";
import NumComponent from "./components/NumComponent";
import OscillatorComponent from "./components/OscillatorComponent";
import DestinationComponent from "./components/DestinationComponent";
import GainComponent from "./components/GainComponent";

let editor,
    engine;

export const NAME = 'AUDIO_APP@0.0.1';
export const COMPONENTS_TYPES = {
    NUM: 'NUM',
    ADD: 'ADD',
    OSCILLATOR: 'OSCILLATOR',
    DESTINATION: 'DESTINATION',
    GAIN: 'GAIN'
};

export const COMPONENTS = {
    [COMPONENTS_TYPES.NUM]: new NumComponent(),
    [COMPONENTS_TYPES.ADD]: new AddComponent(),
    [COMPONENTS_TYPES.OSCILLATOR]: new OscillatorComponent(),
    [COMPONENTS_TYPES.DESTINATION]: new DestinationComponent(),
    [COMPONENTS_TYPES.GAIN]: new GainComponent()
};

export const addNode = (componentType, options = {}, position = [0, 0]) => {
    const component = COMPONENTS[componentType];
    if (component) {
        component.createNode(options).then(node => {
            node.position = position;
            editor.addNode(node);
        });
    }
}

export async function createEditor(container) {
    if (editor) return editor;

    editor = new Rete.NodeEditor(NAME, container);
    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin);

    engine = new Rete.Engine(NAME);

    Object
    .values(COMPONENTS)
    .map(component => {
        editor.register(component);
        engine.register(component);
    });

//   var n1 = await components[0].createNode({ num: 2 });
//   var n2 = await components[0].createNode({ num: 3 });
//   var add = await components[1].createNode();
//   const add2 = await components[1].createNode();

//   n1.position = [80, 200];
//   n2.position = [80, 400];
//   add.position = [500, 240];

//   add2.position = [600, 300];

//   editor.addNode(n1);
//   editor.addNode(n2);
//   editor.addNode(add);
//   editor.addNode(add2);

//   editor.connect(n1.outputs.get("num"), add.inputs.get("num1"));
//   editor.connect(n2.outputs.get("num"), add.inputs.get("num2"));

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      console.log("process");
      await engine.abort();
      await engine.process(editor.toJSON());
    }
  );

  editor.view.resize();
  editor.trigger("process");
  AreaPlugin.zoomAt(editor, editor.nodes);

  return editor;
}

export function useRete() {
  const [container, setContainer] = useState(null);
  const editorRef = useRef();

  useEffect(() => {
    if (container) {
      createEditor(container).then((value) => {
        console.log("created");
        editorRef.current = value;
      });
    }
  }, [container]);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        console.log("destroy");
        editorRef.current.destroy();
      }
    };
  }, []);

  return [setContainer];
}
