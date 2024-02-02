/*
 * @Author: 九日 mail@sumiler.com
 * @Date: 2024-01-31 15:16:54
 * @LastEditors: 九日 mail@sumiler.com
 * @LastEditTime: 2024-01-31 16:10:01
 * @FilePath: \v-element\src\components\Icon\types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
export interface IconProps {
    border?: boolean
    fixedWidth?: boolean
    flip?: 'horizontal' | 'vertical' | 'both'
    icon: object | Array<string> | string | IconDefinition
    mask?: object | Array<string> | string
    listItem?: boolean
    pull?: 'right' | 'left'
    pulse?: boolean
    rotation?: 90 | 180 | 270 | '90' | '180' | '270'
    swapOpacity?: boolean
    size?: '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x'
    spin?: boolean
    transform?: object | string
    symbol?: boolean | string
    title?: string
    inverse?: boolean
    bounce?: boolean
    shake?: boolean
    beat?: boolean
    fade?: boolean
    beatFade?: boolean
    spinPulse?: boolean
    spinReverse?: boolean
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    color?: string
}