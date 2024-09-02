import type { InjectionKey } from "vue";
import type { RuleItem, ValidateError, ValidateFieldsError } from "async-validator";

export interface FormItemProps {
    label: string;
    prop?: string;
}
/**
 * 扩展导出的RuleItem，使其支持trigger
 */
export interface FormItemRule extends RuleItem {
    trigger?: string;
}
/**
 * Record<K,T>
 * 构造一个对象类型，Keys 表示对象的属性键 、Type 表示对象的属性值，用于将一种类型属性映射到另一种类型
 * 理解为：将 K 的每一个值都定义为 T 类型
 */
export type FormRules = Record<string, FormItemRule[]>
export interface FormProps {
    model: Record<string, any>;
    rules: Record<string, any>;
}
export interface FormContext extends FormProps {
    addField: (field: FormItemContext) => void;
    removeField: (field: FormItemContext) => void;
}
export interface ValidateStatusProp {
    state: 'init' | 'success' | 'error';
    errorMsg: string;
    loading: boolean;
}
export interface FormItemContext {
    prop: string;
    validate: (trigger?: string) => Promise<any>;
    resetField(): void;
    clearValidate(): void;
}
export interface FormValidateFailure {
    errors: ValidateError[] | null;
    fields: ValidateFieldsError;
}
export interface FormInstance {
    validate: (props?: string[]) => Promise<any>;
    resetFields: (props?: string[]) => void;
    clearValidate: (props?: string[]) => void;
}
export interface FormItemInstance {
    validateStatus: ValidateStatusProp;
    validate: (trigger?: string) => Promise<any>;
    resetField(): void;
    clearValidate(): void;

}
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey');
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey');