import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { fileURLToPath, URL } from "url";
export default defineConfig(({ command }) => {
    if (command === 'serve') {
        // development mode
        return {
            server: {
                port: 5050,
                open: true,
                host: 'localhost',
            },
            resolve: {
                alias: {
                    '@': fileURLToPath(new URL(
                        "./src",
                        import.meta.url
                    ))
                },
            },
            plugins: [
                createHtmlPlugin({
                    minify: true,
                    entry: './src/main.js',
                    template: './index.html',
                }),
            ],
        }
    } else {
        // production mode
        return {
            css: {
                postcss: {
                    plugins: [ autoprefixer ],
                },
            },
            build: {
                outDir: './dist',
                assetsDir: './assets'
            }
        }
    }
})