
function Listener(listener) {
    this.action = listener.action;
    this.controller = listener.controller;
    this.callback = listener.callback;
}

Listener.prototype.equalsTo = function (newListener) {
    return (this.action === newListener.action && this.controller === newListener.controller);
};

module.exports = Listener;