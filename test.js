'user strict'

function MyClass() {
    this.history = [];
}
MyClass.prototype.subscribe = function(prop, initial, callback, data) {
    if (typeof callback !== 'function') return;
    let subscribe = null;

    Object.defineProperty(this, prop, {
        get() {
            if (!subscribe) return initial;
            return subscribe;
        },
        set(val) {
            subscribe = val;
            this.history.push({ val: val });
            callback(data);
            console.log("Setted an another value...");
        },
    });
};

let myclass = new MyClass();
myclass.subscribe("food", 'burger', (data) => {
    console.log("---------🍔 ⭐ 🥪---------");
    console.table(data);
    console.log("---------🍔 ⭐ 🥪---------");
}, myclass.history);
console.log(myclass.food);
myclass.food = 'rice';
console.log(myclass.food);
myclass.food = 'bread';
console.log(myclass.food);