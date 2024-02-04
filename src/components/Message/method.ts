import { render, h, shallowReactive } from 'vue';
import type { CreateMessageProps, MessageContext } from './types';
import MessageConstructor from './Message.vue'
import useZIndex from '@/hooks/useZIndex';
// 生成消息实例的计数
let seed = 1;

// 存储消息实例的数组
const instances: MessageContext[] = shallowReactive([]);

// 创建消息的函数
export const createMessage = (props: CreateMessageProps) => {
    const { nextZIndex } = useZIndex();
    // 为消息实例生成唯一标识
    const id = `message_${seed++}`;

    // 创建一个新的 div 元素作为消息的容器
    const container = document.createElement('div');

    // 销毁消息的函数
    const destory = () => {
        // 删除数组中的实例
        const idx = instances.findIndex(instance => instance.id === id);
        if (idx === -1) return;
        instances.splice(idx, 1);

        // 通过这行代码可以实现销毁组件的功能
        render(null, container);
    }
    // 手动调用删除，其实就是手动的调整数组中 visible的值
    // visible 是通过 expose 传出来的
    const manualDestory = () => {
        const instance = instances.find(instance => instance.id === id);
        if (instance) {
            instance.vm.exposed!.visible.value = false;
        }
    }
    // 将销毁函数添加到 props 上
    const newProps = {
        ...props,
        id,
        zIndex: nextZIndex(),
        // 将该函数封装后添加到props上
        onDestory: destory,
    }
    // 创建消息组件的 vnode
    const vnode = h(MessageConstructor, newProps);
    // 将 vnode 渲染到 container 中
    render(vnode, container);
    // 非空断言操作符!
    document.body.appendChild(container.firstElementChild!);
    // 创建并存储消息实例
    const vm = vnode.component!;
    const instance = {
        id,
        vnode,
        vm,
        props: newProps,
        destory: manualDestory,
    }
    instances.push(instance);
    // 返回创建的消息实例
    return instance;
}

// 获取最后一个消息实例的函数
export const getLastInstance = () => {
    return instances.at(-1);
}

export const getLastBottomOffset = (id: string) => {
    const idx = instances.findIndex(instances => instances.id === id);
    if (idx <= 0) {
        return 0;
    } else {
        const prev = instances[idx - 1];
        return prev.vm.exposed!.bottomOffset.value;
    }
}

export const closeAll = () => {
    instances.forEach(instance => {
        instance.destory()
    })
}