import { describe, test, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

// 创建一个 mock 函数用于模拟 onChange 回调
const onChange = vi.fn()

// 定义测试组件实例和相关变量
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstContent: DOMWrapper<Element>, secondContent: DOMWrapper<Element>, disabledContent: DOMWrapper<Element>,
    firstHeader: DOMWrapper<Element>, secondHeader: DOMWrapper<Element>, disabledHeader: DOMWrapper<Element>

// 描述测试用例
describe('Collapse.vue', () => {
    // 在所有测试之前执行的操作
    beforeAll(() => {
        // 挂载 Collapse 组件
        wrapper = mount(() =>
            <Collapse modelValue={['a']} onChange={onChange}>
                <CollapseItem name="a" title="title a">
                    content a
                </CollapseItem>
                <CollapseItem name="b" title="title b">
                    content b
                </CollapseItem>
                <CollapseItem name="c" title="title c" disabled>
                    content c
                </CollapseItem>
            </Collapse>
            , {
                // 全局配置
                global: {
                    // 对于 Icon 组件的 stub（桩函数）
                    stubs: ['Icon']
                },
                // 将组件挂载到 document.body 上
                attachTo: document.body
            })
        // 获取 CollapseItem 的头部和内容元素
        headers = wrapper.findAll('.sm-collapse-item__header')
        contents = wrapper.findAll('.sm-collapse-item__wrapper')
        firstHeader = headers[0]
        secondHeader = headers[1]
        disabledHeader = headers[2]
        firstContent = contents[0]
        secondContent = contents[1]
        disabledContent = contents[2]
    })

    // 测试基础结构以及对应文本
    test('测试基础结构以及对应文本', () => {
        // 验证长度
        expect(headers.length).toBe(3)
        expect(contents.length).toBe(3)
        // 验证文本内容
        expect(firstHeader.text()).toBe('title a')
        // 验证内容是否可见
        expect(firstContent.isVisible()).toBeTruthy()
        expect(secondContent.isVisible()).toBeFalsy()
        expect(firstContent.text()).toBe('content a')
    })

    // 点击标题展开/关闭内容
    test('点击标题展开/关闭内容', async () => {
        // 模拟点击第一个标题
        await firstHeader.trigger('click')
        // 验证第一个内容是否隐藏
        expect(firstContent.isVisible()).toBeFalsy()
        // 模拟点击第二个标题
        await secondHeader.trigger('click')
        // 验证第二个内容是否可见
        expect(secondContent.isVisible()).toBeTruthy()
    })

    // 发送正确的事件
    test('发送正确的事件', () => {
        // 验证 onChange 回调被调用次数和参数
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenCalledWith([])
        expect(onChange).toHaveBeenLastCalledWith(['b'])
    })

    // disabled 的内容应该没有反应
    test('disabled 的内容应该没有反应', async () => {
        // 清空 onChange mock 函数的调用记录
        onChange.mockClear()
        // 验证 disabledHeader 是否具有 is-disabled 类
        expect(disabledHeader.classes()).toContain('is-disabled')
        // 模拟点击 disabledHeader
        await disabledHeader.trigger('click')
        // 验证 disabledContent 是否隐藏
        expect(disabledContent.isVisible()).toBeFalsy()
        // 验证 onChange 是否未被调用
        expect(onChange).not.toHaveBeenCalled()
    })
})
