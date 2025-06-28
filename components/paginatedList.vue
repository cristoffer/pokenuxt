<script setup lang="ts">
const { loadMore } = defineProps({
  pokemons: { type: Array, required: true },
  loadMore: { type: Function, required: true },
})

const readMarker = ref<HTMLSpanElement>()
let observer: IntersectionObserver

const onIntersect = () => {
  loadMore()
}

onMounted(() => {
  if (!readMarker.value)
    return
  observer = new IntersectionObserver(
    (e) => {
      if (e[0].isIntersecting) {
        onIntersect()
      }
    },
    {
      root: document,
    },
  )
  observer.observe(readMarker.value)
})

onDeactivated(() => observer.disconnect())
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-4">
    <PokemonItem
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      :pokemon="pokemon"
    />
  </div>

  <span ref="readMarker" />
</template>
