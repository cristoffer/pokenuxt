<script setup lang="ts">

defineProps({
  label: { type: String, required: true },
  active: { type: Boolean, required: false },
  onClick: { type: Function, required: false },
  size: { type: String, required: false, default: 'md' },
})

const activeClass = 'bg-dark-primary text-dark-text hover:bg-light-primary-hover hover:bg-dark-primary-hover'
const inactiveClass = 'bg-gray-200 text-black hover:bg-gray-300'
</script>

<template>
  <button
    v-if="onClick"
    :class="`rounded-50 pl-3 pr-3 capitalize ${active ? activeClass : inactiveClass} text-${size}`"
    @click="() => onClick!(label)"
  >
    {{ label }}
  </button>
  <span
    v-else
    :class="`rounded-50 pl-3 pr-3 capitalize ${active ? activeClass : inactiveClass} text-${size}`"
  >
    {{ label }}
  </span>
</template>
