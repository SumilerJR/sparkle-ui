import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Icon from '../Icon/Icon.vue';

describe('Button.vue', () => {
    // 测试基本按钮
    test('basic button', () => {
        const wrapper = mount(Button, {
            props: {
                type: 'primary'
            },
            slots: {
                default: 'button'
            }
        });
        console.log(wrapper.html());
        // 断言按钮是否包含特定的类名
        expect(wrapper.classes()).toContain('sm-button--primary');
        // 断言插槽是否正确渲染
        expect(wrapper.get('button').text()).toBe('button');
        // 模拟点击事件并检查是否触发了click事件
        wrapper.get('button').trigger('click');
        console.log(wrapper.emitted());
        expect(wrapper.emitted()).toHaveProperty('click');
    });

    // 测试禁用状态
    test('disabled', () => {
        const wrapper = mount(Button, {
            props: {
                disabled: true
            },
            slots: {
                default: 'disabled'
            }
        });
        // 断言是否正确渲染了disabled属性
        expect(wrapper.attributes('disabled')).toBeDefined();
        expect(wrapper.find('button').element.disabled).toBeDefined();
        // 模拟点击事件并检查是否触发了click事件
        wrapper.get('button').trigger('click');
        expect(wrapper.emitted()).not.toHaveProperty('click');
    });

    // 测试图标按钮
    test('icon', () => {
        const wrapper = mount(Button, {
            props: {
                icon: 'arrow-up'
            },
            slots: {
                default: 'icon'
            },
            global: {
                // 使用 stubs 来替换 FontAwesomeIcon 组件
                stubs: ['FontAwesomeIcon']
            }
        });
        const iconElement = wrapper.findComponent(FontAwesomeIcon);
        // 断言图标是否正确渲染
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.attributes('icon')).toBe('arrow-up');
    });

    // 测试加载中按钮
    test('loading', () => {
        const wrapper = mount(Button, {
            props: {
                loading: true
            },
            slots: {
                default: 'loading'
            },
            global: {
                // 使用 stubs 来替换 Icon 组件
                stubs: ['Icon']
            }
        });
        console.log(wrapper.html());
        const iconElement = wrapper.findComponent(Icon);
        // 断言加载图标是否正确渲染
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.attributes('icon')).toBe('spinner');
        // 断言按钮是否处于禁用状态
        expect(wrapper.attributes('disabled')).toBeDefined();
    });
});
