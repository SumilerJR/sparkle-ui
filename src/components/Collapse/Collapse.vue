<template>
    <div class="sm-collapse">
        <slot />
    </div>
</template>
<script setup lang="ts">
import { ref, provide, watch } from 'vue';
import type { NameType, CollapseProps, CollapseEmits } from './types';
import { collapseContextKey } from './types'

defineOptions({
    name: "SmCollapse"
})

const props = defineProps<CollapseProps>(); // 定义组件的属性 props，类型为 CollapseProps
const emits = defineEmits<CollapseEmits>(); // 定义组件的事件 emits，类型为 CollapseEmits

const activeNames = ref<NameType[]>(props.modelValue); // 创建响应式引用 activeNames，并初始化为 props 中的 modelValue
// 监听 modelValue 属性的变化
watch(() => props.modelValue, () => {
    // 将 modelValue 的值赋给 activeNames，确保折叠面板的展开状态与外部传入的值同步
    activeNames.value = props.modelValue;
})

if (props.accordion && activeNames.value.length > 1) {
    console.warn('手风琴模式应该只有一个活动项')
}

const handleItemClick = (item: NameType) => {
    // 若设置了手风琴模式，则只有一个活动项
    if (props.accordion) {
        // 若点击的是它自己则置空（关闭上），否则替换为新的item
        activeNames.value = [activeNames.value[0] == item ? '' : item]
    } else {
        const index = activeNames.value.indexOf(item);
        if (index > -1) {
            // 存在，删除数组中对应的一项
            activeNames.value.splice(index, 1);
        } else {
            // 不存在，插入对应的name
            activeNames.value.push(item);
        }
    }
    emits('update:modelValue', activeNames.value); // 触发更新 modelValue 事件，传递当前的展开项目标识符数组
    emits('change', activeNames.value); // 触发 change 事件，传递当前的展开项目标识符数组

}

// provide：用于提供可以被后代组件注入的值，即提供值为collapseContextKey的数据给item
provide(collapseContextKey, {
    activeNames,
    handleItemClick
})
</script>