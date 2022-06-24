import Rete from 'rete';
import { audioNodeSocket } from '../sockets';

export default class DestinationComponent extends Rete.Component {

    constructor() {
        super("Destination");
    }

    builder(node) {
        const input = new Rete.Input("node", "AudioNode", audioNodeSocket);

        return node.addInput(input);
    }
  
    worker(node, inputs, outputs) {
        if (inputs.node.length) {
            inputs.node[0].connect(node.data.node);
        }
    }
}