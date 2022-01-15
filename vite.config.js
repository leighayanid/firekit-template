import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Markdown from 'vite-plugin-md'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/] // <--
        }),
        Markdown()
    ],
    test: {
        global: true,
        environment: 'happy-dom'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
