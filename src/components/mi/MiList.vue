<template>
  <ul class="mi-list">
    <li v-for="(item, index) in items" :key="itemKey(item, index)" class="mi-list__item">
      <slot :item="item" :index="index" />
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
}>()

defineSlots<{
  default(props: { item: T; index: number }): any
}>()

function itemKey(item: unknown, index: number): string | number {
  const withId = item as { id?: string | number }
  return withId.id ?? index
}
</script>

<style scoped>
.mi-list {
  list-style: none;
  margin: 0;
  padding: 0;
  color: var(--text);
  width: 100%;
}

.mi-list__item {
  padding-bottom: var(--space-2);
}

.mi-list__item + .mi-list__item {
  border-top: 1px solid var(--border);
  padding-top: var(--space-2);
}
</style>
