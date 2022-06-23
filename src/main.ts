// createSSRApp
import { createSSRApp } from "vue";
import App from "./App.vue";

// 为了保证数据的互不干扰，每次请求需要导出一个新的实例
export const createApp = () => {
    const app = createSSRApp(App);
    return { app };
}

/**
 * 服务器端渲染步骤：
 * 1.vite 创建框架
 * 2.koa  创建服务器
 * 如何把vue实例渲染到服务器上?
 * 1.有一个主app.vue
 * 2.有一个主index.html
 * 3.
 * 区分开发，测试，生产环境
 */