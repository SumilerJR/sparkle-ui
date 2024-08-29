<script setup>
import { ref } from 'vue'
import Select from '@/components/Select/Select.vue'
const test = ref('')
const options2 = [
    { label: 'hello', value: '1' },
    { label: 'xyz', value: '2' },
    { label: 'testing', value: '3' },
    { label: 'check', value: '4', disabled: true }
];
const states = [
    'A', 'B', 'C', 'D'
];
const remoteFilter = (query) => {
    return new Promise((resolve) => {
        if (query) {
            setTimeout(() => {
                const options = states.filter((item) => {
                    return item.toLowerCase().includes(query.toLowerCase());
                }).map(label => {
                    return { label, value: label }
                })
                resolve(options);
            }, 500);
        } else {
            resolve([]);
        }
    })
}
</script>
<template>
  <Select v-model="test" placeholder="搜索远程结果" filterable remote :remoteMethod="remoteFilter" />
  <p>value：{{ test }}</p>
</template>