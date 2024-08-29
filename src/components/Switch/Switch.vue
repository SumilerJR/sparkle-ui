<template>
    <div class="sm-switch" :class="{
        [`sm-switch--${size}`]: size,
        'is-disabled': disabled,
        'is-checked': checkd,
    }" @click="switchValue">
        <input class="sm-switch__input" type="checkbox" role="switch" ref="input" :name="name" :disabled="disabled"
            @keydown.enter="switchValue" />
        <div class="sm-switch__core">
            <div class="sm-switch__core-inner">
                <span v-if="activeText || inactiveText" class="sm-switch__core-inner-text">
                    {{ checkd ? activeText : inactiveText }}
                </span>
            </div>
            <div class="sm-switch__core-action"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, ref } from 'vue';
import type { SwitchProps, SwitchEmits } from './types';
defineOptions({
    name: 'SmSwitch',
    inheritAttrs: false,
})
const props = withDefaults(defineProps<SwitchProps>(), {
    activeValue: true,
    inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();

const innerValue = ref(props.modelValue);
const input = ref<HTMLInputElement>();
// 现在是否被选中
const checkd = computed(() => innerValue.value === props.activeValue);
const switchValue = () => {
    if (props.disabled) return; // 如果组件处于禁用状态，则不进行处理

    // 根据当前状态值来确定新的状态值
    const newValue = checkd.value ? props.inactiveValue : props.activeValue;
    innerValue.value = newValue; // 更新内部的状态值

    // 触发事件以通知父组件状态值的变化
    emits('update:modelValue', newValue); // 更新 v-model 的值
    emits('change', newValue); // 触发 change 事件并传递新的状态值
}
onMounted(() => {
    input.value!.checked = checkd.value;
})
watch(checkd, (val) => {
    input.value!.checked = val;
})
watch(() => props.modelValue, (newValue) => {
    innerValue.value = newValue;
})
</script>
