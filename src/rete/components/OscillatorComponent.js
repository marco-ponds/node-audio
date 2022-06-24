import Rete from 'rete';
import { audioNodeSocket } from '../sockets';

export default class OscillatorComponent extends Rete.Component {

    constructor() {
        super("Oscillator");
    }

    builder(node) {
        var out1 = new Rete.Output("node", "AudioNode", audioNodeSocket);

        return node.addOutput(out1);
    }
  
    worker(node, inputs, outputs) {
        outputs["node"] = node.data.node;
    }
}