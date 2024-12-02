import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'

import PokedexView from '@/views/PokedexView.vue'
import PokemonView from '@/views/PokemonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'pokedex',
      component: PokedexView,
    },
    {
      path: '/pokemon/:slug',
      name: 'pokemonDetails',
      component: PokemonView,
      props: route => ({ pokemonSlug: route.params.slug }),
    },
    
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
