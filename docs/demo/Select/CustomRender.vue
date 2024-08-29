<script setup>
import { h, ref } from 'vue'
import Select from '@/components/Select/Select.vue'
const test = ref('1')
const options2 = [
    { label: 'hello', value: '1' },
    { label: 'xyz', value: '2' },
    { label: 'testing', value: '3' },
    { label: 'check', value: '4', disabled: true }
];
const customRender = (option) => {
    return h('div', { className: 'xyz' }, [h('b', option.label), h('span', option.value)]);
}
</script>
<template>
    <Select v-model="test" placeholder="基础选择器，请选择" :options="options2" :clearable="true" :renderLabel="customRender" />
</template>

<style lang="css">
.sm-select__menu-item, .xyz {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
</style>