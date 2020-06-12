import {observe} from './observe/index.js'
export function initState(vm){
    const opts = vm.$options;
    if(opts.props) {
        initProps(vm)
    }
    if(opts.methods) {
        initMethod(vm)
    }
    if(opts.data) {
        initData(vm)
    }
    // .....
}
function initProps(vm){}
function initMethod(vm){}
function initData(vm){
    let data = vm.$options.data;
    data = vm._data =  typeof data == 'function' ? data() : data;
    observe(data);
}