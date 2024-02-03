<template>
    <!-- Dropdown 组件 -->
    <div class="sm-dropdown">
        <!-- Tooltip 包裹 -->
        <Tooltip :trigger="trigger" :placement="placement" :popper-options="popperOptions" :open-delay="openDelay"
            :close-delay="closeDelay" :manual="manual" @visible-change="visibleChange" ref="tooltipRef">
            <!-- 插槽内容 -->
            <slot></slot>
            <!-- Tooltip 内容插槽 -->
            <template #content>
                <!-- 下拉菜单列表 -->
                <ul class="sm-dropdown__menu">
                    <!-- 遍历菜单选项 -->
                    <template v-for="item in menuOptions" :key="item.key">
                        <!-- 如果菜单项为禁用状态，则渲染分隔符 -->
                        <li v-if="item.disabled" role="separator" class="divided-placeholder"></li>
                        <!-- 渲染普通菜单项 -->
                        <li class="sm-dropdown__item" @click="itemClick(item)"
                            :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
                            :id="`dropdown-item-${item.key}`">
                            <!-- 菜单项文本内容 -->
                            <!-- {{ item.label }} -->
                            <RenderVnode :v-node="item.label"></RenderVnode>
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue'
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue';
import RenderVnode from '../Common/RenderVnode.ts'
import type { TooltipInstance } from '../Tooltip/types';
// 定义组件属性
const props = withDefaults(defineProps<DropdownProps>(), {
    hideAfterClick: true,
})

// 定义组件事件
const emits = defineEmits<DropdownEmits>()

// 创建 Tooltip 实例的引用
const tooltipRef = ref() as Ref<TooltipInstance>;

// 处理 Tooltip 显隐变化事件
const visibleChange = (e: boolean) => {
    emits('visible-change', e);
}

// 处理菜单项点击事件
const itemClick = (e: MenuOption) => {
    if (e.disabled) {
        return;
    }
    emits('select', e);
    if (props.hideAfterClick) {
        tooltipRef.value.hide()
    }
}

// 暴露组件实例方法
defineExpose<DropdownInstance>({
    show: tooltipRef.value?.show,
    hide: tooltipRef.value?.hide,
})
</script>
