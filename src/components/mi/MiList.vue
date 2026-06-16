<!-- ZenList.vue -->
<template>
  <div class="zen-list">
    <div v-for="(item, index) in items" :key="item.id ?? `zen-${index}`" class="item">

      <div class="zen-body">
        <slot name="default" :item="item" :index="index">
        </slot>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends { id?: string | number }">
defineProps<{
  items: T[]
}>()
defineSlots<{
  default(props: { item: T; index: number }): any
}>()
defineEmits(['itemClick'])
</script>

<style scoped>
.zen-list {
  color: var(--text);
  width: 100%;
  position: relative;
}

/* 核心 Item */
.zen-list__item {
  padding-bottom: var(--space-2);
  display: flex;
  align-items: center;
  position: relative;
  cursor: default;
  background: transparent;
  transition:
    transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1;
}

/* Hover：向上抽离悬浮 */
.item:hover {
  transform: translateY(-3px);
  z-index: 10;
}

.item:hover>*>.title {
  color: var(--accent)
}
</style>