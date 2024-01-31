import type { InjectionKey, Ref } from "vue";
export type NameType = string | number

export interface CollapseProps {
    modelValue: NameType[]; // 折叠面板当前展开的项目的标识符
    accordion?: boolean; // 是否开启手风琴模式，默认为 false
}


export interface CollapseItemProps {
    name: NameType;
    title?: string;
    disabled?: boolean;
}

export interface CollapseContext {
    activeNames: Ref<NameType[]>;
    handleItemClick: (name: NameType) => void;
}


export interface CollapseEmits {
    (e: 'update:modelValue', values: NameType[]): void; // 当 modelValue 属性更新时触发的事件，传递更新后的值
    (e: 'change', values: NameType[]): void; // 当折叠面板的展开状态发生变化时触发的事件，传递当前展开的项目的标识符数组
}


export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey');