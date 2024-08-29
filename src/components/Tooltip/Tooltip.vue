<!--
 * @Author: 九日 mail@sumiler.com
 * @Date: 2024-02-02 18:03:15
 * @LastEditors: 九日 mail@sumiler.com
 * @LastEditTime: 2024-02-03 00:16:21
 * @FilePath: \v-element\src\components\Tooltip\Tooltip.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="sm-tooltip" ref="popperContainerNode" v-on="outerEvents">
        <!-- 触发 Tooltip 显示/隐藏的区域 -->
        <div class="sm-tooltip__trigger" ref="triggerNode" v-on="events">
            <!-- 插槽，用于显示触发区域的内容 -->
            <slot></slot>
        </div>
        <Transition :name="transition">
            <!-- Tooltip 弹出框，当 isOpen 为 true 时显示 -->
            <div v-if="isOpen" class="sm-tooltip__popper" ref="popperNode">
                <!-- 自定义插槽，用于显示弹出框的内容 -->
                <slot name="content">
                    <!-- 默认插槽内容，通常是内容的变量或者静态文本 -->
                    {{ content }}
                </slot>
                <div id="arrow" data-popper-arrow></div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import { debounce } from 'lodash-es'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types';
import { ref, reactive, watch, computed, onUnmounted } from 'vue';
import useClickOutside from '../../hooks/useClickOutside'

defineOptions({
    name: "SmTooltip"
})

// 使用默认属性
const props = withDefaults(defineProps<TooltipProps>(), {
    placement: 'bottom',
    trigger: 'hover',
    transition: 'fade',
    openDelay: 0,
    closeDelay: 0,
})

// 定义事件
const emits = defineEmits<TooltipEmits>()

// 控制悬浮框的显示状态
const isOpen = ref(false);

// 触发悬浮框的节点
const triggerNode = ref<HTMLElement>();

// 悬浮框节点
const popperNode = ref<HTMLElement>();
const popperContainerNode = ref<HTMLElement>();

// Popper.js 实例的引用
let popperInstance: null | Instance = null;

// 用于存储事件处理函数的对象，键为事件名称，值为对应的处理函数
let events: Record<string, any> = reactive({});

// 用于存储外部事件处理函数的对象，键为事件名称，值为对应的处理函数
let outerEvents: Record<string, any> = reactive({});

let openTimes = 0;
let closeTimes = 0;

// 计算属性，根据 props 中的 placement 和 popperOptions 动态生成 Popper.js 的配置选项
const popperOptions = computed(() => {
    return {
        placement: props.placement, // 设置放置位置为 props 中的 placement
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 9]
                }
            }
        ],
        ...props.popperOptions // 合并 props 中的其他配置选项
    };
});


// 打开悬浮框，并触发相应事件
const open = () => {
    openTimes++;
    // console.log('open times', openTimes);
    isOpen.value = true; // 更新 isOpen 状态为 true，表示悬浮框已打开
    emits('visible-change', true); // 触发 visible-change 事件，传递 true 表示悬浮框已显示
};

// 关闭悬浮框，并触发相应事件
const close = () => {
    closeTimes++;
    // console.log('close times', closeTimes);
    isOpen.value = false; // 更新 isOpen 状态为 false，表示悬浮框已关闭
    emits('visible-change', false); // 触发 visible-change 事件，传递 false 表示悬浮框已隐藏
};

// 使用debounce防抖函数包装操作，延迟执行，避免频繁触发
const openDebounce = debounce(open, props.openDelay);
const closeDebounce = debounce(close, props.closeDelay);

// 上述简单包装后，任会在最后执行一次open和一次close，继续包装
// 包装后实现：无论如何多次触发，hover时鼠标最终在触发区域则执行一次open，否则执行一次close
const openFinal = () => {
    closeDebounce.cancel(); // 取消关闭操作的防抖
    openDebounce(); // 执行打开操作的防抖
};
const closeFinal = () => {
    openDebounce.cancel(); // 取消打开操作的防抖
    closeDebounce(); // 执行关闭操作的防抖
};


// 切换悬浮框的显示状态
const togglePopper = () => {
    if (isOpen.value) {
        closeFinal();
    } else {
        openFinal();
    }
}

// 点击外部区域关闭悬浮框
useClickOutside(popperContainerNode, () => {
    if (props.trigger === 'click' && isOpen.value && !props.manual) {
        closeFinal();
    }
    if (isOpen.value) {
        emits('click-outside', true);
    }
})

// 添加事件监听器
const attachEvents = () => {
    if (props.trigger === 'hover') {
        events['mouseenter'] = openFinal;
        outerEvents['mouseleave'] = closeFinal;
    } else if (props.trigger === 'click') {
        events['click'] = togglePopper;
    }
}

// 若选择非手动，才需要执行添加事件，手动时无需添加
if (!props.manual) {
    attachEvents();
}

// 监听 manual 属性的变化
watch(() => props.manual, (isManual) => {
    if (isManual) {
        // 清除事件
        events = {};
        outerEvents = {};
    } else {
        attachEvents();
    }
})

// 监听 trigger 属性的变化
watch(() => props.trigger, (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
        // 清除事件
        events = {};
        outerEvents = {};
        attachEvents();
    }
});

// 监听显示状态的变化
watch(isOpen, (newValue) => {
    if (newValue) {
        if (triggerNode.value && popperNode.value) {
            // 创建 Popper.js 实例
            popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
        } else {
            // 销毁 Popper.js 实例
            popperInstance?.destroy()
        }
    }
}, {
    flush: 'post' // 表示在下一个 tick 执行回调函数，确保更新发生在 DOM 更新之后。
});

// 组件销毁时销毁 Popper.js 实例
onUnmounted(() => {
    popperInstance?.destroy()
})

// 暴露给父组件的方法
defineExpose<TooltipInstance>({
    'show': openFinal,
    'hide': closeFinal,
})

</script>

<style scoped >
sm-tooltip__popper {
    margin: 0;
}
</style>