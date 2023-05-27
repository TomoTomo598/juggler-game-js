function State() {
    this.actions = {};
    this.mutations = {};
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
            callback();
        },
    });
    function watchArray(array, index, callback) {
        let deletedArr = null;
        return new Proxy(array, {
            deleteProperty(target, prop) {
                deletedArr = [...array];
                const result = Reflect.defineProperty(target, prop);
                return result;
            },
            set(target, prop, val, receiver) {
                const oldArr = [...array];
                const result = Reflect.set(target, prop, val, receiver);
                return
            }
        });
        
    }
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