/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros';

// Vite配置
export default defineConfig({
    plugins: [
        VueMacros.vite({
            plugins: {
                vue: vue(),
                vueJsx: vueJsx(),
            },
        })
    ],
    // 测试配置
    test: {
        // 全局变量设置为true
        globals: true,
        // 环境设置为jsdom
        environment: 'jsdom'
    }
});
