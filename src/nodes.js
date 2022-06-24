let context;

const getOrCreateAudioContext = () => {
    if (!context) {
        context = new AudioContext();
    }

    return context;
}

export const getOscillatorNode = ({
        type = 'square',
        frequency = 440
    } = {}) => {
    const context = getOrCreateAudioContext();
    const oscillator = context.createOscillator();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, getContextCurrentTime()); // value in hertz
    // oscillator.connect(audioCtx.destination);
    oscillator.start();
    return oscillator
}

export const getContextCurrentTime = () => {
    return getOrCreateAudioContext().currentTime
}

export const getDestinationNode = () => {
    const context = getOrCreateAudioContext();

    return context.destination;
}

export const getGainNode = () => {
    return getOrCreateAudioContext()
        .createGain();
}