const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEnterKey = (evt) => evt.key === 'Enter';

const isControlKey = (evt) => evt.ctrlKey;

const isCommandKey = (evt) => evt.keyCode === 224 || evt.keyCode === 91 || evt.keyCode === 93;

export {isEscapeKey, isEnterKey, isControlKey, isCommandKey};
