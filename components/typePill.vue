<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
  active: { type: String, required: false },
  onClick: { type: Function, required: true },
})

const activeClass = 'bg-dark-primary text-dark-text hover:bg-light-primary-hover hover:bg-dark-primary-hover'
const inactiveClass = 'bg-gray-200 text-black hover:bg-gray-300'
</script>

<template>
  <button
    :class="`rounded-50 pl-3 pr-3 capitalize ${active === label ? activeClass : inactiveClass}`"
    @click="() => onClick(label)"
  >
    {{ label }}
  </button>
</template>
