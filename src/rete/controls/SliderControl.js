import React from 'react';
import Rete from 'rete';

export default class SliderControl extends Rete.Control {

    static component = ({ value, onChange }) => (
      <input
        type="range"
        value={value}
        min={0}
        max={10}
        ref={(ref) => {
          ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
        }}
        onChange={(e) => onChange(+e.target.value)}
      />
    );
  
    constructor(emitter, key, node, readonly = false) {
      super(key);
      this.emitter = emitter;
      this.key = key;
      this.component = SliderControl.component;
  
      const initial = node.data[key] || 0;
  
      node.data[key] = initial;
      this.props = {
        readonly,
        value: initial,
        onChange: (v) => {
          this.setValue(v);
          this.emitter.trigger("process");
        }
      };
    }
  
    setValue(val) {
      this.props.value = val;
      this.putData(this.key, val);
      this.update();
    }
  }