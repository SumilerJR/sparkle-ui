<template>
  <div class="sm-select" :class="{
    'is-disabled': disabled
  }" @click="toggleDropdown" @mouseenter="states.mouseHover = true" @mouseleave="states.mouseHover = false">
    <Tooltip placement="bottom-start" ref="tooltipRef" :popperOptions="popperOptions"
      @click-outside="controlDropdown(false)" manual>
      <Input v-model="states.inputValue" :disabled="disabled" :placeholder="filteredPlaceholder" ref="inputRef"
        :readonly="!filterable || !isDropdownShow" @input="debounceOnFilter" @keydown="handleKeydown">
      <template #suffix>
        <Icon icon="circle-xmark" v-if="showClearIcon" class="sm-input__clear" @mousedown.prevent="NOOP"
          @click.stop="onClear" />
        <Icon icon="angle-down" v-else class="header-angle" :class="{ 'is-active': isDropdownShow }" />
      </template>
      </Input>
      <template #content>
        <div class="sm-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin></Icon>
        </div>
        <div class="sm-select__nodata" v-else-if="filterable && filterdOptions.length === 0">
          <!-- <Icon icon="spinner" spin></Icon> -->
           nodata
        </div>
        <ul class="sm-select__menu" v-else>
          <template v-for="(item, index) in filterdOptions" :key="index">
            <li class="sm-select__menu-item" :class="{
              'is-disabled': item.disabled,
              'is-selected': states.selectedOption?.value === item.value,
              'is-highlighted': states.highlightIndex === index,
            }" :id="`select-item-${item.value}`" @click.stop="itemSelect(item)">
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { isFunction, debounce } from 'lodash-es'
import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import RenderVnode from '../Common/RenderVnode'
import type { InputInstance } from '../Input/types'

const findOption = (value: string) => {
  const option = props.options.find(option => option.value === value);
  return option ? option : null;
}
defineOptions({
  name: 'SmSelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  // 当使用数组做默认值的时候，可以使用函数返回的方式
  options: () => [],
  placeholder: '',
  disabled: false,
  filterable: false,
});
const timeout = computed(() => props.remote ? 300 : 0);
const emits = defineEmits<SelectEmits>();
const initialOption = findOption(props.modelValue);
const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
})
watch(() => props.modelValue, (newValue) => {
  const newOption = findOption(newValue);
  if (newOption && initialOption) {
    // 赋予新值
    Object.assign(initialOption, newOption.value);
  }
})
const isDropdownShow = ref(false);
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    }
  ],
}
const filterdOptions = ref(props.options);
watch(() => props.options, (newOptions) => {
  filterdOptions.value = newOptions;
});
/**
 * 默认选项生成
 * @param searchValue 
 */
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return;
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filterdOptions.value = props.filterMethod(searchValue);
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true;
    try {
      filterdOptions.value = await props.remoteMethod(searchValue);
    } catch (error) {
      console.error(error);
      filterdOptions.value = [];
    } finally {
      states.loading = false;
    }
  } else {
    // 没有传过滤函数和远程数据，则执行默认的过滤器
    filterdOptions.value = props.options.filter(option => option.label.includes(searchValue));
  }
  states.highlightIndex = -1;
}
const onFilter = () => {
  generateFilterOptions(states.inputValue);
}
/**
 * 节流处理
 */
const debounceOnFilter = debounce(() => {
  onFilter();
}, timeout.value);
/**
 * 可筛选下将占位符 placeholder 替换为原有的值
 */
const filteredPlaceholder = computed(() => {
  return (props.filterable && states.selectedOption && isDropdownShow.value) ? states.selectedOption.label : props.placeholder;
})
/**
 * 控制下拉列表展示/关闭
 * @param show 
 */
const controlDropdown = (show: boolean) => {
  if (show) {
    tooltipRef.value.show();
    // filter 模式 && 之前选择过对应的值
    if (props.filterable && states.selectedOption) {
      // 清空输入框
      states.inputValue = '';
    }
    if (props.filterable) {
      // 执行一次默认选项的生成
      generateFilterOptions(states.inputValue);
    }
  } else {
    tooltipRef.value.hide();
    // filter 模式下
    if (props.filterable) {
      // blur 时将之前的值回灌到 input 中
      states.inputValue = states.selectedOption ? states.selectedOption.label : '';
    }
    // 恢复高亮默认值
    states.highlightIndex = -1;
  }
  isDropdownShow.value = show;
  emits('visible-change', show);
}
/**
 * 处理键盘事件
 * @param e 键盘事件
 */
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    // 回车
    case 'Enter':
      if (!isDropdownShow.value) {
        controlDropdown(true);
      } else {
        if (states.highlightIndex > -1 && (filterdOptions.value[states.highlightIndex])) {
          itemSelect(filterdOptions.value[states.highlightIndex]);
        } else {
          controlDropdown(false);
        }
      }
      break;
    // 退出 ESC
    case 'Escape':
      if (isDropdownShow.value) {
        controlDropdown(false);
      }
      break;
    // 向上
    case 'ArrowUp':
      e.preventDefault(); // 阻止滚动
      if (filterdOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          // 循环
          states.highlightIndex = filterdOptions.value.length - 1;
        } else {
          // 向上移动
          states.highlightIndex--;
        }
      }
      break;
    // 向下
    case 'ArrowDown':
    e.preventDefault();
    if (filterdOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === (filterdOptions.value.length - 1)) {
          // 循环
          states.highlightIndex = 0;
        } else {
          // 向上移动
          states.highlightIndex++;
        }
      }
      break;
    default:
      break;
  }
}
/**
 * 显示清除图标（❌）
 */
const showClearIcon = computed(() => {
  // * hover 上去
  // * props.clearable 为 true
  // 必须要有选择过选项
  // Input 的值不能为空
  return props.clearable && states.mouseHover && states.selectedOption && states.inputValue.trim() !== '';
})
/**
 * 清除事件
 */
const onClear = () => {
  states.selectedOption = null;
  states.inputValue = '';
  emits('clear');
  emits('change', '');
  emits('update:modelValue', '');
}
const NOOP = () => { };
// 触发下拉列表
const toggleDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
}
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emits('change', e.value);
  emits('update:modelValue', e.value);
  controlDropdown(false);
  // 选择后聚焦input输入框
  inputRef.value.ref.focus();
}
</script>
