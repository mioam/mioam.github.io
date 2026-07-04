<template>
  <ul class="mi-list">
    <li v-for="(item, index) in items" :key="keyOf(item, index)" class="mi-list-item">
      <div class="mi-list-item__content">
        <slot :item="item" :index="index" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T">
const props = defineProps<{
  items: T[]
  itemKey?: (item: T, index: number) => string | number
}>()

defineSlots<{
  default(props: { item: T; index: number }): any
}>()

/**
 * 生成列表项的 key。
 * 优先使用调用方提供的 `itemKey` 函数；否则尝试读取 `item.id`；
 * 最后回退到数组下标（仅在无唯一标识时使用，重排场景需谨慎）。
 */
function keyOf(item: T, index: number): string | number {
  if (props.itemKey) {
    return props.itemKey(item, index)
  }
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

.mi-list-item {
  border-top: 1px solid var(--border);
}

.mi-list-item:first-child {
  border-top: none;
}

.mi-list-item__content {
  padding-top: var(--space-3);
  padding-bottom: var(--space-3);
  transition: transform 0.2s ease;
}

.mi-list-item__content:hover {
  transform: translateY(-0.5rem);
}

.mi-list-item:last-child .mi-list-item__content {
  padding-bottom: 0;
}
</style>
