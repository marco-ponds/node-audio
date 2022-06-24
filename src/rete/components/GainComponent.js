import Rete from 'rete';
import { getContextCurrentTime } from '../../nodes';
import SliderControl from '../controls/SliderControl';
import { audioNodeSocket } from '../sockets';

export default class GainComponent extends Rete.Component {

    constructor() {
        super("GainComponent");
    }

    builder(node) {
        return node
            .addControl(new SliderControl(this.editor, 'gain', node))
            .addInput( new Rete.Input("node", "AudioNode", audioNodeSocket))
            .addOutput( new Rete.Output("node", "AudioNode", audioNodeSocket));
    }
  
    worker(node, inputs, outputs) {
        if (inputs.node.length) {
            inputs.node[0].connect(node.data.node);
        }

        node.data.node.gain.setValueAtTime(node.data.gain, getContextCurrentTime());

        outputs['node'] = node.data.node;
    }
}