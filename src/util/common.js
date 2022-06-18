const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEnterKey = (evt) => evt.key === 'Enter';

const isControlKey = (evt) => evt.ctrlKey;

export {isEscapeKey, isEnterKey, isControlKey};
