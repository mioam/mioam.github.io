<script setup lang="ts">
import { useAttrs, useSlots } from 'vue'

/**
 * MiCard - 通用内容卡片容器。
 *
 * 提供 label、heading、actions、default、foot 五个插槽，
 * 支持自定义根元素标签和标题层级。
 */
const props = withDefaults(
  defineProps<{
    as?: string
    headingLevel?: 'h1' | 'h2'
  }>(),
  {
    as: 'article',
    headingLevel: 'h2',
  }
)

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const slots = useSlots()
</script>

<template>
  <Transition name="ani" appear>
    <component :is="as" class="card" v-bind="attrs">
      <div class="card_main">
        <div v-if="slots.label || slots.heading || slots.actions" class="card_header">
          <div class="card_title">
            <p v-if="slots.label" class="card_label">
              <slot name="label" />
            </p>
            <component :is="headingLevel" v-if="slots.heading" class="card_heading">
              <slot name="heading" />
            </component>
          </div>
          <div v-if="slots.actions" class="card_actions">
            <slot name="actions" />
          </div>
        </div>
        <div v-if="slots.default" class="card_body">
          <slot />
        </div>
        <footer v-if="slots.foot" class="card_foot">
          <slot name="foot" />
        </footer>
      </div>
    </component>
  </Transition>
</template>

<style scoped>
.card {
  display: flex;
  gap: 2rem;
  align-items: stretch;
  padding: 2.5rem 2.5rem 2.5rem 0;
  color: var(--text);
  line-height: 1.7;
}

.card::before {
  content: '';
  width: 2px;
  background: var(--border);
  transform-origin: top;
}

.card_main {
  flex: 1;
  min-width: 0;
}

.card_header {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
  justify-content: space-between;
}

.card_title {
  min-width: 0;
}

.card_label {
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}

.card_heading {
  line-height: 2.5rem;
  margin: 0.25rem 0 0;
}

.card_actions {
  display: flex;
  flex-shrink: 0;
  gap: var(--space-2);
  align-items: center;
  padding-top: 0.25rem;
}

.card_header + .card_body {
  margin-top: 1.5rem;
}

.card_foot {
  padding-top: 1.25rem;
  font-size: 0.75rem;
  color: var(--muted);
}

.ani-enter-active::before {
  transition: transform 0.5s;
}

.ani-enter-active .card_main {
  transition:
    transform 1s,
    opacity 1s;
}

.ani-enter-from::before {
  transform: scaleY(0);
}

.ani-enter-from .card_main {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
