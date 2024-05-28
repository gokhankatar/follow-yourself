<template>

  <v-app :theme="$store.state.theme">

    <Navbar />

    <v-main class="mx-4 my-5">
      <router-view />
    </v-main>

  </v-app>

</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: { Navbar }
}
</script>
