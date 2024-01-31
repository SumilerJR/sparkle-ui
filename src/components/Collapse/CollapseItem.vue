<!--
 * @Author: 九日 mail@sumiler.com
 * @Date: 2024-01-30 19:13:11
 * @LastEditors: 九日 mail@sumiler.com
 * @LastEditTime: 2024-01-30 21:10:37
 * @FilePath: \v-element\src\components\Collapse\CollapseItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="sm-collapse-item" :class="{
        'is-disabled': disabled,
    }">
        <div class="sm-collapse-item__header" :id="`item-header-${name}`" @click="handleClick">
            <slot name="title">{{ title }}</slot>
        </div>
        <div class="sm-collapse-item__content" :id="`item-content-${name}`" v-show="isActive">
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject, computed } from "vue";
import type { CollapseItemProps } from "./types";
import { collapseContextKey } from "./types";

defineOptions({
    name: "SmCollapseItem"
})
const props = defineProps<CollapseItemProps>()
// inject：注入一个由祖先组件或整个应用 (通过 app.provide()) 提供的值。
const collapseContext = inject(collapseContextKey)
// isActive决定是否展示，而isActive的值由计算属性通过判断当前name的组件是否在activeNames中
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name));
const handleClick = () => {
    // 若是disabled的，不做处理
    if (props.disabled) { return }
    // 调用父级组件中的函数，并传入当前Item的name
    collapseContext?.handleItemClick(props.name)
}
</script>

<style>
.sm-collapse-item__header {
    font-size: 30px;
}
</style>