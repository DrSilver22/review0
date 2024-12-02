<template>
    <div v-if="!isNoLoading" class="flex justify-center">Loading...</div>
    <div v-else-if="pokemon" class="flex"> <!-- исправил условие pokemon !== {} -->
      <figure class="bg-gray-200 rounded-md p-4 w-1/2">
        <img class="w-full" :src="pokemon.image" :alt="pokemon?.species?.name" />
      </figure>
      <div class="ml-4 text-gray-700 max-w-[50%]">
        <h2 class="mt-1 font-bold capitalize text-4xl">{{ pokemon?.species?.name }}</h2>
        <p class="mt-1 text-gray-500">#{{ pokemon.number }}</p>
        <div class="mt-8">
          <p class="font-semibold text-2xl">Type</p>
          <div class="flex flex-wrap mt-2">
            <div
              v-for="{ type } of pokemon.types" :key="type.name"
              class="bg-cyan-600 text-white capitalize px-5 py-2 rounded-md m-2"
            >
              {{ type.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { ref } from 'vue'
  export default {
    props: { pokemonSlug: { type: String, required: true } },
    setup(props) {
      const pokemon = ref({})
      const isNoLoading = ref(false)
      console.log('Pokemon:', props.pokemonSlug)
      // fetch pokemon data
      fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemonSlug}`).then(async response => {
        response.json().then(result => {
          console.log(result)
          pokemon.value = result
          pokemon.value.image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' + result.id + '.png'
          pokemon.value.number = String(result.id).padStart(3, '0')
        })
      })
      isNoLoading.value = true // it assigns isNoLoading to true
      return { pokemon, isNoLoading }
    },
  }
  </script>
  <style lang="scss" scoped></style>