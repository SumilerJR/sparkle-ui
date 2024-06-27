/*
 * @Author: Sumiler mail@sumiler.com
 * @Date: 2024-06-11 23:19:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-27 22:57:52
 * @FilePath: \v-element\src\components\Input\types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface InputProps {
    type: string;
    modelValue: string;
    size?: 'large' | 'small';
    disabled?: boolean;
    clearable?: boolean;
    showPassword?: boolean;
    placeholder?: string;
    readonly?: boolean;
    autocomplete?: string;
    autofocus?: boolean;
    form?: string;
}

export interface InputEmits {
    (e: 'update:modelValue', value: string): void;
    // input 的 input 事件指的是值有变化就算
    (e: 'input', value: string): void;
    // input 的 change 事件指的是修改了值，并且失去了 focus
    (e: 'change', value: string): void;
    (e: 'focus', value: FocusEvent): void;
    (e: 'blur', value: FocusEvent): void;
    (e: 'clear'): void;

}