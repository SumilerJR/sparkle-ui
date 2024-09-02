<template>
    <Transition :name="transitionName" @after-leave="destroyComponent" @enter="updateHeight">
        <div class="sm-message" v-show="visible" :class="{
            [`sm-message--${type}`]: type,
            'is-close': showClose
        }" role="alert" ref="messageRef" :style="cssStyle" @mouseenter="clearTimer" @mouseleave="startTimer">
            <div class="sm-message__content">
                <slot>
                    <RenderVnode :v-node="message" v-if="message"></RenderVnode>
                </slot>
            </div>
            <div class="sm-message__close" v-if="showClose">
                <Icon @click.stop="visible = false" icon="xmark"></Icon>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import type { MessageProps } from './types';
import RenderVnode from '../Common/RenderVnode'
import Icon from '../Icon/Icon.vue'
import { getLastBottomOffset } from './method'
import useEventListener from '@/hooks/useEventListener'

defineOptions({
    name: "SmMessage"
})

const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    duration: 3000,
    offset: 20,
    transitionName: 'fade-up',
});
const visible = ref(false);
const messageRef = ref<HTMLDivElement>();

// 计算偏移高度
// 这个 div 的高度
const height = ref(0);
// 上一个实例的最下面的坐标数字，第一个是 0
const lastOffset = computed(() => getLastBottomOffset(props.id));
// 这个元素应该使用的 top
const topOffset = computed(() => props.offset + lastOffset.value);
// 这个元素为下一个元素预留的 offset，也就是它最低端bottom的值
const bottomOffset = computed(() => height.value + topOffset.value);
const cssStyle = computed(() => ({
    top: topOffset.value + 'px',
    zIndex: props.zIndex,
}))
let timer: any;
function startTimer() {
    // 如果持续时间为0，则直接返回，不启动定时器
    if (props.duration === 0) return;

    // 启动定时器，在持续时间结束后将 visible 设置为 false
    timer = setTimeout(() => {
        visible.value = false;
    }, props.duration);
}
function clearTimer() {
    clearTimeout(timer);
}
onMounted(async () => {
    visible.value = true;
    // 启动定时器
    startTimer();
    // 等待 DOM 更新完成后获取消息组件的高度
    // await nextTick();
    // height.value = messageRef.value!.getBoundingClientRect().height;
})
function keydown(e: Event) {
    const event = e as KeyboardEvent;
    if (event.code === 'Escape') {
        visible.value = false;
    }
}
useEventListener(document, 'keydown', keydown)
// watch(visible, (newValue) => {
//     // 如果 visible 变为 false，则执行 onDestory 函数销毁消息组件
//     if (!newValue) {
//         props.onDestory();
//     }
// })

// 两个Transition钩子函数，有这两个后就不用watch visible和nextTick后修改height了
function destroyComponent() {
    props.onDestory()
}
function updateHeight() {
    height.value = messageRef.value!.getBoundingClientRect().height
}
// 将 bottomOffset 暴露给父组件使用
defineExpose({
    bottomOffset,
    visible,
})

</script>