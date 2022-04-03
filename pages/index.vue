<template>
  <LayoutPageLoad
    :loading="loading"
    :data="data"
    class="home"
  >
    <h1 class="h1 container mx-auto">{{data.titulo}}</h1>
    <div
      class="container mx-auto"
      v-html="data.descricao"
    ></div>
  </LayoutPageLoad>
</template>

<script setup lang="ts">
const { loading, data, error } = conteudoHome()
if (error.value) {
  throwError(error.value)
}
</script>
