export default defineNuxtRouteMiddleware((to, from) => {
  const locale = Array.isArray(to.params.locale) ? to.params.locale[0] : to.params.locale
  const nuxtApp = useNuxtApp()
  console.log('middleware')
  if (locale) {
    const availableLocales = nuxtApp.$i18n.availableLocales
    console.log(availableLocales)
    const isAvailableLocale = availableLocales.includes(locale)
    if (!isAvailableLocale) {
      return navigateTo(to.fullPath.replace(`${to.params.locale}`, `${locale}`))
    }
  }
  return
})