import { isObject } from '../util.js'
import { arrayMethods } from './array.js'
class Observe {
    constructor(data) {
        Object.defineProperty(data,'__ob__',{
            enumerable : false,
            configurable : false,
            value : this
        })
        // 遍历对象，使用Object.defineProperty 处理
        if (Array.isArray(data)) { // 如果是数组
            data.__proto__ = arrayMethods;
            this.observeArray(data);// 如果是对象数组，将其每一项都observe arr[0].name = xxx
        } else {
            this.walk(data)
        }

    }
    walk(data) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key]);
        })
    }
    observeArray(data){
        for(let i=0;i<data.length;i++) {
            observe(data[i])
        }
    }


}
// 遍历递归为data的每个属性增加get set 方法
function defineReactive(data, key, value) {
    observe(value); // 如果data内的属性还有对象，也做循环添加get set
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newvalue) {
            if (value == newvalue) return;
            observe(newvalue);
            value = newvalue
        }
    })

}
export function observe(data) {

    if (!isObject(data)) {
        return;
    }

    if(data.__ob__ instanceof Observe) {
        return;
    }

    return new Observe(data);


}