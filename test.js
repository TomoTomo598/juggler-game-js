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

MyClass.prototype.watchArray = function(prop, callback) {
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
//push
console.log('_________[PUSH]_________');
myclass.animal = [];
myclass.watchArray(myclass.animal, (older, newer) => {
    console.log(older);
    console.log('====>', newer);
});
myclass.animal.push('cat');
myclass.animal.push('mouse');


const obj = { a: 1, b: 2, c: 3 };
Object.keys(obj).forEach(key => console.log(obj[key]));