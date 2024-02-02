<!--
 * @Author: 九日 mail@sumiler.com
 * @Date: 2024-01-31 15:16:15
 * @LastEditors: 九日 mail@sumiler.com
 * @LastEditTime: 2024-01-31 16:30:53
 * @FilePath: \v-element\src\components\Icon\Icon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <i class="sm-icon" :class="{ [`sm-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
        <font-awesome-icon v-bind="filteredProps" />
    </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import type { IconProps } from './types.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
    name: 'SmIcon',
    inheritAttrs: false, // 禁用了透传属性，则在组件上的class或事件等都无法赋值到对应的节点上
})

const props = defineProps<IconProps>()
// 若想对props进行相应的响应式计算，那一定要记得利用computed进行包裹一下，让其根据响应式属性进行改变，非常容易忽略！
const filteredProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
    return props.color ? { color: props.color } : {}
})
</script>

<style scoped lang="less"></style>
