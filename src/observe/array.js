let oldArrayMethods = Array.prototype;

export  let arrayMethods = Object.create(oldArrayMethods);

let methods = [
    'pop',
    'push',
    'shift',
    'unshift',
    'splice',
    'reverse',
    'sort'
]

methods.forEach(method => {
    arrayMethods[method] = function(...args){
        let ob = this.__ob__;
        let result = oldArrayMethods[method].apply(this,args);
        let inserted;
        switch(method){
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break
            default :
                break
        }
        inserted && ob.observeArray(inserted)
        return result;
    }
})