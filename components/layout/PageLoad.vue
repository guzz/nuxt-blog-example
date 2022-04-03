<template>
  <div class="page">
    <div v-if="loading">loading</div>
    <slot v-else-if="data" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: Boolean,
  data: any
}>()
const { loading, data } = toRefs(props)
</script>