import { onMounted, onBeforeUnmount, isRef, watch, unref } from "vue";
import type { Ref } from 'vue'

export default function useEventListener(
    target: Ref<EventTarget | null> | EventTarget,
    event: string,
    handler: (e: Event) => any
) {
    // 如果目标是 ref 类型，则监听其变化
    if (isRef(target)) {
        // 使用 watch 监听 ref 变化
        watch(target, (value, oldValue) => {
            // 移除旧目标的事件监听器
            oldValue?.removeEventListener(event, handler);
            // 添加新目标的事件监听器
            value?.addEventListener(event, handler);
        })
    } else {
        // 如果目标不是 ref 类型，在组件挂载时添加事件监听器
        onMounted(() => {
            target.addEventListener(event, handler);
        });
    }

    // 在组件卸载前移除事件监听器
    onBeforeUnmount(() => {
        // 使用 unref 确保获取到的是非 ref 类型的目标
        unref(target)?.removeEventListener(event, handler);
    });
}
