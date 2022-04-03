<template>
  <div class="container mx-auto">
    <Component
      v-for="(sessao, i) in sessoesDaPagina"
      :key="sessao.id + '-' + i"
      :is="sessao.componente"
      v-bind="sessao"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  conteudo: any[]
}>()
const { conteudo } = toRefs(props)

const transformarNomeDoComponente = (nome: string): string => nome.replace('Component', '')

const ComponentesDeConteudo = await usarComponentesDeConteudo()

const sessoesDaPagina = computed(() => conteudo.value.map((sessao) => {
  const nomeDoComponente = transformarNomeDoComponente(sessao.__typename)
  const atributos = {
    ...sessao,
    id: sessao.__typename
  }
  delete atributos.__typename
  return {
    componente: ComponentesDeConteudo[nomeDoComponente],
    ...atributos
  }
}))
</script>