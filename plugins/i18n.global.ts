export default defineNuxtPlugin(nuxtApp => {
  const route = useRoute()
  const router = useRouter()
  const availableLocales = [
    'en',
    'pt-BR',
    'es'
  ]
  const defaultLocale = 'pt-BR'
  const locale = ref(defaultLocale)

  watch(locale, (val) => {
    router.push(`/${val}${route.fullPath}`)
    console.log(val)
  })

  watch(route, (to) => {
    if (to.params.locale) {
      changeLocale(to.params.locale)
    }
  }, { deep: true })

  const changeLocale = (newLocale) => {
    locale.value = newLocale
  }

  const currentLocale = computed(() => locale.value)
  return {
    provide: {
      i18n: {
        currentLocale,
        changeLocale,
        availableLocales
      }
    }
  }
})