/*
 * @Author: 九日 mail@sumiler.com
 * @Date: 2024-02-02 18:03:02
 * @LastEditors: 九日 mail@sumiler.com
 * @LastEditTime: 2024-02-02 23:48:05
 * @FilePath: \v-element\src\components\Tooltip\types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入 Popper.js 核心模块的 Placement 和 Options 类型
import type { Placement, Options } from '@popperjs/core'

// 定义 TooltipProps 接口，描述 Tooltip 组件的属性
export interface TooltipProps {
    // 提示内容，可选
    content?: string;
    // 触发方式，可选，取值为 'hover' 或 'click'，默认为 'hover'
    trigger?: 'hover' | 'click';
    // 提示框的放置位置，必填
    placement: Placement;
    // 是否手动控制提示框的显示状态，可选，默认为 false
    manual?: boolean;
    // Popper.js 的配置选项，可选
    popperOptions?: Partial<Options>;
    // 动画变化效果
    transition?: string;
    // 打开延时
    openDelay?: number;
    // 关闭延时
    closeDelay?: number;
}


export interface TooltipEmits {
    (e: 'visible-change', value: boolean): void;
    (e: 'click-outside', value: boolean): void;
}

export interface TooltipInstance {
    show: () => void;
    hide: () => void;
}