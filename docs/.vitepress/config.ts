import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Sparkle-UI",
  description: "一个仿element-plus的ui组件库",
  vite: {
    // plugins: [
    //   VueMacros({ // 配置VueMacros：将原本的plugins放到VueMacros({})中
    //     plugins: {
    //       vueJsx: vueJsx(), // 如果需要
    //     },
    //   }),
    // ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  base: "/sparkle-ui/",
  // srcDir: 'components',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: 'https://sumiler.com/' }
    ],

    sidebar: [
      {
        text: 'Basic 基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Alert 警告', link: '/components/alert' },
          { text: 'Collapse 折叠面板', link: '/components/collapse' },
          { text: 'Tooltip 文字提示', link: '/components/tooltip' },
          { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
          { text: 'Message 消息提示', link: '/components/message' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'Switch 状态框', link: '/components/switch' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Form 表单', link: '/components/form' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
