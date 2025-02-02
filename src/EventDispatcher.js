export class EventDispatcher {
  #listenerGroup = {};

  on = (type, listener) => {
    const listeners = this.#listenerGroup[type];
    if (listeners === undefined) {
      this.#listenerGroup[type] = [listener];
    } else if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }
  };

  off = (type, listener) => {
    const listeners = this.#listenerGroup[type];
    if (listeners !== undefined) {
      const i = listeners.indexOf(listener);
      if (i !== -1) listeners.splice(i, 1);
    }
  };

  offType = (type) => {
    delete this.#listenerGroup[type];
  };

  offAll = () => {
    this.#listenerGroup = {};
  };

  emit = (type, ...args) => {
    const listeners = this.#listenerGroup[type];
    if (listeners !== undefined) {
      const listenersCount = listeners.length;
      for (let i = 0; i < listenersCount; i++) {
        listeners[i](...args);
      }
    }
  };
}
