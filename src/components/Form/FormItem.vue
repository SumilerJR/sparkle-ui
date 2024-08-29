<template>
  <div class="sm-form-item">
    <label class="sm-form-item__label">
        <!-- 作用域插槽 -->
        <slot name="label" :label="label">
            {{ label }}
        </slot>
    </label>
    <div class="sm-form-item__content">
        <slot/>
    </div>
    {{ innerValue  }} - {{ itemRules }}
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { isNil } from "lodash-es";
import { formContextKey } from "./types";
import type { FormItemProps } from "./types";
defineOptions({
    name: 'SmFormItem'
})
const props = defineProps<FormItemProps>();

const formContext = inject(formContextKey);

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
const itemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop];
  } else {
    return [];
  }
})


</script>
