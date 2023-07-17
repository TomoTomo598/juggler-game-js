function State() {
    this.actions = {};
    this.mutations = {};
    this.history = [];
}
State.prototype.subscribe = function(prop, callback) {
    if (!callback) {
        const errorMessage = "Could not found an argument of callback";
        alert(errorMessage);
        throw new Error(errorMessage);
    };
    let subscribe = null;
    Object.defineProperty(this, prop, {
        get() {
            return subscribe;
        },
        set(value) {
            subscribe = value;
            this.history.push(Object.fromEntries([prop, value]));
            callback();
        },
    });
};

State.prototype.watchArray = function(prop, callback) {
    Object.defineProperty(prop, 'push', {
        value() {
            const oldArr = [...this];
            // push() progress
            let n = this.length;
            for (let i=0; i<arguments.length; i++, n++) {
                this[n] = arguments[i];
            }
            callback(oldArr, this);
            return n;
        },
    });
};

State.prototype.commit = function(action, callback) {
    if ('function' === typeof callback) this.actions[action] = callback;
};

State.prototype.dispatch = function(action, ...data) {
    if (action in this.actions) {
        if (data) this.actions[action].apply(this, ...data);
        this.actions[action]();
    }
};

const store = new State();

export default store;