---
title: Collapse | Sparkle-Element
description: Collapse 组件的文档
---

# Collapse 折叠面板
通过折叠面板收纳内容区域

## 基础用法
使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。
<preview path="../demo/collapse/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>

## 手风琴效果
每次只能展开一个面板
通过 accordion 属性来设置是否以手风琴模式显示。
<preview path="../demo/collapse/Accordion.vue" title="基础用法" description="Collapse 组件的手风琴模式显示"></preview>


## Collapse Attributes [​](#collapse-attributes)

| Name                  | Description                        | Type                                                 | Accepted Values | Default |
| --------------------- | ---------------------------------- | ---------------------------------------------------- | --------------- | ------- |
| model-value / v-model | currently active panel             | string (accordion mode) / array (non-accordion mode) | —               | —       |
| accordion             | whether to activate accordion mode | boolean                                              | —               | false   |

## Collapse Events [​](#collapse-events)

| Name   | Description                        | Parameters                                                          |
| ------ | ---------------------------------- | ------------------------------------------------------------------- |
| change | triggers when active panels change | (activeNames: array (non-accordion mode) / string (accordion mode)) |

## Collapse Slots [​](#collapse-slots)

| Name | Description               | Subtags       |
| ---- | ------------------------- | ------------- |
| \-   | customize default content | Collapse Item |

## Collapse Item Attributes [​](#collapse-item-attributes)

| Name     | Description                        | Type          | Accepted Values | Default |
| -------- | ---------------------------------- | ------------- | --------------- | ------- |
| name     | unique identification of the panel | string/number | —               | —       |
| title    | title of the panel                 | string        | —               | —       |
| disabled | disable the collapse item          | boolean       | —               | —       |

## Collapse Item Slot [​](#collapse-item-slot)

| Name  | Description                    |
| ----- | ------------------------------ |
| —     | content of Collapse Item       |
| title | content of Collapse Item title |