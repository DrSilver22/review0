<script>
import { computed, ref, onMounted, onBeforeMount, watch, nextTick } from 'vue'
import PokedexItem from '@/components/PokedexItem.vue'
export default {
  name: 'MyPokedexViewconsole.log',
  components: { PokedexItem },
  setup() {
    const pokedex = ref({ results: [] })
    const isNoLoading = ref(null)
    const searchText = ref('')
    const l = computed(() =>
      pokedex.value.results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1,
        // image: `https://cdn.traction.one/pokedex/pokemon/${index + 1}.png`,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index + 1}.png`,
      })),
    )
    onBeforeMount(() => {
      isNoLoading.value = false // it assigns isNoLoading to false
    })
    onMounted(async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=120')
      await response.json().then(function (result) {
        pokedex.value = result
        console.log(pokedex.value)
        isNoLoading.value = true // it assigns isNoLoading to true
      })
    })
    const lp = ref([])
    watch(searchText, async s => {
        console.log('searchText.value: ', searchText.value)
      isNoLoading.value = false
      console.log('l: ', l)
      if (!s.trim()) lp.value = l
      else {
        const r = await fetch('https://pokeapi.co/api/v2/pokemon?limit=120')
        await r.json().then(async function (result) {
          pokedex.value = result
          console.log('pokedex.value: ', pokedex.value)
          await nextTick()
          lp.value = l.value.filter(({ name }) => {
            return name.toLowerCase().includes(s.toLowerCase())
          })
        })
      }
      isNoLoading.value = true // it assigns isNoLoading to true
    })
    function findPokemon() {}
    watch(l, newValue => (lp.value = newValue))
    return { lp, isNoLoading, searchText }
  },
}
</script>

<template>
  <div v-if="!isNoLoading" class="flex justify-center">Loading...</div>
  <div v-else>
    <div class="w-full mb-4 flex justify-end">
      <input
        v-model="searchText"
        placeholder="Type a pokemon name"
        class="border border-gray-400 rounded-md p-3 w-full md:w-1/2"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <PokedexItem v-for="pokemon in lp" :pokemon="pokemon" :key="pokemon.id"/> <!-- добавил :key -->
    </div>
  </div>
</template>