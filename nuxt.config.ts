// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    title: 'Hello Nuxt',
    theme: {
        dark: true,
        colors: {
            primary: '#ff0000'
        }
    },
    css: ["~/assets/css/main.scss"],
    modules: [
        'nuxt-icons',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@element-plus/nuxt',
        '@vueuse/nuxt'
    ],
    env: {
        BASE_DOMAIN: process.env.BASE_DOMAIN || 'shishuo.com'
    },
    postcss: {
        plugins: {
            tailwindcss: {}
        }
    },
    runtimeConfig: {
        public: {
            BASE_DOMAIN: process.env.BASE_DOMAIN || 'shishuo.com'
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 3199
    }
})
