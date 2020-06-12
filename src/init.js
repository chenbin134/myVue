import {initState} from './state.js'
export function initMixin(Vue){
    Vue.prototype._init = function(options){
        let vm = this; // 当前vue实例
        vm.$options = options; // options是用户传入的所有参数
        initState(vm);
    }

}