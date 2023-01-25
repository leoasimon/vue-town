<script setup lang="ts">
import { onMounted } from 'vue-demi';
import Buildings from './components/Buildings.vue';
import Resources from './components/Resources.vue';
import { useTownStore } from './stores/town';
import Taxes from './components/Taxes.vue';

const town = useTownStore();

onMounted(() => setInterval(town.update, 1000));
</script>

<template>
  <header>
  </header>
    <Buildings :buildings="town.buildings" :build="town.build"/>
    <Resources :resources="town.resources" :population="town.population"/>
    <Taxes :taxes="town.taxes" :raise-taxes="town.raiseTaxes" :decrease-taxes="town.decreaseTaxes"/>
    <main>
  </main>

</template>

<style scoped>

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
