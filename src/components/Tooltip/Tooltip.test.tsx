/*
 * @Author: 九日 mail@sumiler.com
 * @Date: 2024-02-03 00:14:40
 * @LastEditors: 九日 mail@sumiler.com
 * @LastEditTime: 2024-02-03 10:48:12
 * @FilePath: \v-element\src\components\Tooltip\Tooltip.test.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'

// 使用 vitest 提供的 mock 功能模拟 @popperjs/core 模块
vi.mock('@popperjs/core')

// 定义一个 mock 函数来模拟 onVisibleChange 回调函数
const onVisibleChange = vi.fn()

describe('Tooltip.vue', () => {
  beforeEach(() => {
    // 在每个测试用例执行前，使用 fakeTimers 模拟计时器
    vi.useFakeTimers()
  })

  test('basic tooltip', async () => {
    // 挂载 Tooltip 组件到 Vue 实例中进行测试
    const wrapper = mount(() =>
      <div>
        <div id="outside"></div>
        <Tooltip content="hello tooltip" trigger='click' onVisibleChange={onVisibleChange}>
          <button id="trigger">Trigger</button>
        </Tooltip>
      </div>
      , {
        attachTo: document.body // 将组件挂载到 document.body 上
      })

    // 静态测试
    const triggerArea = wrapper.find('#trigger') // 查找触发器区域
    expect(triggerArea.exists()).toBeTruthy() // 验证触发器区域存在
    expect(wrapper.find('.sm-tooltip__popper').exists()).toBeFalsy() // 验证悬浮框未显示

    // 测试点击触发行为
    triggerArea.trigger('click') // 触发点击事件
    await vi.runAllTimers() // 等待所有计时器执行完毕

    // 验证悬浮框已显示且内容正确
    expect(wrapper.find('.sm-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.sm-tooltip__popper').text()).toBe('hello tooltip')

    // 验证回调函数 onVisibleChange 被正确调用
    expect(onVisibleChange).toHaveBeenCalledWith(true)

    // 模拟点击外部区域
    wrapper.get('#outside').trigger('click') // 触发点击事件
    await vi.runAllTimers() // 等待所有计时器执行完毕

    // 验证悬浮框已关闭且回调函数 onVisibleChange 被正确调用
    expect(wrapper.find('.sm-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
