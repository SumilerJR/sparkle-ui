<template>
  <div class="sm-form-item" :class="{
    'is-error': validateStatus.state === 'error',
    'is-success': validateStatus.state === 'success',
    'is-loading': validateStatus.loading,
    'is-required': isRequired,
  }">
    <label class="sm-form-item__label">
      <!-- 作用域插槽 -->
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="sm-form-item__content">
      <slot :validate="validate" />
      <div class="sm-form-item__error-msg" v-if="validateStatus.state === 'error'">{{ validateStatus.errorMsg }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, reactive, provide, onMounted, onUnmounted } from "vue";
import Schema from 'async-validator';
import { isNil } from "lodash-es";
import { formContextKey, formItemContextKey } from "./types";
import type { FormItemProps, FormValidateFailure, FormItemContext, FormItemRule, ValidateStatusProp, FormItemInstance } from "./types";
defineOptions({
  name: 'SmFormItem'
})
const props = defineProps<FormItemProps>();

const formContext = inject(formContextKey);
const validateStatus: ValidateStatusProp = reactive({
  state: 'init',
  errorMsg: '',
  loading: false,
})
let initialValue: any = null;
const innerValue = computed(() => {
  // 拿到model
  const model = formContext?.model;
  // model存在且传入了prop，且model中有当前prop的值
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  } else {
    return null;
  }
})
/**
 * 计算rules
 */
const itemRules = computed((): FormItemRule[] => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop];
  } else {
    return [];
  }
})
/**
 * 获取出发规则
 * @param trigger 
 */
const getTriggeredRules = (trigger?: string): FormItemRule[] => {
  const rules = itemRules.value;
  if (rules) {
    return rules.filter(rule => {
      // 若rule中没有trigger或形参trigger为空,用默认
      if (!rule.trigger || !trigger) return true;
      return rule.trigger && rule.trigger === trigger;
    })
  } else {
    return [];
  }
}
/**
 * 是否必选
 * 有一个rule为required则整个item为required
 */
const isRequired = computed(() => {
  return itemRules.value.some(rule => rule.required);
})
/**
 * 校验函数
 */
const validate = async (trigger?: string) => {
  const modelName = props.prop;
  const triggeredRules = getTriggeredRules(trigger);
  if (triggeredRules.length === 0) {
    // 规则为空时,直接通过
    return true;
  }
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules,
    });
    validateStatus.loading = true;
    return validator.validate({
      [modelName]: innerValue.value,
    }).then(() => {
      validateStatus.state = 'success';
    }).catch((e: FormValidateFailure) => {
      const { errors } = e;
      validateStatus.state = 'error';
      validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || '' : '';
      return Promise.reject(e);
    }).finally(() => {
      validateStatus.loading = false;
    })
  }
}
const clearValidate = () => {
  validateStatus.state = 'init';
  validateStatus.errorMsg = '';
  validateStatus.loading = false;
}
const resetField = () => {
  clearValidate();
  // 拿到model
  const model = formContext?.model;
  // model存在且传入了prop，且model中有当前prop的值
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue;
  }
}
const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  clearValidate,
  resetField,
}
/**
 * provide出去
 */
provide(formItemContextKey, context);

// 挂载时添加自身到 field
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
    // 初始赋值
    initialValue = innerValue.value;
  }
})
onUnmounted(() => {
  formContext?.removeField(context);
})
defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  resetField,
  clearValidate,
})
</script>
