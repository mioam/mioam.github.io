<script setup lang="ts">
import { computed } from 'vue'
import gfm from '@bytemd/plugin-gfm'
import { Viewer } from '@bytemd/vue-next'
import 'bytemd/dist/index.css'

const props = defineProps<{
  value: string
}>()

const plugins = [gfm()]
const markdown = computed(() => props.value.trim())
</script>

<template>
  <div class="markdown-body">
    <Viewer :value="markdown" :plugins="plugins" />
  </div>
</template>
