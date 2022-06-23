const Koa = require('koa');
const sendFile = require('koa-send');

const path = require('path');
const fs = require('fs');

const resolve = (p) => path.resolve(__dirname, p);

const clientRoot = resolve('dist/client');
const template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
const render = require('./dist/server/entry-server.js').render;
const manifest = require('./dist/client/ssr-manifest.json')
// 这边冒号没加会报错  TypeError: (intermediate value) is not iterable
// 因为自执行函数。。。
;
(async () => {
    const app = new Koa();

    app.use(async (ctx) => {

        // 请求的是静态资源
        if (ctx.path.startsWith('/assets')) {
            await sendFile(ctx, ctx.path, {
                root: clientRoot
            });
            return;
        }

        const [appHtml, state, preloadLinks] = await render(ctx, manifest);

        const html = template
            .replace('<!--pinia-state-->', state)
            .replace('<!--app-html-->', appHtml)
            .replace('<!--preload-links-->', preloadLinks); // 生产环境预编译

        ctx.type = 'text/html';
        ctx.body = html;
    });

    app.listen(8080, () => console.log('started server on http://localhost:8080'));
})();