import { defineNuxtConfig } from 'nuxt3'
import { resolve } from 'pathe'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: [
    '~/assets/tailwind.css'
  ],
  buildModules: [
    '@nuxt3/apollo-module',
    '@nuxtjs/tailwindcss',
    (options, nuxtApp) => {
      nuxtApp.hook('pages:middleware:extend', () => {
        console.log('pages:middleware:extend')
      })
      nuxtApp.hook('pages:extend', (pages) => {
        console.log('pages:extend')
        pages.forEach((r) => {
          let filePath = r.path
          const params = filePath.match(/\:([A-z a-z])\w+/g)
          if (params) {
            params.forEach((param) => {
              const transformParam = `[${param.replace(':', '')}]`
              filePath = filePath.replace(param, transformParam)
            })
          }
          if (filePath.charAt(filePath.length - 1) === '/') {
            filePath = filePath + 'index'
          }
          const newRoute = {
            path: `/:locale(\[A-Z a-z]{2}\)${r.path}`,
            name: `locale-${r.name.toString()}`,
            file: resolve(__dirname, `pages/${filePath}.vue`),
            children: r.children
          }
          pages.push(newRoute)
        })
      })
    }
  ],
  apollo: {
    default: {
      ssrMode: true,
      uri: process.env.API_ENDPOINT
    },
  },
  tailwindcss: {
    cssPath: '~/assets/tailwind.css'
  }
})
