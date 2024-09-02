<template>
    <form class="sm-form">
        <slot />
    </form>
</template>

<script setup lang="ts">
import { provide } from "vue";
import type { ValidateFieldsError } from "async-validator";
import type { FormContext, FormInstance, FormItemContext, FormProps, FormValidateFailure } from "./types";
import { formContextKey } from "./types";
defineOptions({
    name: 'SmForm'
})
const props = defineProps<FormProps>();

const fields: FormItemContext[] = [];
/**
 * 添加 filed
 * @param filed 
 */
const addField: FormContext['addField'] = (filed) => {
    fields.push(filed);
}
/**
 * 移除 filed
 * @param filed 
 */
const removeField: FormContext['removeField'] = (filed) => {
    if (filed.prop) {
        fields.splice(fields.indexOf(filed), 1);
    }
}
const resetFields = (keys: string[] = []) => {
    const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields;
    filterArr.forEach(field => field.resetField());
}
const clearValidate = (keys: string[] = []) => {
    const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields;
    filterArr.forEach(field => field.clearValidate());
}
/**
 * 是否验证通过
 */
const validate = async (keys: string[] = []): Promise<any> => {
    const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields;
    let validationErrors: ValidateFieldsError = {};
    for (const field of filterArr) {
        try {
            await field.validate('');
        } catch (e) {
            const error = e as FormValidateFailure;
            validationErrors = {
                ...validationErrors,
                ...error.fields,
            }
        }
    }
    if (Object.keys(validationErrors).length === 0) return true;
    return Promise.reject(validationErrors);
}
provide(formContextKey, {
    ...props,
    addField,
    removeField,
});
/**
 * 将 validate 暴露出去
 */
defineExpose<FormInstance>({
    validate,
    resetFields,
    clearValidate,
})




</script>