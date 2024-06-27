<!--
 * @Author: 九日 mail@sumiler.com
 * @Date: 2024-01-29 16:50:05
 * @LastEditors: 九日 mail@sumiler.com
 * @LastEditTime: 2024-01-30 17:47:10
 * @FilePath: \v-element\src\components\Button\Button.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <button ref="_ref" class="sm-button" :class="{
        [`sm-button--${type}`]: type, // 当type存在时，会有sm-button--type，其中type会动态地变化
        [`sm-button--${size}`]: size,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
        'is-loading': loading,
    }" :disabled="disabled || loading" :autofocus="autofocus" :type="nativeType">
        <!-- 加载图标 -->
        <Icon icon="spinner" spin v-if="loading" />
        <!-- 自定义图标 -->
        <Icon :icon="icon" v-if="icon" />
        <!-- html的button标签中原生有disabled、autofocus、type属性 -->
        <span>
            <!-- 插槽 -->
            <slot></slot>
        </span>
    </button>
</template>

<!-- <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SmButton"
})
</script> -->


<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from "./types"
import Icon from "../Icon/Icon.vue";

defineOptions({
    name: "SmButton"
})

// 使用 withDefaults 函数，定义ButtonProps的默认属性值
withDefaults(defineProps<ButtonProps>(), {
    nativeType: 'button' // 设置默认的原生类型为 'button'
})

const _ref = ref<HTMLButtonElement>();

defineExpose({
    ref: _ref
})
</script>