<template>
  <div v-html="texto"></div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
const props = defineProps<{
  texto: string
}>()
const { texto } = toRefs(props)
</script>