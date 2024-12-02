<script>
import { computed } from 'vue'
export default {
  name: 'MyPokedexItem',
  props: { pokemon: Object },
  setup({ pokemon }) {
    return {
      number: computed(() => String(pokemon.id).padStart(3, '0')),
      onClickName: name => alert(`Hi! I am ${name}`),
    }
  },
}
</script>

<template>
  <div class="pokedex-item">
    <figure class="bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer p-4">
      <router-link :to="{ name: 'pokemonDetails', params: { slug: pokemon.name } }">
        <img class="w-full" :src="pokemon.image" :alt="pokemon.name" />
      </router-link>
    </figure>
    <div class="text-center">
      <p class="mt-1 text-gray-500">#{{ number }}</p>
      <h2
        class="mt-1 font-bold text-gray-700 capitalize text-xl"
        @click="onClickName(pokemon.name)"
      >
        {{ pokemon.name }}
      </h2>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>