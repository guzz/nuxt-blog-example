<template>
  <LayoutPageLoad
    :loading="loading"
    :data="data"
    class="home"
  >
    <button @click="goToIngles">para ingles</button>
    <h1 class="h1 container mx-auto">{{data.titulo}}</h1>
    <p class="container mx-auto">{{data.resumo}}</p>
    <ListaDeConteudo :conteudo="data.conteudo" />
  </LayoutPageLoad>
</template>

<script setup lang="ts">
import { createError } from 'h3'
const route = useRoute()
const urlized: string = Array.isArray(route.params.urlized) ? route.params.urlized[0] : route.params.urlized
const { data, loading, error } = buscarArtigoPorUrlized(urlized)
if (error.value) {
  throwError(error.value)
}
const nuxtApp = useNuxtApp()
const goToIngles = () => {
  nuxtApp.$i18n.changeLocale('en')
}
</script>