import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

const APP_NAME = 'BD Shoper';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/css/storefront.css',
                'resources/js/themes/theme1/app.js',
                'resources/js/themes/theme2/app.js',
                'resources/js/themes/theme3/app.js',
                'resources/js/themes/theme4/app.js',
                'resources/js/themes/theme5/app.js',
                'resources/js/themes/theme6/app.jsx',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: { base: null, includeAbsolute: false },
            },
        }),
        react(),
        tailwindcss(),

        VitePWA({
            // We ship our own service worker (resources/js/sw.js) so we can control
            // Inertia-aware caching and the offline fallback page.
            strategies: 'injectManifest',
            srcDir: 'resources/js',
            filename: 'sw.js',
            injectRegister: false, // registered manually in resources/js/Services/pwa.js
            registerType: 'autoUpdate',
            manifestFilename: 'manifest.webmanifest',

            // Output lands in public/build; Laravel serves /sw.js and /manifest.webmanifest
            // from there (see routes/web.php) so the SW can control the whole origin.
            scope: '/',
            base: '/',

            manifest: {
                id: '/',
                name: APP_NAME,
                short_name: 'BD Shoper',
                description: 'BD Shoper — অনলাইন শপিং, অর্ডার ট্র্যাকিং ও কাস্টমার ড্যাশবোর্ড',
                lang: 'bn',
                start_url: '/',
                scope: '/',
                display: 'standalone',
                display_override: ['standalone', 'minimal-ui'],
                orientation: 'any',
                background_color: '#ffffff',
                theme_color: '#cc1ea6',
                categories: ['shopping', 'business'],
                icons: [
                    { src: '/images/app/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
                    { src: '/images/app/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
                    { src: '/images/app/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
                ],
                shortcuts: [
                    {
                        name: 'Shop',
                        short_name: 'Shop',
                        url: '/shop',
                        icons: [{ src: '/images/app/icon-192.png', sizes: '192x192', type: 'image/png' }],
                    },
                    {
                        name: 'Cart',
                        short_name: 'Cart',
                        url: '/cart',
                        icons: [{ src: '/images/app/icon-192.png', sizes: '192x192', type: 'image/png' }],
                    },
                    {
                        name: 'Track Order',
                        short_name: 'Track',
                        url: '/track',
                        icons: [{ src: '/images/app/icon-192.png', sizes: '192x192', type: 'image/png' }],
                    },
                    {
                        name: 'My Account',
                        short_name: 'Account',
                        url: '/account',
                        icons: [{ src: '/images/app/icon-192.png', sizes: '192x192', type: 'image/png' }],
                    },
                ],
            },

            injectManifest: {
                // Paths below are relative to public/build.
                globPatterns: ['assets/**/*.{js,css,woff2,svg}'],
                // Precache URLs must be absolute, because the SW is served from "/sw.js".
                modifyURLPrefix: { 'assets/': '/build/assets/' },
                additionalManifestEntries: [
                    { url: '/offline.html', revision: String(Date.now()) },
                    { url: '/images/app/icon-192.png', revision: null },
                    { url: '/images/app/icon-512.png', revision: null },
                ],
                maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
            },

            devOptions: { enabled: false },
        }),
    ],
    resolve: {
        alias: {
            '@theme1': fileURLToPath(new URL('./resources/js/themes/theme1', import.meta.url)),
            '@theme2': fileURLToPath(new URL('./resources/js/themes/theme2', import.meta.url)),
            '@theme3': fileURLToPath(new URL('./resources/js/themes/theme3', import.meta.url)),
            '@theme4': fileURLToPath(new URL('./resources/js/themes/theme4', import.meta.url)),
            '@theme5': fileURLToPath(new URL('./resources/js/themes/theme5', import.meta.url)),
            '@theme6': fileURLToPath(new URL('./resources/js/themes/theme6', import.meta.url)),
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
