import type { VNode } from 'vue'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  // v-model
  modelValue: string;
  // 选项
  options?: SelectOption[];
  // 一些基本表单属性
  placeholder?: string;
  disabled?: boolean;
  // 是否可清除的
  clearable?: boolean;
  renderLabel?: RenderLabelFunc;
  // 过滤筛选
  filterable?: boolean;
  filterMethod?: CustomFilterFunc;
  // 远程
  remote?: boolean;
  remoteMethod?: CustomFilterRemoteFunc;
}
export interface SelectStates {
  inputValue: string
  selectedOption: null | SelectOption
  // 鼠标hover状态
  mouseHover: boolean;
  loading: boolean;
  highlightIndex: number;
}
export type RenderLabelFunc = (option: SelectOption) => VNode;
export type CustomFilterFunc = (value: string) => SelectOption[];
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>;

export interface SelectEmits {
  (e: 'change', value: string): void
  // 修改值事件
  (e: 'update:modelValue', value: string): void
  // 可见改变事件
  (e: 'visible-change', value: boolean): void
  // 清除事件
  (e: 'clear'): void
}
