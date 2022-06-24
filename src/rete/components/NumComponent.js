import Rete from 'rete';
import NumControl from '../controls/NumControl';
import { numSocket } from '../sockets';

export default class NumComponent extends Rete.Component {
    constructor() {
        super("Number");
    }
  
    builder(node) {
        var out1 = new Rete.Output("num", "Number", numSocket);
        var ctrl = new NumControl(this.editor, "num", node);

        return node.addControl(ctrl).addOutput(out1);
    }
  
    worker(node, inputs, outputs) {
        console.log('worker');
        outputs["num"] = node.data.num;
    }
  }