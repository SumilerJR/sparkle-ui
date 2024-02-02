import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

// 描述测试套件
describe('Collapse.vue', () => {
  // 测试基本的折叠功能
  test('basic collapse', async () => {
    // 挂载 Collapse 组件
    const wrapper = mount(Collapse, {
      props: {
        'modelValue': ['a']
      },
      // 定义插槽内容
      slots: {
        default: (
          <>
            <CollapseItem name="a" title="title a">
              content a
            </CollapseItem>
            <CollapseItem name="b" title="title b">
              content b
            </CollapseItem>
            <CollapseItem name="c" title="title c" disabled>
              content c
            </CollapseItem>
          </>
        )
      },
      // 全局配置
      global: {
        // 使用 Icon 组件的 stub（桩函数）
        stubs: ['Icon']
      },
      // 将组件挂载到 document.body 上
      attachTo: document.body
    })

    // 获取折叠项头部和内容元素
    const headers = wrapper.findAll('.sm-collapse-item__header')
    const contents = wrapper.findAll('.sm-collapse-item__wrapper')

    // 验证长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // 验证文本内容
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')

    // 验证内容是否可见
    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')

    // 模拟行为
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()

    // 验证是否发出了 'change' 事件并检查事件内容
    expect(wrapper.emitted()).toHaveProperty('change')
    const changeEvent = wrapper.emitted('change') as any[]
    console.table(changeEvent)
    expect(changeEvent).toHaveLength(2)
    expect(changeEvent[0]).toEqual([[]])
    expect(changeEvent[1]).toEqual([['b']])

    // 验证禁用项是否生效
    const disableHeader = headers[2]
    expect(disableHeader.classes()).toContain('is-disabled')
    await disableHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
  })
})
