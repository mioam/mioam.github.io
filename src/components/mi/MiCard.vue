<script setup lang="ts">
import { useAttrs, useSlots } from 'vue'

withDefaults(
  defineProps<{
    as?: string
  }>(),
  {
    as: 'article',
  }
)

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const slots = useSlots()
</script>

<template>
  <Transition name="zen" appear>
    <component :is="as" class="card" v-bind="attrs">
      <div class="card_main">
        <div v-if="slots.label || slots.heading || slots.actions" class="card_header">
          <div class="card_title">
            <p v-if="slots.label" class="card_label">
              <slot name="label" />
            </p>
            <h1 v-if="slots.heading" class="card_heading">
              <slot name="heading" />
            </h1>
          </div>
          <div v-if="slots.actions" class="card_actions">
            <slot name="actions" />
          </div>
        </div>
        <div class="card_body"><slot /></div>
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
  /* max-width: 28rem; */
  padding: 2.5rem 2.5rem 2.5rem 0;
  color: var(--text);
  /* background: var(--surface); */
  line-height: 1.7;
}

.card::before {
  content: '';
  width: 1px;
  background: var(--border);
  flex-shrink: 0;
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
  /* font-size: 2rem; */
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

.card_body:empty {
  display: none;
}

.card_foot {
  padding-top: 1.25rem;
  font-size: 0.75rem;
  color: var(--muted);
}

.zen-enter-active {
  transition:
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.zen-enter-from {
  opacity: 0;
  transform: translateY(3rem);
}

.zen-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
