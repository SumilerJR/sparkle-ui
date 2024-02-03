<!--
 * @Author: 九日 mail@sumiler.com
 * @Date: 2024-01-29 16:35:27
 * @LastEditors: 九日 mail@sumiler.com
 * @LastEditTime: 2024-02-03 00:22:37
 * @FilePath: \v-element\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Tooltip from './components/Tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'
import type { ButtonInstance } from '@/components/Button/types'
import Collapse from './components/Collapse/Collapse.vue';
import Item from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue'
import type { TooltipInstance } from './components/Tooltip/types';

const buttonRef = ref<ButtonInstance | null>(null);
const tolltipRef = ref<TooltipInstance | null>(null);
const trigger = ref<any>('click')

const openedValue = ref(['a']);

onMounted(() => {

})
</script>

<template>
  <header>
    <Tooltip placement="right" :trigger="trigger" ref="tolltipRef" :open-delay="1000" :close-delay="1000">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
      <template #content>
        <p>Hello Tooltip</p>
      </template>
    </Tooltip>
  </header>
  <Icon icon="arrow-down" size="2xl" type="danger" />
  <Icon icon="arrow-up" size="2xl" type="primary" color="#0e7a0d" />
  <main>
    <Button ref="buttonRef">Test Button</Button>
    <Button plain>Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br /><br />
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br /><br />
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br /><br />
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br /><br />
    <Button size="large" loading>Loading</Button>
    <Button size="large" icon="arrow-up">Icon</Button><br /><br />
    <a href="#">Test Link</a>

    <Collapse v-model="openedValue" accordion>
      <Item name="a" title="Title A">
        <template #title>
          <h1> this is a test</h1>
        </template>
        <div> this is a test </div>
      </Item>
      <Item name="b" title="Title B">
        <div> this is bbbbb test </div>
      </Item>
      <Item name="c" title="Disabled Title" disabled>
        <div> this is cccc test </div>
      </Item>
    </Collapse>
    {{ openedValue }}
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
