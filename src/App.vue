<template>
  <div class="root">
    <div class="max-w-[1024px] px-4 flex flex-col justify-center mx-auto">

      <!-- <header class="py-3 mb-10 bg-red-500 text-white px-4 text-4xl">Podekex</header> -->

      <header class="py-3 mb-10 bg-red-500 text-white px-4 text-4xl">
        <router-link to="/">Pokedex</router-link>
      </header>
      
      <router-view />
    </div>
  </div>
</template>
