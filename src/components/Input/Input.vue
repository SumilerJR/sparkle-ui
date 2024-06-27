<!--
 * @Author: Sumiler mail@sumiler.com
 * @Date: 2024-06-11 23:19:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-27 23:18:59
 * @FilePath: \v-element\src\components\Input\Input.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="sm-input" :class="{
        [`sm-input--${type}`]: type,
        [`sm-input--${size}`]: size,
        'is-disabled': disabled,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focus': isFocus,
    }">
        <!--  input -->
        <template v-if="type !== 'textarea'">
            <!-- prepend slot -->
            <div v-if="$slots.prepend" class="sm-input__prepend">
                <slot name="prepend"></slot>
            </div>
            <div class="sm-input__wrapper">
                <!-- prefix slot -->
                <span v-if="$slots.prefix" class="sm-input__prefix">
                    <slot name="prefix"></slot>
                </span>
                <!-- input -->
                <input class="sm-input__inner" :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
                    ref="inputRef" v-bind="attrs" :disabled="disabled" :readonly="readonly" :autocomplete="autocomplete"
                    :placeholder="placeholder" :autofocus="autofocus" :form="form" v-model="innerValue"
                    @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur">
                <!-- suffix slot -->
                <span v-if="$slots.suffix || showClear || showPasswordArea" class="sm-input__suffix" @click="keepFocus"> 
                    <slot name="suffix"></slot>
                    <Icon icon="cricle-xmark" v-if="showClear" class="sm-input__clear" @click="clear"
                        @mousedown.prevent="NOOP"
                    ></Icon>
                    <Icon icon="eye" v-if="showPasswordArea && passwordVisible" class="sm-input__password"
                        @click="togglePasswordVisible"></Icon>
                    <Icon icon="eye-slash" v-if="showPasswordArea && !passwordVisible" class="sm-input__password"
                        @click="togglePasswordVisible"></Icon>
                </span>
            </div>
            <!-- append slot -->
            <div v-if="$slots.append" class="sm-input__append">
                <slot name="append"></slot>
            </div>
        </template>
        <!-- textarea -->
        <template v-else>
            <textarea class="sm-textarea__wrapper" v-bind="attrs" ref="inputRef" :disabled="disabled"
                :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus"
                :form="form" v-model="innerValue" @input="handleInput" @change="handleChange" @focus="handleFocus"
                @blur="handleBlur"></textarea>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, useAttrs, nextTick } from 'vue';
import type { Ref } from 'vue';
import type { InputProps, InputEmits } from './types';
import Icon from '../Icon/Icon.vue';

defineOptions({
    name: 'SmInput',
    inheritAttrs: false,
});
const props = withDefaults(defineProps<InputProps>(), { type: 'text', autocomplete: 'off' })
const emits = defineEmits<InputEmits>();
const attrs = useAttrs();
const innerValue = ref(props.modelValue);
const isFocus = ref(false);
const passwordVisible = ref(false);
const inputRef = ref() as Ref<HTMLInputElement>;

const showClear = computed(() =>
    props.clearable &&
    !props.disabled &&
    !!innerValue.value &&
    isFocus.value
)
const showPasswordArea = computed(() =>
    props.showPassword &&
    !props.disabled &&
    !!innerValue.value
);
const togglePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value;
}
const NOOP = () => { }
const keepFocus = async () => {
  await nextTick()
  inputRef.value.focus()
}
const handleInput = () => {
    emits('update:modelValue', innerValue.value);
    emits('input', innerValue.value);
}
const handleChange = () => {
    emits('change', innerValue.value);
}
const handleFocus = (event: FocusEvent) => {
    isFocus.value = true;
    emits('focus', event);
}
const handleBlur = (event: FocusEvent) => {
    isFocus.value = false;
    emits('blur', event);
}
const clear = () => {
    innerValue.value = '';
    emits('update:modelValue', '');
    emits('clear');
    emits('input', '');
    emits('change', '');
}
watch(() => props.modelValue, (newValue) => {
    innerValue.value = newValue;
})
defineExpose({
    ref: inputRef,
})
</script>

<style scoped lang="less"></style>
